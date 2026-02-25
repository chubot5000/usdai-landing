"use client";

import { useState, useCallback } from "react";

/* ─── SVG Components ─── */

const LogoGlyph = ({ className }: { className?: string }) => (
  <svg className={className} width="166" height="166" viewBox="0 0 166 166" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M23.3018 140.282C-8.48429 107.462 -7.64598 55.088 25.1743 23.3018C57.9945 -8.48429 110.368 -7.64598 142.154 25.1743C173.941 57.9945 173.102 110.368 140.282 142.154C107.462 173.941 55.088 173.102 23.3018 140.282Z" fill="#A99482" />
    <path d="M26.5714 136.883C-3.40308 105.934 -2.61254 56.5449 28.3371 26.5704C59.2868 -3.40405 108.676 -2.61352 138.65 28.3361C168.625 59.2858 167.834 108.675 136.884 138.649C105.935 168.624 56.5459 167.833 26.5714 136.883Z" fill="#2F2823" />
    <path d="M33.5156 67.8227L46.6348 86.1903L82.6678 64.8329V38.6904L33.5156 67.8227Z" fill="#F7F3EE" />
    <path d="M49.259 89.8623L62.3782 108.23L82.6678 96.2056V70.0614L49.259 89.8623Z" fill="#F7F3EE" />
    <path d="M65.0025 111.904L75.4975 126.598L82.6679 122.348V101.434L82.4399 101.568L65.0025 111.904Z" fill="#F7F3EE" />
    <path d="M131.82 67.8227L118.701 86.1903L82.668 64.8329V38.6904L131.82 67.8227Z" fill="#A99482" />
    <path d="M116.077 89.8623L102.958 108.23L82.668 96.2056V70.0614L116.077 89.8623Z" fill="#A99482" />
    <path d="M100.333 111.904L89.8384 126.598L82.668 122.348V101.434L82.896 101.568L100.333 111.904Z" fill="#A99482" />
  </svg>
);

const FullLockupDark = ({ className }: { className?: string }) => (
  <svg className={className} width="721" height="166" viewBox="0 0 721 166" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M23.3018 140.282C-8.48429 107.462 -7.64598 55.088 25.1743 23.3018C57.9945 -8.48429 110.368 -7.64598 142.154 25.1743C173.941 57.9945 173.102 110.368 140.282 142.154C107.462 173.941 55.088 173.102 23.3018 140.282Z" fill="#A99482" />
    <path d="M26.5714 136.883C-3.40308 105.934 -2.61254 56.5449 28.3371 26.5704C59.2868 -3.40405 108.676 -2.61352 138.65 28.3361C168.625 59.2858 167.834 108.675 136.884 138.649C105.935 168.624 56.5459 167.833 26.5714 136.883Z" fill="#2F2823" />
    <path d="M33.5156 67.8227L46.6348 86.1903L82.6678 64.8329V38.6904L33.5156 67.8227Z" fill="#F7F3EE" />
    <path d="M49.259 89.8623L62.3782 108.23L82.6678 96.2056V70.0614L49.259 89.8623Z" fill="#F7F3EE" />
    <path d="M65.0025 111.904L75.4975 126.598L82.6679 122.348V101.434L82.4399 101.568L65.0025 111.904Z" fill="#F7F3EE" />
    <path d="M131.82 67.8227L118.701 86.1903L82.668 64.8329V38.6904L131.82 67.8227Z" fill="#A99482" />
    <path d="M116.077 89.8623L102.958 108.23L82.668 96.2056V70.0614L116.077 89.8623Z" fill="#A99482" />
    <path d="M100.333 111.904L89.8384 126.598L82.668 122.348V101.434L82.896 101.568L100.333 111.904Z" fill="#A99482" />
    <path d="M265.075 140.977C240.007 140.977 222.037 126.178 222.037 105.64V36.4769L210.258 27.4162H252.541L240.913 36.4769L241.064 102.016C241.064 118.325 254.202 130.104 272.324 130.104C289.69 130.104 302.073 118.627 302.073 102.62V36.4769L286.066 27.4162H322.006L305.999 36.4769L306.15 103.979C306.15 125.423 288.784 140.977 265.075 140.977Z" fill="white" />
    <path d="M365.73 140.977C353.498 140.977 338.246 138.561 328.883 135.088V132.52L324.202 98.3917C334.622 123.913 349.874 137.957 367.844 137.957C380.68 137.957 389.59 129.802 389.59 117.57C389.59 85.8577 326.467 96.2775 326.467 57.1655C326.467 38.7421 342.776 25 365.126 25C375.546 25 387.476 27.7182 396.084 32.2486V34.8158L400.614 63.659C389.892 40.5542 376.905 28.1713 361.502 28.1713C348.968 28.1713 339.907 36.6279 339.907 48.2558C339.907 77.5521 403.03 67.8873 403.03 108.207C403.03 127.084 388.231 140.977 365.73 140.977Z" fill="white" />
    <path d="M455.731 139.165H409.974L421.602 130.104V36.4769L409.974 27.4162H455.731C492.578 27.4162 520.062 51.5781 520.062 82.3845C520.062 114.248 492.578 139.165 455.731 139.165ZM440.479 30.5874V135.994H454.674C480.95 135.994 499.373 113.795 499.373 82.3845C499.373 51.8801 480.95 30.5874 454.825 30.5874H440.479Z" fill="white" />
    <path d="M543.996 140.373H523.458V118.929H543.996V140.373Z" fill="white" />
    <path d="M587.604 139.165H551.663L566.161 130.859L603.46 40.5542L596.061 29.6814L618.713 25.7551L663.11 131.161L675.191 139.165H625.81L641.817 131.312L628.528 99.4488H582.923L570.389 130.859L587.604 139.165ZM604.518 46.1416L584.282 96.2775H627.169L606.179 46.1416H604.518Z" fill="white" />
    <path d="M678.227 139.165L689.855 130.859V35.7218L678.227 27.4162H720.51L708.731 35.7218V130.859L720.51 139.165H678.227Z" fill="white" />
  </svg>
);

