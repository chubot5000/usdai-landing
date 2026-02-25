"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { Deal } from "@/lib/backend/types";

// Configuration
const CONFIG = {
  earth: {
    radius: 5,
    pointsCount: 100000,
    color: "#8b7355",
    oceanOpacity: 0.4,
    initialRotation: Math.PI,
    texturePath: "/images/earth.jpg",
  },
  camera: {
    fov: 45,
    near: 0.01,
    far: 50,
  },
  controls: {
    enableDamping: true,
    enablePan: false,
    enableZoom: false,
    autoRotateSpeed: 0.0005,
  },
  atmosphere: {
    color: new THREE.Color("#d6d3d1"),
    power: 5,
    radiusOffset: 0.1,
  },
  marker: {
    size: 0.12,
    color: "#a99482",
    offset: 1.01,
    pingMaxScale: 3,
    pingDuration: 2,
  },
  dot: {
    landSize: 0.055,
    oceanSize: 0.032,
    scaling: 0.7,
  },
};

interface GlobeProps {
  deals?: Deal[];
  onMarkerClick?: (
    deals: Deal[],
    position: { x: number; y: number },
    markerWorldPos: THREE.Vector3
  ) => void;
  locked?: boolean;
  resetCamera?: boolean;
  className?: string;
}

/**
 * Converts latitude/longitude to a 3D vector position on the sphere
 */
