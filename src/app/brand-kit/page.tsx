import { Metadata } from "next";
import Image from "next/image";
import Navigation from "@/components/Navigation";
import MobileNav from "@/components/MobileNav";
import Footer from "@/components/Footer";
import Tag from "@/components/ui/Tag";
import { generatePageMetadata } from "@/lib/utils/metadata";
import { PAGE_SEO } from "@/lib/config/seo";

/**
 * Generate metadata for Brand Kit page
 * Using noIndex as this is a utility page for partners/press
 */
export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata({
    title: PAGE_SEO.brandKit.title,
    description: PAGE_SEO.brandKit.description,
    keywords: PAGE_SEO.brandKit.keywords,
    path: "/brand-kit",
    noIndex: PAGE_SEO.brandKit.noIndex,
    type: "website",
  });
}

export default function BrandKitPage() {
  return (
    <>
      <main className="relative flex w-full flex-1 flex-col items-center text-black bg-[#F7F3EE] overflow-hidden pt-[10px]">
        <div className="absolute inset-0 bg-dotted opacity-30" />

        {/* Navigation */}
        <div className="relative max-w-[1440px] mx-auto px-4 sm:px-8 md:px-[60px] lg:px-[100px] w-full">
          <div className="hidden md:block">
            <Navigation variant="dark" />
          </div>
          <div className="md:hidden">
            <MobileNav variant="dark" />
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 w-full py-[60px] md:py-[100px]">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-8 md:px-[60px] lg:px-[100px]">
            {/* Two-column layout */}
            <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
              {/* Left column — ~30% */}
              <div className="lg:w-[30%] flex flex-col justify-between">
                <div>
                  <Tag className="mb-4">Assets</Tag>
                  <p className="text-[13px] text-[#A99482] tracking-widest uppercase mb-3">
                    Version 1.4
                  </p>
                  <h1 className="font-eiko text-[32px] md:text-[44px] text-[#1d1a19] leading-[1.15] mb-5">
                    USD.AI
                    <br />
                    Full Lockup
                  </h1>
                  <p className="text-[15px] md:text-[16px] text-[#79716b] leading-[1.65] mb-8">
                    The USD.AI lockup combines the Inverted Pyramid Glyph with
                    the USD.AI wordmark. Use it as the primary brand
                    representation across all partner integrations, press
                    materials, and protocol interfaces.
                  </p>

                  {/* Download Button */}
                  <a
                    href="/assets/designkit/usdailogos.zip"
                    download
                    className="inline-flex items-center justify-center px-8 py-3 bg-[#a99482] text-white text-[15px] rounded-[6px] hover:opacity-90 transition-opacity"
                  >
                    Download All Logos
                  </a>
                </div>

                <p className="hidden lg:block mt-12 text-[12px] text-[#A99482] tracking-wide uppercase">
                  USD.AI Brand &amp; Visual Identity Guide
                </p>
              </div>

              {/* Right column — ~70% */}
              <div className="lg:w-[70%]">
                <div className="border border-[#A99482] rounded-[10px] bg-dotted p-8 md:p-12">
                  {/* Full Lockup */}
                  <div className="flex items-center justify-center py-12 md:py-20">
                    <Image
                      src="/images/usdaiLightLogo.svg"
                      alt="USD.AI Full Lockup"
                      width={420}
                      height={140}
                      className="w-full h-auto max-w-[420px]"
                      priority
                    />
                  </div>

                  {/* Divider */}
                  <div className="border-t border-[#A99482]/40 my-8" />

                  {/* Sub-sections */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    {/* Glyph */}
                    <div>
                      <p className="text-[11px] text-[#A99482] tracking-widest uppercase mb-4">
                        USD.AI Inverted Pyramid Glyph
                      </p>
                      <div className="flex items-center justify-center rounded-[8px] border border-[#A99482]/30 bg-white/50 p-8 aspect-square">
                        <Image
                          src="/images/usdaiLightLogo.svg"
                          alt="USD.AI Inverted Pyramid Glyph"
                          width={120}
                          height={120}
                          className="w-auto h-[80px]"
                        />
                      </div>
                    </div>

                    {/* Wordmark */}
                    <div>
                      <p className="text-[11px] text-[#A99482] tracking-widest uppercase mb-4">
                        USD.AI Wordmark
                      </p>
                      <div className="flex items-center justify-center rounded-[8px] border border-[#A99482]/30 bg-white/50 p-8 aspect-square">
                        <Image
                          src="/images/usdaiLightLogo.svg"
                          alt="USD.AI Wordmark"
                          width={240}
                          height={60}
                          className="w-auto h-[40px]"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Dark variant card */}
                <div className="mt-6 border border-[#3f3f3f] rounded-[10px] bg-[#1d1d1d] p-8 md:p-12">
                  <p className="text-[11px] text-[#A99482] tracking-widest uppercase mb-6">
                    Dark Background Variant
                  </p>
                  <div className="flex items-center justify-center py-8 md:py-14">
                    <Image
                      src="/images/usdaiDarkLogo.svg"
                      alt="USD.AI Logo — dark background"
                      width={420}
                      height={140}
                      className="w-full h-auto max-w-[420px]"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile footer text */}
            <p className="lg:hidden mt-12 text-[12px] text-[#A99482] tracking-wide uppercase text-center">
              USD.AI Brand &amp; Visual Identity Guide
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