const FullLockupLight = ({ className }: { className?: string }) => (
  <svg className={className} width="721" height="166" viewBox="0 0 721 166" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M23.3018 140.282C-8.48429 107.462 -7.64598 55.088 25.1743 23.3018C57.9945 -8.48429 110.368 -7.64598 142.154 25.1743C173.941 57.9945 173.102 110.368 140.282 142.154C107.462 173.941 55.088 173.102 23.3018 140.282Z" fill="#A99482" />
    <path d="M26.5714 136.883C-3.40308 105.934 -2.61254 56.5449 28.3371 26.5704C59.2868 -3.40405 108.676 -2.61352 138.65 28.3361C168.625 59.2858 167.834 108.675 136.884 138.649C105.935 168.624 56.5459 167.833 26.5714 136.883Z" fill="#2F2823" />
    <path d="M33.5156 67.8227L46.6348 86.1903L82.6678 64.8329V38.6904L33.5156 67.8227Z" fill="#F7F3EE" />
    <path d="M49.259 89.8623L62.3782 108.23L82.6678 96.2056V70.0614L49.259 89.8623Z" fill="#F7F3EE" />
    <path d="M65.0025 111.904L75.4975 126.598L82.6679 122.348V101.434L82.4399 101.568L65.0025 111.904Z" fill="#F7F3EE" />
    <path d="M131.82 67.8227L118.701 86.1903L82.668 64.8329V38.6904L131.82 67.8227Z" fill="#A99482" />
    <path d="M116.077 89.8623L102.958 108.23L82.668 96.2056V70.0614L116.077 89.8623Z" fill="#A99482" />
    <path d="M100.333 111.904L89.8384 126.598L82.668 122.348V101.434L82.896 101.568L100.333 111.904Z" fill="#A99482" />
    <path d="M265.075 140.977C240.007 140.977 222.037 126.178 222.037 105.64V36.4769L210.258 27.4162H252.541L240.913 36.4769L241.064 102.016C241.064 118.325 254.202 130.104 272.324 130.104C289.69 130.104 302.073 118.627 302.073 102.62V36.4769L286.066 27.4162H322.006L305.999 36.4769L306.15 103.979C306.15 125.423 288.784 140.977 265.075 140.977Z" fill="#2F2823" />
    <path d="M365.73 140.977C353.498 140.977 338.246 138.561 328.883 135.088V132.52L324.202 98.3917C334.622 123.913 349.874 137.957 367.844 137.957C380.68 137.957 389.59 129.802 389.59 117.57C389.59 85.8577 326.467 96.2775 326.467 57.1655C326.467 38.7421 342.776 25 365.126 25C375.546 25 387.476 27.7182 396.084 32.2486V34.8158L400.614 63.659C389.892 40.5542 376.905 28.1713 361.502 28.1713C348.968 28.1713 339.907 36.6279 339.907 48.2558C339.907 77.5521 403.03 67.8873 403.03 108.207C403.03 127.084 388.231 140.977 365.73 140.977Z" fill="#2F2823" />
    <path d="M455.731 139.165H409.974L421.602 130.104V36.4769L409.974 27.4162H455.731C492.578 27.4162 520.062 51.5781 520.062 82.3845C520.062 114.248 492.578 139.165 455.731 139.165ZM440.479 30.5874V135.994H454.674C480.95 135.994 499.373 113.795 499.373 82.3845C499.373 51.8801 480.95 30.5874 454.825 30.5874H440.479Z" fill="#2F2823" />
    <path d="M543.996 140.373H523.458V118.929H543.996V140.373Z" fill="#2F2823" />
    <path d="M587.604 139.165H551.663L566.161 130.859L603.46 40.5542L596.061 29.6814L618.713 25.7551L663.11 131.161L675.191 139.165H625.81L641.817 131.312L628.528 99.4488H582.923L570.389 130.859L587.604 139.165ZM604.518 46.1416L584.282 96.2775H627.169L606.179 46.1416H604.518Z" fill="#2F2823" />
    <path d="M678.227 139.165L689.855 130.859V35.7218L678.227 27.4162H720.51L708.731 35.7218V130.859L720.51 139.165H678.227Z" fill="#2F2823" />
  </svg>
);

