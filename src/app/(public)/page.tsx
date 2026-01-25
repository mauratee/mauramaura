"use client";

import Link from "next/link";
import Image from "next/image";

// Grid items with actual images from /public/images/
const gridItems = [
  {
    id: 1,
    title: "ITEM NAME",
    price: "PRICE",
    href: "/shop/item-1",
    aspect: "tall",
    showLabel: true,
    image: "/images/img_0410-ed.jpg",
  },
  {
    id: 2,
    title: "ITEM NAME",
    price: "PRICE",
    href: "/shop/item-2",
    aspect: "standard",
    showLabel: true,
    image: "/images/P_20240226_154917.jpeg",
  },
  {
    id: 3,
    title: null,
    price: null,
    href: "/work/item-3",
    aspect: "standard",
    showLabel: false,
    image: "/images/P_20240407_142229.jpg",
  },
  {
    id: 4,
    title: "ITEM NAME",
    price: "PRICE",
    href: "/shop/item-4",
    aspect: "standard",
    showLabel: true,
    image: "/images/Screenshot_2026-01-24.png",
  },
  {
    id: 5,
    title: null,
    price: null,
    href: "/work/item-5",
    aspect: "tall",
    showLabel: false,
    image: "/images/P_20230906_103916.jpg",
  },
  {
    id: 6,
    title: null,
    price: null,
    href: "/work/item-6",
    aspect: "standard",
    showLabel: false,
    image: "/images/P_20260104_160826.jpg",
  },
  {
    id: 7,
    title: null,
    price: null,
    href: "/work/item-7",
    aspect: "standard",
    showLabel: false,
    image: "/images/P_20260107_092430_1.jpg",
  },
  {
    id: 8,
    title: null,
    price: null,
    href: "/work/item-8",
    aspect: "wide",
    showLabel: false,
    image: "/images/P_20240226_154917.jpeg",
  },
];

function DescriptionBar() {
  return (
    <div className="border-b border-text-secondary overflow-hidden">
      <div className="px-2 lg:px-4 py-3">
        <div className="flex text-xs text-center justify-center">
          <div className="w-full lg:w-1/2">
            <p className="text-text-primary">
              <span className="opacity-60" aria-hidden="true">
                ࿔‧ ֶָ֢˚˖𐦍˖˚ֶָ֢ ‧࿔
              </span>
              <span className="mx-3">images and objects curated for you</span>
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
  const gridClasses = {
    tall: "row-span-2",
    standard: "row-span-1",
    wide: "col-span-2 row-span-1",
  };

  return (
    <Link
      href={item.href}
      className={`group flex flex-col ${gridClasses[item.aspect as keyof typeof gridClasses] || ""}`}
    >
      {/* Image container */}
      <div className="relative flex-1 overflow-hidden bg-stone-100">
        <Image
          src={item.image}
          alt={item.title || "Gallery image"}
          fill
          className="object-cover transition-transform duration-200 group-hover:scale-[1.02]"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
      </div>

      {/* Label - positioned below image per wireframe */}
      {item.showLabel && item.title && (
        <div className="pt-2 pb-1">
          <p className="text-sm font-medium text-text-primary tracking-wide">
            {item.title}
          </p>
          {item.price && (
            <p className="text-sm text-text-secondary">{item.price}</p>
          )}
        </div>
      )}
    </Link>
  );
}

function MasonryGrid() {
  return (
    <div className="p-4 md:p-6 lg:p-8">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-3 lg:gap-4 auto-rows-[200px] md:auto-rows-[250px]">
        {gridItems.map((item) => (
          <GridItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      <DescriptionBar />
      <MasonryGrid />
    </>
  );
}
