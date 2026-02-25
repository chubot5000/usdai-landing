import { formatDate } from "@/lib/strapi/fetchers";
import { PostDetail } from "@/lib/strapi/types";
import Image from "next/image";
import Link from "next/link";
import type { JSX } from "react";
import MobileNav from "../MobileNav";
import Navigation from "../Navigation";
import Tag from "./Tag";

// Strapi block content types
interface TextChild {
  type: "text";
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  code?: boolean;
}

interface LinkChild {
  type: "link";
  url: string;
  children: TextChild[];
}

type InlineChild = TextChild | LinkChild;

interface ListItemChild {
  children: InlineChild[];
}

interface ParagraphBlock {
  type: "paragraph";
  children: InlineChild[];
}

interface HeadingBlock {
  type: "heading";
  level: 1 | 2 | 3 | 4 | 5 | 6;
  children: InlineChild[];
}

interface ListBlock {
  type: "list";
  format: "ordered" | "unordered";
  children: ListItemChild[];
}

interface QuoteBlock {
  type: "quote";
  children: InlineChild[];
}

interface ImageBlock {
  type: "image";
  image?: {
    url: string;
    alternativeText?: string;
    caption?: string;
  };
}

type ContentBlock =
  | ParagraphBlock
  | HeadingBlock
  | ListBlock
  | QuoteBlock
  | ImageBlock;

interface PostContentProps {
  post: PostDetail;
}

export default function PostContent({ post }: PostContentProps) {
  const imageUrl = post.cover || "/images/placeholder-blog.jpg";

  return (
    <>
      {/* Hero Section with Navigation */}
      <section className="relative w-full bg-[--color-cream] pt-[10px]">
        <div className="relative max-w-[1440px] mx-auto px-4 sm:px-8 md:px-[60px] lg:px-[100px] pb-4">
          {/* Navigation */}
          <div className="hidden md:block">
            <Navigation variant="dark" activePage="insights" />
          </div>
          <div className="md:hidden">
            <MobileNav activePage="insights" variant="dark" />
          </div>
        </div>
      </section>

      {/* Article Content */}
      <article className="w-full bg-[--color-cream] pb-[80px] md:pb-[120px]">
        <div className="max-w-[728px] mx-auto px-4 sm:px-6">
          {/* Back Link */}
          <div className="pt-[20px] md:pt-[40px] mb-[40px]">
            <Link
              href="/insights"
              className="inline-flex items-center text-[14px] text-[--color-secondary] hover:text-[--color-primary] transition-colors"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to Insights
            </Link>
          </div>

          {/* Article Header */}
          <header className="mb-[40px] md:mb-[60px]">
            {/* Tags */}
            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag) => (
                  <Tag key={tag} label={tag} />
                ))}
              </div>
            )}

            {/* Title */}
            <h1 className="font-eiko text-[32px] md:text-[42px] lg:text-[52px] text-[--color-dark] leading-[1.1] mb-4">
              {post.title}
            </h1>

            {/* Description */}
            <p className="text-[18px] md:text-[20px] text-[--color-secondary] leading-[1.5] mb-6">
              {post.description}
            </p>

            {/* Date */}
            <p className="text-[14px] text-[--color-outline-major]">
              {formatDate(post.createdAt)}
            </p>
          </header>

          {/* Featured Image */}
          <div className="relative w-full aspect-[16/9] rounded-[10px] overflow-hidden mb-[40px] md:mb-[60px] border border-outline-minor">
            <Image
              src={imageUrl}
              alt={post.title}
              fill
              className="object-cover"
              priority
              placeholder={post.blurDataURL ? "blur" : "empty"}
              blurDataURL={post.blurDataURL}
            />
          </div>

          {/* Article Body */}
          <div className="prose prose-lg prose-brown">
            <PostBody body={post.body} />
          </div>
        </div>
      </article>
    </>
  );
}

// Render Strapi blocks content
function PostBody({ body }: { body: unknown }) {
  if (!body || !Array.isArray(body)) {
    return null;
  }

  return (
    <div className="space-y-6">
      {(body as ContentBlock[]).map((block, index) => {
        switch (block.type) {
          case "paragraph":
            return (
              <p
                key={index}
                className="text-[16px] md:text-[18px] text-[--color-dark] leading-[1.7]"
              >
                {renderChildren(block.children)}
              </p>
            );
          case "heading":
            const HeadingTag = `h${block.level}` as keyof JSX.IntrinsicElements;
            const headingSizes: Record<number, string> = {
              1: "text-[32px] md:text-[40px]",
              2: "text-[28px] md:text-[32px]",
              3: "text-[24px] md:text-[28px]",
              4: "text-[20px] md:text-[24px]",
              5: "text-[18px] md:text-[20px]",
              6: "text-[16px] md:text-[18px]",
            };
            return (
              <HeadingTag
                key={index}
                className={`font-eiko ${headingSizes[block.level] || headingSizes[2]} text-[--color-dark] leading-[1.2] mt-8 mb-4`}
              >
                {renderChildren(block.children)}
              </HeadingTag>
            );
          case "list":
            const ListTag = block.format === "ordered" ? "ol" : "ul";
            return (
              <ListTag
                key={index}
                className={`${
                  block.format === "ordered" ? "list-decimal" : "list-disc"
                } pl-6 space-y-2 text-[16px] md:text-[18px] text-[--color-dark]`}
              >
                {(block as ListBlock).children.map((item, itemIndex) => (
                  <li key={itemIndex}>{renderChildren(item.children)}</li>
                ))}
              </ListTag>
            );
          case "quote":
            return (
              <blockquote
                key={index}
                className="border-l-4 border-[--color-primary] pl-6 italic text-[18px] md:text-[20px] text-[--color-secondary]"
              >
                {renderChildren(block.children)}
              </blockquote>
            );
          case "image":
            return (
              <figure key={index} className="my-8">
                <Image
                  src={block.image?.url || ""}
                  alt={block.image?.alternativeText || ""}
                  width={1400}
                  height={900}
                  sizes="(max-width: 768px) 100vw, 728px"
                  className="rounded-[8px]"
                  style={{ width: "100%", height: "auto" }}
                />
                {block.image?.caption && (
                  <figcaption className="text-[14px] text-[--color-secondary] text-center mt-3">
                    {block.image.caption}
                  </figcaption>
                )}
              </figure>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}

// Render inline children (text, bold, italic, links, etc.)
function renderChildren(children: InlineChild[]): React.ReactNode {
  if (!children) return null;

  return children.map((child, index) => {
    if (child.type === "text") {
      let content: React.ReactNode = child.text;

      if (child.bold) {
        content = <strong key={index}>{content}</strong>;
      }
      if (child.italic) {
        content = <em key={index}>{content}</em>;
      }
      if (child.underline) {
        content = <u key={index}>{content}</u>;
      }
      if (child.strikethrough) {
        content = <s key={index}>{content}</s>;
      }
      if (child.code) {
        content = (
          <code
            key={index}
            className="bg-[--color-feature-bg] px-1.5 py-0.5 rounded text-[14px]"
          >
            {content}
          </code>
        );
      }

      return <span key={index}>{content}</span>;
    }

    if (child.type === "link") {
      return (
        <a
          key={index}
          href={child.url}
          className="text-[--color-primary] underline hover:no-underline"
          target={child.url?.startsWith("http") ? "_blank" : undefined}
          rel={
            child.url?.startsWith("http") ? "noopener noreferrer" : undefined
          }
        >
          {renderChildren(child.children)}
        </a>
      );
    }

    return null;
  });
}