const HeaderLockup = ({ className }: { className?: string }) => (
  <svg className={className} width="721" height="166" viewBox="0 0 721 166" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M23.3018 140.282C-8.48429 107.462 -7.64598 55.088 25.1743 23.3018C57.9945 -8.48429 110.368 -7.64598 142.154 25.1743C173.941 57.9945 173.102 110.368 140.282 142.154C107.462 173.941 55.088 173.102 23.3018 140.282Z" fill="#A99482" />
    <path d="M26.5714 136.883C-3.40308 105.934 -2.61254 56.5449 28.3371 26.5704C59.2868 -3.40405 108.676 -2.61352 138.65 28.3361C168.625 59.2858 167.834 108.675 136.884 138.649C105.935 168.624 56.5459 167.833 26.5714 136.883Z" fill="#2F2823" />
    <path d="M33.5156 67.8227L46.6348 86.1903L82.6678 64.8329V38.6904L33.5156 67.8227Z" fill="#F7F3EE" />
    <path d="M49.259 89.8623L62.3782 108.23L82.6678 96.2056V70.0614L49.259 89.8623Z" fill="#F7F3EE" />
    <path d="M65.0025 111.904L75.4975 126.598L82.6679 122.348V101.434L82.4399 101.568L65.0025 111.904Z" fill="#F7F3EE" />
    <path d="M131.82 67.8227L118.701 86.1903L82.668 64.8329V38.6904L131.82 67.8227Z" fill="#A99482" />
    <path d="M116.077 89.8623L102.958 108.23L82.668 96.2056V70.0614L116.077 89.8623Z" fill="#A99482" />
    <path d="M100.333 111.904L89.8384 126.598L82.668 122.348V101.434L82.896 101.568L100.333 111.904Z" fill="#A99482" />
    <path d="M265.075 140.977C240.007 140.977 222.037 126.178 222.037 105.64V36.4769L210.258 27.4162H252.541L240.913 36.4769L241.064 102.016C241.064 118.325 254.202 130.104 272.324 130.104C289.69 130.104 302.073 118.627 302.073 102.62V36.4769L286.066 27.4162H322.006L305.999 36.4769L306.15 103.979C306.15 125.423 288.784 140.977 265.075 140.977Z" fill="#2F2823" />
    <path d="M365.73 140.977C353.498 140.977 338.246 138.561 328.883 135.088V132.52L324.202 98.3917C334.622 123.913 349.874 137.957 367.844 137.957C380.68 137.957 389.59 129.802 389.59 117.57C389.59 85.8577 326.467 96.2775 326.467 57.1655C326.467 38.7421 342.776 25 365.126 25C375.546 25 387.476 27.7182 396.084 32.2486V34.8158L400.614 63.659C389.892 40.5542 376.905 28.1713 361.502 28.1713C348.968 28.1713 339.907 36.6279 339.907 48.2558C339.907 77.5521 403.03 67.8873 403.03 108.207C403.03 127.084 388.231 140.977 365.73 140.977Z" fill="#2F2823" />
    <path d="M455.731 139.165H409.974L421.602 130.104V36.4769L409.974 27.4162H455.731C492.578 27.4162 520.062 51.5781 520.062 82.3845C520.062 114.248 492.578 139.165 455.731 139.165ZM440.479 30.5874V135.994H454.674C480.95 135.994 499.373 113.795 499.373 82.3845C499.373 51.8801 480.95 30.5874 454.825 30.5874H440.479Z" fill="#2F2823" />
    <path d="M543.996 140.373H523.458V118.929H543.996V140.373Z" fill="#2F2823" />
    <path d="M587.604 139.165H551.663L566.161 130.859L603.46 40.5542L596.061 29.6814L618.713 25.7551L663.11 131.161L675.191 139.165H625.81L641.817 131.312L628.528 99.4488H582.923L570.389 130.859L587.604 139.165ZM604.518 46.1416L584.282 96.2775H627.169L606.179 46.1416H604.518Z" fill="#2F2823" />
    <path d="M678.227 139.165L689.855 130.859V35.7218L678.227 27.4162H720.51L708.731 35.7218V130.859L720.51 139.165H678.227Z" fill="#2F2823" />
  </svg>
);

