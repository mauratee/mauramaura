"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

// Grid items with actual images from /public/images/
const gridItems = [
  {
    id: 1,
    title: null,
    price: null,
    href: "/work/item-1",
    image: "/images/P_20260104_160826.jpg",
  },
  {
    id: 3,
    title: null,
    price: null,
    href: "/work/item-3",
    image: "/images/P_20240407_142229.jpg",
  },
  {
    id: 4,
    title: null,
    price: null,
    href: "/shop/item-4",
    image: "/images/berkeley-pink.jpg",
  },
  {
    id: 5,
    title: null,
    price: null,
    href: "/work/item-5",
    image: "/images/P_20230906_103916.jpg",
  },
  {
    id: 7,
    title: null,
    price: null,
    href: "/work/item-7",
    image: "/images/P_20260107_092430_1.jpg",
  },
  {
    id: 8,
    title: null,
    price: null,
    href: "/work/item-8",
    image: "/images/oakland-lavender.jpg",
  },
  // Row 3
  {
    id: 9,
   title: null,
    price: null,
    href: "/shop/item-9",
    image: "/images/texas-vertebrae.jpg",
  },
  {
    id: 10,
    title: null,
    price: null,
    href: "/work/item-10",
    image: "/images/tile.jpg",
  },
  {
    id: 11,
    title: null,
    price: null,
    href: "/shop/item-11",
    image: "/images/dallas-airplane.jpg",
  },
  {
    id: 12,
    title: null,
    price: null,
    href: "/shop/item-12",
    image: "/images/broken-screens.jpg",
  },
  // Row 4
  {
    id: 13,
    title: null,
    price: null,
    href: "/work/item-13",
    image: "/images/mimosa-tree.jpg",
  },
  {
    id: 14,
    title: null,
    price: null,
    href: "/shop/item-14",
    image: "/images/river-styx.jpg",
  },
  {
    id: 15,
    title: null,
    price: null,
    href: "/shop/item-15",
    image: "/images/roses1.jpg",
  },
  {
    id: 16,
    title: null,
    price: null,
    href: "/work/item-16",
    image: "/images/saints-church.jpg",
  },
  // Row 5
  {
    id: 17,
    title: null,
    price: null,
    href: "/shop/item-17",
    image: "/images/texas-claw.jpg",
  },
  {
    id: 18,
    title: null,
    price: null,
    href: "/work/item-18",
    image: "/images/blood-of-jesus.jpg",
  },
  {
    id: 19,
    title: null,
    price: null,
    href: "/shop/item-19",
    image: "/images/greenwood-cem.jpg",
  },
  {
    id: 20,
    title: null,
    price: null,
    href: "/work/item-20",
    image: "/images/mimosa-close.jpg",
  },
  // Row 6
  {
    id: 21,
    title: null,
    price: null,
    href: "/shop/item-21",
    image: "/images/nj-twin-towers.jpg",
  },
  {
    id: 22,
    title: null,
    price: null,
    href: "/work/item-22",
    image: "/images/peekskill-swamp.jpg",
  },
  {
    id: 23,
    title: null,
    price: null,
    href: "/shop/item-23",
    image: "/images/subway1.jpg",
  },
  {
    id: 24,
    title: null,
    price: null,
    href: "/work/item-24",
    image: "/images/subway2.jpg",
  },
];

function DescriptionBar() {
  return (
    <div className="border-b-[1.25px] border-text-primary overflow-hidden">
      <div className="px-2 lg:px-4 py-3">
        <div className="flex text-xs text-center justify-center">
          <div className="w-full lg:w-1/2">
            <p className="text-text-primary">
              <span className="opacity-60" aria-hidden="true">
                ࿔‧ ֶָ֢˚˖𐦍˖˚ֶָ֢ ‧࿔
              </span>
              {/* <span className="mx-3">images and objects curated for you</span> */}
              <span className="opacity-60" aria-hidden="true">
                ࿔‧ ֶָ֢˚˖𐦍˖˚ֶָ֢ ‧࿔
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function GridItem({ item }: { item: (typeof gridItems)[0] }) {
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

function ProductGrid() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 border-l-[1.25px] border-text-primary">
      {gridItems.map((item) => (
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
