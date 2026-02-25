import Image from "next/image";

const backerLogos = [
  { src: "coinbase-ventures.svg", alt: "Coinbase Ventures" },
  { src: "dcg.svg", alt: "DCG" },
  { src: "dragonfly.svg", alt: "Dragonfly" },
  { src: "framework.svg", alt: "Framework" },
  { src: "nvidia-inception.svg", alt: "NVIDIA Inception" },
  { src: "pyusd.svg", alt: "PYUSD" },
];

export default function BackersTicker() {
  return (
    <div className="pb-[60px] sm:pb-[80px] md:pb-[100px] lg:pb-[125px] flex flex-col items-center">
      {/* "Trusted by" text - centered */}
      <div className="text-[14px] md:text-[16px] text-[#fff1e5] tracking-[0.08px] leading-normal mb-4 sm:mb-6 text-center">
        Trusted by global institutions
      </div>

      {/* Partner Logos with fade mask and ticker animation */}
      <div
        className="w-full max-w-[836px] h-[50px] overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
        }}
      >
        <div
          className="flex items-center"
          style={{
            animation: "ticker 30s linear infinite",
            width: "fit-content",
          }}
        >
          {/* Duplicate logos for seamless loop */}
          {[...Array(2)].map((_, setIndex) => (
            <div key={setIndex} className="flex items-center shrink-0">
              {backerLogos.map((logo, index) => (
                <Image
                  key={`${setIndex}-${index}`}
                  src={`/images/backers/${logo.src}`}
                  alt={logo.alt}
                  width={106}
                  height={27}
                  className="brightness-0 invert w-auto h-10 lg:h-12"
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