const WordmarkSvg = ({ className }: { className?: string }) => (
  <svg className={className} width="560" height="166" viewBox="210 0 511 166" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M265.075 140.977C240.007 140.977 222.037 126.178 222.037 105.64V36.4769L210.258 27.4162H252.541L240.913 36.4769L241.064 102.016C241.064 118.325 254.202 130.104 272.324 130.104C289.69 130.104 302.073 118.627 302.073 102.62V36.4769L286.066 27.4162H322.006L305.999 36.4769L306.15 103.979C306.15 125.423 288.784 140.977 265.075 140.977Z" fill="#2F2823" />
    <path d="M365.73 140.977C353.498 140.977 338.246 138.561 328.883 135.088V132.52L324.202 98.3917C334.622 123.913 349.874 137.957 367.844 137.957C380.68 137.957 389.59 129.802 389.59 117.57C389.59 85.8577 326.467 96.2775 326.467 57.1655C326.467 38.7421 342.776 25 365.126 25C375.546 25 387.476 27.7182 396.084 32.2486V34.8158L400.614 63.659C389.892 40.5542 376.905 28.1713 361.502 28.1713C348.968 28.1713 339.907 36.6279 339.907 48.2558C339.907 77.5521 403.03 67.8873 403.03 108.207C403.03 127.084 388.231 140.977 365.73 140.977Z" fill="#2F2823" />
    <path d="M455.731 139.165H409.974L421.602 130.104V36.4769L409.974 27.4162H455.731C492.578 27.4162 520.062 51.5781 520.062 82.3845C520.062 114.248 492.578 139.165 455.731 139.165ZM440.479 30.5874V135.994H454.674C480.95 135.994 499.373 113.795 499.373 82.3845C499.373 51.8801 480.95 30.5874 454.825 30.5874H440.479Z" fill="#2F2823" />
    <path d="M543.996 140.373H523.458V118.929H543.996V140.373Z" fill="#2F2823" />
    <path d="M587.604 139.165H551.663L566.161 130.859L603.46 40.5542L596.061 29.6814L618.713 25.7551L663.11 131.161L675.191 139.165H625.81L641.817 131.312L628.528 99.4488H582.923L570.389 130.859L587.604 139.165ZM604.518 46.1416L584.282 96.2775H627.169L606.179 46.1416H604.518Z" fill="#2F2823" />
    <path d="M678.227 139.165L689.855 130.859V35.7218L678.227 27.4162H720.51L708.731 35.7218V130.859L720.51 139.165H678.227Z" fill="#2F2823" />
  </svg>
);

