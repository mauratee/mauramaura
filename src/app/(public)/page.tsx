"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { gridItems, type GridItem as GridItemType } from "./gridItems.generated";
import { DECORATIVE_ACCENTS, shuffleArray } from "@/lib/decorativeAccents";

const DEFAULT_ORNAMENT = "࿔‧ ֶָ֢˚˖𐦍˖˚ֶָ֢ ‧࿔";
// Repeated enough times to overflow at any viewport width; the container
// clips it to ~85vw so it always fills that width regardless of screen size.
const REPEAT_COUNT = 100;

function buildOrnamentRow(glyphs: string[]): string {
  return Array.from({ length: REPEAT_COUNT }, () => glyphs[Math.floor(Math.random() * glyphs.length)]).join(" ");
}

function DescriptionBar() {
  // Server-rendered default (matches the static export's prerendered HTML),
  // then after mount pick 3 random glyphs from the decorative pool and
  // repeat them in a random mix so each page load looks different.
  const [ornamentRow, setOrnamentRow] = useState(() => Array(REPEAT_COUNT).fill(DEFAULT_ORNAMENT).join(" "));

  useEffect(() => {
    const glyphs = shuffleArray(DECORATIVE_ACCENTS).slice(0, 3);
    setOrnamentRow(buildOrnamentRow(glyphs));
  }, []);

  return (
    <div className="border-b-[1.25px] border-text-primary overflow-hidden">
      <div className="px-2 lg:px-4 py-3">
        <div className="flex justify-center">
          <p
            className="w-[85vw] overflow-hidden whitespace-nowrap text-center text-xs text-text-primary opacity-60"
            aria-hidden="true"
          >
            {ornamentRow}
          </p>
        </div>
      </div>
    </div>
  );
}

function GridItem({ item }: { item: GridItemType }) {
  // Track image aspect ratio to position border at actual image edge
  const [imageBottom, setImageBottom] = useState<number | null>(null);
  const containerAspect = 9 / 16; // aspect-[9/16]

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    const imageAspect = img.naturalWidth / img.naturalHeight;

    // If image is wider than container aspect, it's constrained by width
    // and won't fill the full height
    if (imageAspect > containerAspect) {
      const heightPercent = (containerAspect / imageAspect) * 100;
      setImageBottom(100 - heightPercent);
    } else {
      // Image fills full height
      setImageBottom(0);
    }
  };

  return (
    <Link href={item.href} className="group flex flex-col border-r-[1.25px] border-b-[1.25px] border-text-primary">
      {/* Image container - 9:16 height, images fit naturally */}
      <div className="relative aspect-[9/16] overflow-hidden bg-background">
        <Image
          src={item.image}
          alt={item.title || "Gallery image"}
          fill
          className="object-contain object-top"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          onLoad={handleImageLoad}
        />
        {/* Label - positioned at actual image edge, extends to bottom */}
        {item.title && imageBottom !== null && (
          <div
            className="absolute left-0 right-0 bottom-0 border-t-[1.25px] border-text-primary bg-background px-3 py-2"
            style={{ top: `${100 - imageBottom}%` }}
          >
            <p className="text-sm font-medium text-text-primary tracking-wide">
              {item.title}
            </p>
            {item.price && (
              <p className="text-sm text-text-secondary">{item.price}</p>
            )}
          </div>
        )}
        {/* Border line at image edge for items without title */}
        {!item.title && imageBottom !== null && (
          <div
            className="absolute left-0 right-0 bottom-0 border-t-[1.25px] border-text-primary bg-background"
            style={{ top: `${100 - imageBottom}%` }}
          />
        )}
      </div>
    </Link>
  );
}

function shuffle<T>(items: T[]): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function ProductGrid() {
  // Start with the fixed order so it matches the static export's prerendered
  // HTML, then shuffle after mount so each page load gets a new order.
  const [items, setItems] = useState(gridItems);

  useEffect(() => {
    setItems(shuffle(gridItems));
  }, []);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 border-l-[1.25px] border-text-primary">
      {items.map((item) => (
        <GridItem key={item.id} item={item} />
      ))}
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      <DescriptionBar />
      <ProductGrid />
    </>
  );
}
