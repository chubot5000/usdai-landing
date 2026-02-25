"use client";

import { useRef, useState } from "react";
import Footer from "@/components/Footer";
import MobileNav from "@/components/MobileNav";
import Navigation from "@/components/Navigation";

// ─── Data ────────────────────────────────────────────────────────────────────

interface VideoItem {
  title: string;
  src: string;
}

interface TimelineEntry {
  date: string;
  videos: VideoItem[];
}

const TIMELINE_ENTRIES: TimelineEntry[] = [
  {
    date: "July 2025",
    videos: [
      {
        title: "Hudson (Across the River)",
        src: "https://player.vimeo.com/progressive_redirect/playback/1167454515/rendition/2160p/file.mp4%20%282160p%29.mp4?loc=external&log_user=0&signature=d85ee47f3a7e86b2fca7fff7c10616eeb4bde0df9c9d5d7706e2eb69fe04bce5",
      },
    ],
  },
  {
    date: "August 2025",
    videos: [
      {
        title: "The Allo Game",
        src: "https://player.vimeo.com/progressive_redirect/playback/1110774670/rendition/1080p/file.mp4%20%281080p%29.mp4?loc=external&log_user=0&signature=ed6eb13580e13369c7b81ec087a39aa91889ad0a7a16fbf4c83429fe6c03331c",
      },
    ],
  },
  {
    date: "January 2026",
    videos: [
      {
        title: "Compute Club: Qumulus",
        src: "https://player.vimeo.com/progressive_redirect/playback/1154739126/rendition/1080p/file.mp4%20%281080p%29.mp4?loc=external&log_user=0&signature=7250995d9e096d5f82e93d7a99ca656b4389d0d925b08c1b48b2f8ec045cd05a",
      },
    ],
  },
  {
    date: "Early February 2026",
    videos: [
      {
        title: "The Interest Rate of AI",
        src: "https://player.vimeo.com/progressive_redirect/playback/1157695251/rendition/1440p/file.mp4%20%281440p%29.mp4?loc=external&log_user=0&signature=b1060cca53b7ece84dc34679b4a8fa49545df513b44ed0f10e23265400244dfd",
      },
      {
        title: "The Central Bank of AI",
        src: "https://player.vimeo.com/progressive_redirect/playback/1159458804/rendition/1440p/file.mp4%20%281440p%29.mp4?loc=external&log_user=0&signature=98731bba4efe4647cb6b6f9a7a4f51d43c30c7993a4f50555167741ba2b63817",
      },
    ],
  },
  {
    date: "Late February 2026",
    videos: [
      {
        title: "USD.AI LevelUp",
        src: "https://player.vimeo.com/progressive_redirect/playback/1167451438/rendition/1080p/file.mp4%20%281080p%29.mp4?loc=external&log_user=0&signature=1ddc6ddd1b7a314df142747d6c0a3f3b0ab49184e5ca9674e81cc00ad97da04f",
      },
    ],
  },
];

const HERO_VIDEO_SRC =
  "https://player.vimeo.com/progressive_redirect/playback/1157695251/rendition/1440p/file.mp4%20%281440p%29.mp4?loc=external&log_user=0&signature=b1060cca53b7ece84dc34679b4a8fa49545df513b44ed0f10e23265400244dfd";

// ─── Video Player Component ─────────────────────────────────────────────────