/* ─── Data ─── */

const earthTones = [
  { name: "Quartzite Sand", hex: "#F7F3EE" },
  { name: "Feldspar Dust", hex: "#DBD0C6" },
  { name: "Canyon Wall", hex: "#A99482" },
  { name: "Sintered Earth", hex: "#655343" },
  { name: "Lignite Mines", hex: "#2F2823" },
];

const coolTones = [
  { name: "Fog Over Ice", hex: "#EDF9F8" },
  { name: "River Silt", hex: "#BEDCD9" },
  { name: "Turquoise Vein", hex: "#68C4BA" },
  { name: "Algae Stone", hex: "#377770" },
  { name: "Permian Basin", hex: "#16413C" },
];

const eikoWeights = [
  { label: "Thin", tw: "font-thin" },
  { label: "Extra Light", tw: "font-extralight" },
  { label: "Light", tw: "font-light" },
  { label: "Regular", tw: "font-normal" },
  { label: "Medium", tw: "font-medium" },
  { label: "Bold", tw: "font-bold" },
  { label: "Heavy", tw: "font-extrabold" },
  { label: "Black", tw: "font-black" },
];

const swissWeights = [
  { label: "Light", tw: "font-light" },
  { label: "Regular", tw: "font-normal" },
  { label: "Medium", tw: "font-medium" },
  { label: "SemiBold", tw: "font-semibold" },
  { label: "Bold", tw: "font-bold" },
];

const bodyText =
  "USD.AI enables GPU-collateralized lending through decentralized pools, bridging the gap between hardware owners and capital providers. Our protocol ensures transparent, on-chain verification of physical assets.";

/* ─── Component ─── */

