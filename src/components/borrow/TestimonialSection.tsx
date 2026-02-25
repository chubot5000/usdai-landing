"use client";

import { useRef, useState, useEffect } from "react";

export default function TestimonialSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayVideo = () => {
    setIsPlaying(true);
  };

  useEffect(() => {
    if (isPlaying && videoRef.current) {
      videoRef.current.volume = 0.5;
      videoRef.current.play().catch((err) => {
        console.error("Error playing video:", err);
      });
    }
  }, [isPlaying]);

  const handleVideoEnd = () => {
    setIsPlaying(false);
  };

  return (
    <section className="w-full h-screen min-h-[600px] bg-white p-[10px]">
      <div
        className="relative w-full h-full overflow-hidden rounded-[21px] bg-cover bg-center"
        style={{ backgroundImage: "url(/images/david.jpg)" }}
      >
        {/* Background Video - Only render when playing */}
        {isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center bg-black rounded-[21px]">
            <video
              ref={videoRef}
              playsInline
              controls
              className="w-full h-full object-contain"
              onEnded={handleVideoEnd}
            >
              <source
                src="https://player.vimeo.com/progressive_redirect/playback/1157695251/rendition/2160p/file.mp4%20%282160p%29.mp4?loc=external&log_user=0&signature=71be652f60774608c724abd84b59ffb3f411a958cf4f05805a70f82df406b428"
                type="video/mp4"
              />
              <source
                src="https://player.vimeo.com/progressive_redirect/playback/1157695251/rendition/1080p/file.mp4%20%281080p%29.mp4?loc=external&log_user=0&signature=89be2eccf1376295f35293a3d92e25a1855863d207e9ab6641fc794f5493fb22"
                type="video/mp4"
              />
            </video>
          </div>
        )}

        {/* Content Overlay */}
        {!isPlaying && (
          <>
            <div className="absolute inset-0 flex flex-col justify-start px-4 sm:px-8 md:px-[60px] lg:px-[77px] pt-[120px] sm:pt-[150px] md:pt-[178px]">
              {/* Tag Button */}
              <button
                onClick={handlePlayVideo}
                className="inline-flex items-center justify-center overflow-hidden mb-4 w-fit hover:opacity-80 transition-opacity cursor-pointer"
                style={{
                  height: "28px",
                  paddingLeft: "11px",
                  paddingRight: "11px",
                  paddingTop: "1px",
                  paddingBottom: "1px",
                  borderRadius: "48px",
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  backdropFilter: "blur(121.95px)",
                }}
              >
                <span
                  className="whitespace-nowrap text-[12px] sm:text-[14px]"
                  style={{
                    color: "white",
                    letterSpacing: "0.07px",
                    lineHeight: "1.5",
                    fontWeight: 300,
                  }}
                >
                  Watch our founders speak on USD.AI →
                </span>
              </button>

              {/* Main Text */}
              <p className="text-[18px] sm:text-[20px] md:text-[24px] text-white leading-normal max-w-[545px]">
                Over $1.2B in executed GPU-backed credit facilities.
              </p>
            </div>

            {/* Centered Play Button */}
            <button
              onClick={handlePlayVideo}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center cursor-pointer group"
              aria-label="Play video"
            >
              <div className="w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-full border-2 border-[#a99482] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 text-[#a99482] drop-shadow-lg ml-1"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </button>
          </>
        )}
      </div>
    </section>
  );
}