function VideoPlayer({ video }: { video: VideoItem }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  function handlePlay(e: React.MouseEvent) {
    e.stopPropagation();
    if (videoRef.current) {
      setIsPlaying(true);
      videoRef.current.controls = true;
      videoRef.current.play();
    }
  }

  return (
    <div className="mb-8 last:mb-0">
      <div className="text-[15px] font-medium text-primary tracking-[0.2px] mb-3">
        {video.title}
      </div>
      <div className="w-full rounded-xl overflow-hidden bg-dark aspect-video relative">
        <video
          ref={videoRef}
          preload="metadata"
          playsInline
          className="w-full h-full object-cover block"
        >
          <source src={video.src} type="video/mp4" />
        </video>
        {!isPlaying && (
          <div
            className="absolute inset-0 flex items-center justify-center bg-dark/25 cursor-pointer transition-colors hover:bg-dark/15"
            onClick={handlePlay}
          >
            <div className="w-[72px] h-[72px] rounded-full bg-white/95 flex items-center justify-center shadow-[0_4px_24px_rgba(0,0,0,0.15)] transition-transform hover:scale-[1.08] max-sm:w-14 max-sm:h-14">
              <svg
                className="w-7 h-7 ml-[3px] max-sm:w-[22px] max-sm:h-[22px]"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path d="M8 5v14l11-7L8 5z" fill="#2F2823" />
              </svg>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Timeline Entry Component ────────────────────────────────────────────────

function TimelineEntryCard({ entry }: { entry: TimelineEntry }) {
  const [isOpen, setIsOpen] = useState(false);
  const videosRef = useRef<HTMLDivElement>(null);

  function handleToggle() {
    if (isOpen && videosRef.current) {
      videosRef.current.querySelectorAll("video").forEach((v) => v.pause());
    }
    setIsOpen(!isOpen);
  }

  return (
    <div className="relative mb-4 last:mb-0">
      {/* Dot */}
      <div
        className={`absolute -left-[45px] top-4 w-2.5 h-2.5 rounded-full border-2 border-white z-[1] transition-all max-lg:-left-[37px] max-sm:hidden ${
          isOpen
            ? "bg-primary shadow-[0_0_0_3px_var(--color-secondary)]"
            : "bg-secondary shadow-[0_0_0_3px_var(--color-feldspar-dust)]"
        }`}
      />

      {/* Header */}
      <div
        className="flex items-center justify-between cursor-pointer py-3.5 select-none transition-opacity hover:opacity-70"
        onClick={handleToggle}
      >
        <span className="font-eiko font-light text-[clamp(20px,2.2vw,28px)] text-dark leading-[1.3]">
          {entry.date}
        </span>
        <svg
          className={`w-[18px] h-[18px] shrink-0 ml-4 text-secondary transition-transform duration-300 ${
            isOpen ? "rotate-90" : ""
          }`}
          viewBox="0 0 16 16"
          fill="none"
        >
          <path
            d="M6 4l4 4-4 4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Body */}
      <div
        ref={videosRef}
        className="overflow-hidden transition-[max-height] duration-500"
        style={{
          maxHeight: isOpen ? "1600px" : "0px",
          transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <div className="py-2 pb-6">
          {entry.videos.map((video) => (
            <VideoPlayer key={video.title} video={video} />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Section Components ──────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section className="relative w-full h-screen min-h-[600px] bg-white p-[10px]">
      {/* Nav above overflow-hidden container */}
      <div className="absolute top-[10px] left-[10px] right-[10px] z-20 px-4 sm:px-8 md:px-[60px] lg:px-[100px]">
        <div className="hidden lg:block">
          <Navigation variant="light" activePage="video-timeline" />
        </div>
        <div className="lg:hidden">
          <MobileNav variant="light" activePage="video-timeline" />
        </div>
      </div>

      <div className="relative w-full h-full overflow-hidden rounded-[21px]">
        {/* Background video */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            playsInline
            loop
            className="object-cover absolute w-full h-full"
          >
            <source src={HERO_VIDEO_SRC} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative w-full h-full px-4 sm:px-8 md:px-[60px] lg:px-[100px] flex flex-col z-10">
          <div className="flex-1 flex flex-col justify-center">
            <div className="max-w-[700px] mx-auto text-center text-white">
              <div className="inline-flex items-center gap-1.5 text-[12px] font-semibold uppercase tracking-[1.5px] text-white/70 mb-6">
                Insights · Video
              </div>
              <h1 className="font-eiko font-light text-[clamp(32px,4vw,52px)] text-white leading-[1.08] mb-5">
                Building the future of
                <br />
                AI infrastructure — on film
              </h1>
              <p className="text-[17px] text-white/75 max-w-[560px] mx-auto leading-[1.7]">
                From our earliest experiments to global launches, follow the
                USD.AI story as it unfolds. Every milestone, every breakthrough,
                captured in motion.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineSection() {
  return (
    <section className="py-[100px] px-20 max-w-[1200px] mx-auto max-lg:py-12 max-lg:px-6 max-lg:pb-16">
      <div className="relative pl-12 max-lg:pl-10 max-sm:pl-0">
        {/* Vertical line */}
        <div className="absolute left-[7.5px] top-0 bottom-0 w-px bg-feldspar-dust max-sm:hidden" />

        {TIMELINE_ENTRIES.map((entry) => (
          <TimelineEntryCard key={entry.date} entry={entry} />
        ))}
      </div>
    </section>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

export default function VideoTimelineContent() {
  return (
    <>
      <HeroSection />

      <div className="bg-feature-bg">
        <TimelineSection />
      </div>

      <Footer />
    </>
  );
}