function latLngToVector3(
  lat: number,
  lng: number,
  radius: number
): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 90) * (Math.PI / 180);
  return new THREE.Vector3(
    -(radius * Math.sin(phi) * Math.cos(theta)),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

interface MarkerData {
  marker: THREE.Mesh;
  ping: THREE.Mesh;
  pingMaterial: THREE.ShaderMaterial;
  localPosition: THREE.Vector3;
  deals: Deal[];
}

export default function Globe({
  deals = [],
  onMarkerClick,
  locked = false,
  resetCamera = false,
  className = "",
}: GlobeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const earthRef = useRef<THREE.Mesh | null>(null);
  const autoRotateRef = useRef(true);
  const markersRef = useRef<MarkerData[]>([]);
  const controlsRef = useRef<OrbitControls | null>(null);
  const initialCameraPositionRef = useRef<THREE.Vector3 | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const hoveredMarkerRef = useRef<THREE.Mesh | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraAnimationRef = useRef<{
    active: boolean;
    startPos: THREE.Vector3;
    endPos: THREE.Vector3;
    startLookAt: THREE.Vector3;
    endLookAt: THREE.Vector3;
    progress: number;
    onComplete?: () => void;
  } | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene setup
    const scene = new THREE.Scene();

    // Camera setup - position to fit globe in container
    const camera = new THREE.PerspectiveCamera(
      CONFIG.camera.fov,
      width / height,
      CONFIG.camera.near,
      CONFIG.camera.far
    );
    // Calculate distance so globe fills the container with slight margin
    const fovRad = (CONFIG.camera.fov * Math.PI) / 180;
    const fitDistance = (CONFIG.earth.radius / Math.sin(fovRad / 2)) * 1.1;
    camera.position.set(0, 0, fitDistance);

    // Store initial camera position
    initialCameraPositionRef.current = camera.position.clone();
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Controls setup
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = CONFIG.controls.enableDamping;
    controls.enablePan = CONFIG.controls.enablePan;
    controls.enableZoom = CONFIG.controls.enableZoom;
    controls.enabled = !locked;
    controlsRef.current = controls;

    // Track interaction for auto-rotate
    controls.addEventListener("start", () => {
      autoRotateRef.current = false;
      renderer.domElement.style.cursor = "grabbing";
    });
    controls.addEventListener("end", () => {
      autoRotateRef.current = true;
      renderer.domElement.style.cursor = "grab";
    });
    renderer.domElement.style.cursor = "grab";

    // Setup raycaster for click detection
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    // Click handler for markers
    const handleClick = (event: MouseEvent) => {
      if (!onMarkerClick || !earthRef.current) return;

      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const markerMeshes = markersRef.current.map((m) => m.marker);
      const intersects = raycaster.intersectObjects(markerMeshes);

      if (intersects.length > 0) {
        const clickedMarker = intersects[0].object as THREE.Mesh;
        const markerData = markersRef.current.find(
          (m) => m.marker === clickedMarker
        );

        if (markerData) {
          // Get world position of the marker
          const worldPos = new THREE.Vector3();
          worldPos.copy(markerData.localPosition);
          earthRef.current.localToWorld(worldPos);

          // Calculate camera position: zoom directly towards the marker
          const markerNormal = worldPos.clone().normalize();
          const zoomDistance = CONFIG.earth.radius * 2.0;
          const targetCameraPos = markerNormal.multiplyScalar(zoomDistance);

          // Stop auto-rotate
          autoRotateRef.current = false;

          // Setup camera animation with completion callback
          cameraAnimationRef.current = {
            active: true,
            startPos: camera.position.clone(),
            endPos: targetCameraPos,
            startLookAt: new THREE.Vector3(0, 0, 0), // Globe center
            endLookAt: worldPos.clone(),
            progress: 0,
            onComplete: () => {
              // Calculate screen position AFTER animation completes
              const projectedPos = worldPos.clone().project(camera);
              const rect = renderer.domElement.getBoundingClientRect();
              const screenX =
                (projectedPos.x * 0.5 + 0.5) * rect.width + rect.left;
              const screenY =
                (projectedPos.y * -0.5 + 0.5) * rect.height + rect.top;

              // Call parent handler with marker position
              if (onMarkerClick) {
                onMarkerClick(
                  markerData.deals,
                  {
                    x: screenX,
                    y: screenY,
                  },
                  worldPos
                );
              }
            },
          };
        }
      }
    };

    renderer.domElement.addEventListener("click", handleClick);

    // Hover handler for markers
    const handleMouseMove = (event: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const markerMeshes = markersRef.current.map((m) => m.marker);
      const intersects = raycaster.intersectObjects(markerMeshes);

      // Reset previous hover state
      if (hoveredMarkerRef.current) {
        const material = hoveredMarkerRef.current
          .material as THREE.MeshBasicMaterial;
        material.color.set(CONFIG.marker.color);
        hoveredMarkerRef.current.scale.set(1, 1, 1);
        renderer.domElement.style.cursor = "grab";
        hoveredMarkerRef.current = null;
      }

      // Set new hover state
      if (intersects.length > 0) {
        const hoveredMarker = intersects[0].object as THREE.Mesh;
        hoveredMarkerRef.current = hoveredMarker;
        const material = hoveredMarker.material as THREE.MeshBasicMaterial;
        material.color.set("#d4c4b0"); // Lighter brown on hover
        hoveredMarker.scale.set(1.3, 1.3, 1.3);
        renderer.domElement.style.cursor = "pointer";
      }
    };

    renderer.domElement.addEventListener("mousemove", handleMouseMove);

    // Atmosphere shader
    const atmosphereVertexShader = `
      varying vec3 vNormal;
      varying vec3 vPosition;
      void main() {
        vNormal = normalize(normalMatrix * normal);
        vPosition = vec3(modelViewMatrix * vec4(position, 1.0));
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `;
    const atmosphereFragmentShader = `
      varying vec3 vNormal;
      varying vec3 vPosition;
      uniform vec3 uColor;
      uniform float uPower;
      void main() {
        vec3 viewDir = normalize(-vPosition);
        float intensity = pow(1.0 - abs(dot(vNormal, viewDir)), uPower);
        gl_FragColor = vec4(uColor, intensity);
      }
    `;

    // Create atmosphere
    const atmosphereGeometry = new THREE.SphereGeometry(
      CONFIG.earth.radius + CONFIG.atmosphere.radiusOffset,
      128,
      128
    );
    const atmosphereMaterial = new THREE.ShaderMaterial({
      vertexShader: atmosphereVertexShader,
      fragmentShader: atmosphereFragmentShader,
      uniforms: {
        uColor: { value: CONFIG.atmosphere.color },
        uPower: { value: CONFIG.atmosphere.power },
      },
      transparent: true,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
    });
    const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
    scene.add(atmosphere);

    // Generate earth points using Fibonacci sphere distribution
    const createPointGeometry = (
      position: THREE.Vector3,
      uv: THREE.Vector2
    ) => {
      const geometry = new THREE.PlaneGeometry(1, 1);
      const lookAt = new THREE.Object3D();
      lookAt.lookAt(position);
      lookAt.updateMatrix();
      geometry.applyMatrix4(lookAt.matrix);
      geometry.translate(position.x, position.y, position.z);

      const centers = new Float32Array([
        position.x,
        position.y,
        position.z,
        position.x,
        position.y,
        position.z,
        position.x,
        position.y,
        position.z,
        position.x,
        position.y,
        position.z,
      ]);
      const uvs = new Float32Array([
        uv.x,
        uv.y,
        uv.x,
        uv.y,
        uv.x,
        uv.y,
        uv.x,
        uv.y,
      ]);
      geometry.setAttribute("center", new THREE.BufferAttribute(centers, 3));
      geometry.setAttribute("baseUv", new THREE.BufferAttribute(uvs, 2));
      return geometry;
    };

    const generateEarthPoints = (count: number) => {
      const geometries: THREE.BufferGeometry[] = [];
      const goldenRatio = (1 + Math.sqrt(5)) / 2;
      const spherical = new THREE.Spherical();

      for (let i = 0; i < count; i++) {
        const y = 1 - (i / (count - 1)) * 2;
        const radius = Math.sqrt(1 - y * y);
        const phi = (i * 2 * Math.PI) / goldenRatio;
        const pos = new THREE.Vector3(
          Math.cos(phi) * radius,
          y,
          Math.sin(phi) * radius
        ).multiplyScalar(CONFIG.earth.radius);

        spherical.setFromVector3(pos);
        const uv = new THREE.Vector2(
          (spherical.theta + Math.PI) / (Math.PI * 2),
          1 - spherical.phi / Math.PI
        );
        geometries.push(createPointGeometry(pos, uv));
      }
      return geometries;
    };

    // Create earth material with custom shader modifications
    const createEarthMaterial = (texture: THREE.Texture) => {
      const material = new THREE.MeshBasicMaterial({
        color: new THREE.Color(CONFIG.earth.color),
        transparent: true,
      });

      material.onBeforeCompile = (shader) => {
        shader.uniforms.tex = { value: texture };
        shader.uniforms.landSize = { value: CONFIG.dot.landSize };
        shader.uniforms.oceanSize = { value: CONFIG.dot.oceanSize };
        shader.uniforms.scaling = { value: CONFIG.dot.scaling };
        shader.uniforms.oceanOpacity = { value: CONFIG.earth.oceanOpacity };

        shader.vertexShader = `
          uniform sampler2D tex;
          uniform float landSize;
          uniform float oceanSize;
          uniform float scaling;
          attribute vec3 center;
          attribute vec2 baseUv;
          varying float vMap;
          ${shader.vertexShader}
        `.replace(
          "#include <begin_vertex>",
          `#include <begin_vertex>
          float map = texture(tex, baseUv).g;
          vMap = map;
          float isOcean = step(0.5, map);
          float pSize = mix(landSize, oceanSize, isOcean);
          transformed = (position - center) * pSize * scaling + center;`
        );

        shader.fragmentShader = `
          uniform float oceanOpacity;
          varying float vMap;
          ${shader.fragmentShader}
        `.replace(
          "vec4 diffuseColor = vec4( diffuse, opacity );",
          `vec2 hUv = (vUv - 0.5);
          int N = 8;
          float a = atan(hUv.x, hUv.y);
          float r = 3.1415926535 * 2.0 / float(N);
          float d = cos(floor(0.5 + a / r) * r - a) * length(hUv);
          float f = cos(3.1415926535 / float(N)) * 0.5;
          float edgeWidth = 0.02;
          float alpha = 1.0 - smoothstep(f - edgeWidth / 2.0, f + edgeWidth / 2.0, d);
          float isOcean = step(0.5, vMap);
          vec3 finalColor = diffuse * mix(vec3(1.2), vec3(0.3), isOcean);
          float finalOpacity = mix(1.0, oceanOpacity, isOcean);
          vec4 diffuseColor = vec4(finalColor, alpha * opacity * finalOpacity);`
        );
      };

      material.defines = { USE_UV: "" };
      return material;
    };

    // Ping shader for animated rings
    const pingVertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `;
    const pingFragmentShader = `
      uniform float uTime;
      uniform float uDuration;
      uniform vec3 uColor;
      uniform float uOpacity;
      varying vec2 vUv;
      void main() {
        float progress = mod(uTime, uDuration) / uDuration;
        vec2 center = vUv - 0.5;
        float dist = length(center) * 2.0;
        float ring = smoothstep(progress - 0.1, progress, dist) - smoothstep(progress, progress + 0.1, dist);
        float alpha = ring * (1.0 - progress) * uOpacity;
        gl_FragColor = vec4(uColor, alpha * 0.8);
      }
    `;

    // Create markers at coordinates
    const createMarkers = (earth: THREE.Mesh) => {
      const markerGeometry = new THREE.CircleGeometry(CONFIG.marker.size, 32);
      const pingGeometry = new THREE.CircleGeometry(
        CONFIG.marker.size * CONFIG.marker.pingMaxScale,
        32
      );
      const markers: MarkerData[] = [];

      // Group deals by location
      const dealsByLocation = new Map<string, Deal[]>();
      deals.forEach((deal) => {
        const key = `${deal.locationLatitude},${deal.locationLongitude}`;
        if (!dealsByLocation.has(key)) {
          dealsByLocation.set(key, []);
        }
        dealsByLocation.get(key)!.push(deal);
      });

      // Create one marker per location
      let index = 0;
      dealsByLocation.forEach((dealsAtLocation) => {
        const { locationLatitude, locationLongitude } = dealsAtLocation[0];
        const position = latLngToVector3(
          locationLatitude,
          locationLongitude,
          CONFIG.earth.radius * CONFIG.marker.offset
        );
        const normal = position.clone().normalize();

        // Static marker dot
        const markerMaterial = new THREE.MeshBasicMaterial({
          color: CONFIG.marker.color,
          transparent: true,
          side: THREE.DoubleSide,
          depthTest: false,
        });
        const marker = new THREE.Mesh(markerGeometry.clone(), markerMaterial);
        marker.position.copy(position);
        marker.lookAt(position.clone().add(normal));
        marker.renderOrder = 999;
        earth.add(marker);

        // Animated ping ring
        const pingMaterial = new THREE.ShaderMaterial({
          vertexShader: pingVertexShader,
          fragmentShader: pingFragmentShader,
          uniforms: {
            uTime: { value: index * 0.3 }, // Stagger animations
            uDuration: { value: CONFIG.marker.pingDuration },
            uColor: { value: new THREE.Color(CONFIG.marker.color) },
            uOpacity: { value: 1.0 },
          },
          transparent: true,
          side: THREE.DoubleSide,
          depthTest: false,
        });

        const ping = new THREE.Mesh(pingGeometry.clone(), pingMaterial);
        ping.position.copy(position);
        ping.lookAt(position.clone().add(normal));
        ping.renderOrder = 998;
        earth.add(ping);

        markers.push({
          marker,
          ping,
          pingMaterial,
          localPosition: position.clone(),
          deals: dealsAtLocation,
        });

        index++;
      });

      markersRef.current = markers;
    };

    // Load texture and create earth
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(CONFIG.earth.texturePath, (texture) => {
      const geometries = generateEarthPoints(CONFIG.earth.pointsCount);
      const mergedGeometry = mergeGeometries(geometries);
      const material = createEarthMaterial(texture);
      const earth = new THREE.Mesh(mergedGeometry, material);
      earth.rotation.y = CONFIG.earth.initialRotation;
      earthRef.current = earth;
      scene.add(earth);
      createMarkers(earth);
    });

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    // Animation loop
    const clock = new THREE.Clock();
    const worldPos = new THREE.Vector3();
    const animate = () => {
      const delta = clock.getDelta();

      // Handle camera animation
      if (cameraAnimationRef.current?.active) {
        const anim = cameraAnimationRef.current;
        anim.progress += delta * 1.5; // Animation speed

        if (anim.progress >= 1) {
          // Animation complete
          anim.progress = 1;
          anim.active = false;

          // Call completion callback if provided
          if (anim.onComplete) {
            anim.onComplete();
            anim.onComplete = undefined;
          }
        }

        // Easing function (ease-out cubic)
        const t = 1 - Math.pow(1 - anim.progress, 3);

        // Interpolate camera position
        camera.position.lerpVectors(anim.startPos, anim.endPos, t);

        // Look at interpolated target
        const lookAtTarget = new THREE.Vector3().lerpVectors(
          anim.startLookAt,
          anim.endLookAt,
          t
        );
        camera.lookAt(lookAtTarget);

        // Update controls target
        controls.target.copy(lookAtTarget);
      }

      controls.update();
      if (autoRotateRef.current && earthRef.current && !locked) {
        earthRef.current.rotation.y += CONFIG.controls.autoRotateSpeed;
      }
      // Update marker visibility based on camera angle
      if (earthRef.current) {
        markersRef.current.forEach(
          ({ marker, pingMaterial, localPosition }) => {
            // Get world position of marker
            worldPos.copy(localPosition);
            earthRef.current!.localToWorld(worldPos);

            // Calculate vector from globe center to marker (marker's normal)
            const markerNormal = worldPos.clone().normalize();

            // Calculate vector from globe center to camera
            const cameraPos = camera.position.clone().normalize();

            // Dot product: positive means marker is on same side as camera (visible)
            // negative means marker is on opposite side (hidden)
            const dot = markerNormal.dot(cameraPos);

            // Smooth fade as markers approach and pass the horizon
            // Start fading at dot = 0.7 (earlier), fully hidden at dot = 0.3 (well before horizon)
            let opacity;
            if (dot > 0.7) {
              opacity = 1.0; // Fully visible
            } else if (dot < 0.3) {
              opacity = 0.0; // Fully hidden
            } else {
              // Smooth fade in the transition zone
              opacity = (dot - 0.3) / 0.4; // Maps range [0.3, 0.7] to [0, 1]
            }

            (marker.material as THREE.MeshBasicMaterial).opacity = opacity;
            pingMaterial.uniforms.uOpacity.value = opacity;
            pingMaterial.uniforms.uTime.value += delta;
          }
        );
      }
      renderer.render(scene, camera);
    };
    renderer.setAnimationLoop(animate);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      renderer.domElement.removeEventListener("click", handleClick);
      renderer.domElement.removeEventListener("mousemove", handleMouseMove);
      renderer.setAnimationLoop(null);
      renderer.dispose();
      container.removeChild(renderer.domElement);
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry?.dispose();
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m) => m.dispose());
          } else {
            obj.material?.dispose();
          }
        }
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deals, onMarkerClick]);

  // Handle locked state
  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.enabled = !locked;
      if (!locked) {
        autoRotateRef.current = true;
      }
    }
  }, [locked]);

  // Handle camera reset when popup closes
  useEffect(() => {
    if (resetCamera && initialCameraPositionRef.current && cameraRef.current) {
      // Get current camera direction (normalized)
      const currentDir = cameraRef.current.position.clone().normalize();

      // Get initial distance from center
      const initialDistance = initialCameraPositionRef.current.length();

      // Calculate end position: same direction, but at initial distance
      const endPos = currentDir.multiplyScalar(initialDistance);

      // Animate back to initial distance, maintaining current rotation
      cameraAnimationRef.current = {
        active: true,
        startPos: cameraRef.current.position.clone(),
        endPos: endPos,
        startLookAt:
          controlsRef.current?.target.clone() || new THREE.Vector3(0, 0, 0),
        endLookAt: new THREE.Vector3(0, 0, 0), // Globe center
        progress: 0,
      };
    }
  }, [resetCamera]);

  return <div ref={containerRef} className={`w-full h-full ${className}`} />;
}