export default function BrandKitContent() {
  const [toast, setToast] = useState<string | null>(null);
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 1500);
  }, []);

  const copySvg = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const svg = e.currentTarget.querySelector("svg");
      if (!svg) return;
      const svgString = new XMLSerializer().serializeToString(svg);
      navigator.clipboard.writeText(svgString).then(() => {
        showToast("SVG copied to clipboard");
      });
    },
    [showToast]
  );

  const copyColor = useCallback(
    (hex: string) => {
      navigator.clipboard.writeText(hex).then(() => {
        setCopiedHex(hex);
        showToast(`${hex} copied to clipboard`);
        setTimeout(() => setCopiedHex(null), 1500);
      });
    },
    [showToast]
  );

  const sectionLabel = "text-[11px] font-semibold tracking-[2px] uppercase text-[#A99482] mb-8 pb-3 border-b border-[#E5CBB4]";

  return (
    <div className="bg-white text-[#2F2823] leading-relaxed">
      <div className="max-w-[1200px] mx-auto px-10 py-[60px] md:px-10 sm:px-5">
        {/* Header */}
        <div className="text-center mb-[60px]">
          <h1 className="font-eiko text-[clamp(48px,6vw,80px)] font-normal leading-[1.1] text-[#2F2823] mb-4">
            Brand Kit
          </h1>
          <p className="text-base text-[#A99482] max-w-[480px] mx-auto">
            Official logos, colors, and typography for USD.AI. For press, partners, and integrations.
          </p>
        </div>

        {/* Lockups & Glyphs */}
        <section className="mb-20">
          <div className={sectionLabel}>Lockups &amp; Glyphs</div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {/* Logo Mark */}
            <div className="flex flex-col">
              <div
                onClick={copySvg}
                className="flex-1 flex items-center justify-center border border-[#E5CBB4] rounded-lg bg-white p-10 min-h-[180px] cursor-pointer transition-all duration-200 hover:-translate-y-[3px] hover:shadow-lg hover:border-[#A99482] active:-translate-y-[1px] relative group"
              >
                <LogoGlyph className="max-w-full h-auto" />
                <span className="absolute bottom-3 right-4 text-[11px] font-medium tracking-[1px] uppercase text-[#A99482] opacity-0 group-hover:opacity-100 transition-opacity">
                  Click to copy SVG
                </span>
              </div>
              <div className="text-[13px] font-medium text-[#655343] mt-3 tracking-[0.3px]">Logo Mark</div>
            </div>

            {/* Full Lockup Dark */}
            <div className="flex flex-col">
              <div
                onClick={copySvg}
                className="flex-1 flex items-center justify-center border border-[#E5CBB4] rounded-lg bg-[#2F2823] p-10 min-h-[180px] cursor-pointer transition-all duration-200 hover:-translate-y-[3px] hover:shadow-lg hover:border-[#A99482] active:-translate-y-[1px] relative group"
              >
                <FullLockupDark className="max-w-[70%] h-auto" />
                <span className="absolute bottom-3 right-4 text-[11px] font-medium tracking-[1px] uppercase text-[#A99482]/60 opacity-0 group-hover:opacity-100 transition-opacity">
                  Click to copy SVG
                </span>
              </div>
              <div className="text-[13px] font-medium text-[#655343] mt-3 tracking-[0.3px]">Full Lockup — Dark</div>
            </div>

            {/* Full Lockup Light */}
            <div className="flex flex-col">
              <div
                onClick={copySvg}
                className="flex-1 flex items-center justify-center border border-[#E5CBB4] rounded-lg bg-white p-10 min-h-[180px] cursor-pointer transition-all duration-200 hover:-translate-y-[3px] hover:shadow-lg hover:border-[#A99482] active:-translate-y-[1px] relative group"
              >
                <FullLockupLight className="max-w-[70%] h-auto" />
                <span className="absolute bottom-3 right-4 text-[11px] font-medium tracking-[1px] uppercase text-[#A99482] opacity-0 group-hover:opacity-100 transition-opacity">
                  Click to copy SVG
                </span>
              </div>
              <div className="text-[13px] font-medium text-[#655343] mt-3 tracking-[0.3px]">Full Lockup — Light</div>
            </div>
          </div>
        </section>

        {/* Color Palette — Earth Tones */}
        <section className="mb-20">
          <div className={sectionLabel}>Color Palette — Earth Tones</div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-5 mb-10">
            {earthTones.map((c) => (
              <div
                key={c.hex}
                onClick={() => copyColor(c.hex)}
                className="cursor-pointer transition-transform duration-200 hover:-translate-y-[2px]"
              >
                <div
                  className="w-full aspect-[4/3] rounded-[4px] border border-black/[0.06]"
                  style={{ backgroundColor: c.hex }}
                />
                <div className="text-sm font-normal text-[#2F2823] mt-2.5">{c.name}</div>
                <div className="text-xs font-light text-[#999] mt-0.5">
                  {copiedHex === c.hex ? (
                    <span className="text-[#A99482] font-medium">Copied!</span>
                  ) : (
                    c.hex
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className={sectionLabel}>Color Palette — Cool Tones</div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-5">
            {coolTones.map((c) => (
              <div
                key={c.hex}
                onClick={() => copyColor(c.hex)}
                className="cursor-pointer transition-transform duration-200 hover:-translate-y-[2px]"
              >
                <div
                  className="w-full aspect-[4/3] rounded-[4px] border border-black/[0.06]"
                  style={{ backgroundColor: c.hex }}
                />
                <div className="text-sm font-normal text-[#2F2823] mt-2.5">{c.name}</div>
                <div className="text-xs font-light text-[#999] mt-0.5">
                  {copiedHex === c.hex ? (
                    <span className="text-[#A99482] font-medium">Copied!</span>
                  ) : (
                    c.hex
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Typography — PP Eiko */}
        <section className="mb-20">
          <div className={sectionLabel}>Typography — PP Eiko (Titles)</div>
          <div className="mb-12">
            {eikoWeights.map((w) => (
              <div key={w.label} className="flex items-baseline gap-6 py-4 border-b border-[#f0ebe6] flex-col sm:flex-row sm:gap-6">
                <span className="text-[11px] font-medium text-[#A99482] w-[100px] shrink-0 uppercase tracking-[1px]">
                  {w.label}
                </span>
                <span className={`text-[32px] text-[#2F2823] flex-1 font-eiko ${w.tw}`}>
                  USD.AI
                </span>
              </div>
            ))}
          </div>

          <div className={sectionLabel}>Typography — SwissNow (Body)</div>
          <div className="mb-12">
            {swissWeights.map((w) => (
              <div key={w.label} className="flex items-baseline gap-6 py-4 border-b border-[#f0ebe6] flex-col sm:flex-row sm:gap-6">
                <span className="text-[11px] font-medium text-[#A99482] w-[100px] shrink-0 uppercase tracking-[1px]">
                  {w.label}
                </span>
                <span className={`text-[32px] text-[#2F2823] flex-1 ${w.tw}`}>
                  The future of decentralized lending
                </span>
              </div>
            ))}
          </div>

          {/* Body Sample */}
          <div>
            <div className="text-xs font-medium text-[#A99482] mb-4 tracking-[1px] uppercase">
              Body Sample
            </div>
            <p className="text-base leading-[1.7] text-[#655343] max-w-[640px] font-light mb-4">
              {bodyText}
            </p>
            <p className="text-base leading-[1.7] text-[#655343] max-w-[640px] font-normal mb-4">
              {bodyText}
            </p>
            <p className="text-base leading-[1.7] text-[#655343] max-w-[640px] font-medium">
              {bodyText}
            </p>
          </div>
        </section>

        {/* Lockup Anatomy */}
        <section className="mb-20">
          <div className={sectionLabel}>Lockup Anatomy</div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
            {/* Glyph */}
            <div>
              <div className="border border-[#E5CBB4] rounded-lg p-8 flex items-center justify-center min-h-[160px] mb-3">
                <LogoGlyph className="max-w-[60px] h-auto" />
              </div>
              <div className="text-sm font-medium text-[#2F2823] mb-2">Inverted Pyramid Glyph</div>
              <p className="text-sm font-light leading-[1.7] text-[#655343]">
                Two interlocking inverted pyramids — Quartzite Sand and Canyon Wall — within a Lignite Mines circle. The convergence of hardware and currency.
              </p>
            </div>

            {/* Wordmark */}
            <div>
              <div className="border border-[#E5CBB4] rounded-lg p-8 flex items-center justify-center min-h-[160px] mb-3">
                <WordmarkSvg className="max-w-[80%] h-auto" />
              </div>
              <div className="text-sm font-medium text-[#2F2823] mb-2">Wordmark</div>
              <p className="text-sm font-light leading-[1.7] text-[#655343]">
                Set in a custom serif with classical proportions. The period anchors the separation between the currency (USD) and the intelligence layer (AI).
              </p>
            </div>

            {/* Full Lockup */}
            <div>
              <div className="border border-[#E5CBB4] rounded-lg p-8 flex items-center justify-center min-h-[160px] mb-3">
                <FullLockupLight className="max-w-[80%] h-auto" />
              </div>
              <div className="text-sm font-medium text-[#2F2823] mb-2">Full Lockup</div>
              <p className="text-sm font-light leading-[1.7] text-[#655343]">
                Glyph and wordmark combined. The full lockup is a visual summary — a new kind of dollar, built on real intelligence, backed by real machines.
              </p>
            </div>
          </div>

          {/* Summary */}
          <div className="border-t border-[#f0ebe6] pt-8">
            <p className="font-eiko text-xl font-light leading-[1.6] text-[#2F2823] max-w-[720px]">
              Combined with the wordmark and its color bifurcation, the full lockup becomes a visual summary of what we stand for. A new kind of dollar. Built on real intelligence. Backed by real machines and open to those building the future.
            </p>
          </div>
        </section>
      </div>

      {/* Toast */}
      <div
        className={`fixed bottom-[30px] left-1/2 -translate-x-1/2 bg-[#2F2823] text-[#F7F3EE] px-6 py-2.5 rounded-lg text-[13px] font-medium z-[100] transition-all duration-300 pointer-events-none ${
          toast ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
        }`}
      >
        {toast ?? "Copied!"}
      </div>
    </div>
  );
}
