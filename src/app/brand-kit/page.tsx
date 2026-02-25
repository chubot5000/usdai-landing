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
      <main className="relative flex w-full flex-1 flex-col items-center text-black bg-[--color-cream] overflow-hidden pt-[10px]">
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
            {/* Header */}
            <div className="text-center mb-[40px] md:mb-[60px]">
              <Tag className="mb-4">Assets</Tag>
              <h1 className="font-eiko text-[32px] md:text-[48px] text-[#1d1a19] leading-[1.2] mb-4">
                Brand Kit
              </h1>
              <p className="text-[16px] md:text-[18px] text-[#79716b] max-w-[600px] mx-auto mb-8">
                Download our brand assets. Please use dark and light versions
                according to the background.
              </p>

              {/* Download Button */}
              <a
                href="/assets/designkit/usdailogos.zip"
                download
                className="inline-flex items-center justify-center px-8 py-3 bg-[#a99482] text-white text-[16px] rounded-[6px] hover:opacity-90 transition-opacity"
              >
                Download All Logos
              </a>
            </div>

            {/* Logo Previews */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[1000px] mx-auto">
              {/* Dark Logo on Dark Background */}
              <div className="aspect-video rounded-[10px] border border-[#3f3f3f] bg-[#1d1d1d] flex items-center justify-center p-8 overflow-hidden">
                <Image
                  src="/images/usdaiDarkLogo.svg"
                  alt="USD.AI Logo (Dark version)"
                  width={300}
                  height={100}
                  className="w-full h-auto max-w-[280px]"
                />
              </div>

              {/* Light Logo on Light Background */}
              <div className="aspect-video rounded-[10px] border border-[#d6d3d1] bg-white flex items-center justify-center p-8 overflow-hidden">
                <Image
                  src="/images/usdaiLightLogo.svg"
                  alt="USD.AI Logo (Light version)"
                  width={300}
                  height={100}
                  className="w-full h-auto max-w-[280px]"
                />
              </div>
            </div>

            {/* Usage Guidelines */}
            <div className="mt-[60px] md:mt-[80px] max-w-[800px] mx-auto">
              <h2 className="font-eiko text-[24px] md:text-[32px] text-[#1d1a19] text-center mb-6">
                Usage Guidelines
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-6 rounded-[10px] border border-[#d6d3d1] bg-white">
                  <div className="w-8 h-8 rounded-full bg-[#1d1d1d] mb-4" />
                  <h3 className="text-[16px] font-medium text-[#1d1a19] mb-2">
                    Dark Backgrounds
                  </h3>
                  <p className="text-[14px] text-[#79716b] leading-[1.5]">
                    Use the light/white version of the logo on dark backgrounds
                    for optimal contrast.
                  </p>
                </div>
                <div className="p-6 rounded-[10px] border border-[#d6d3d1] bg-white">
                  <div className="w-8 h-8 rounded-full bg-white border border-[#d6d3d1] mb-4" />
                  <h3 className="text-[16px] font-medium text-[#1d1a19] mb-2">
                    Light Backgrounds
                  </h3>
                  <p className="text-[14px] text-[#79716b] leading-[1.5]">
                    Use the dark version of the logo on light or white
                    backgrounds for optimal visibility.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
