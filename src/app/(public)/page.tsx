"use client";

import Link from "next/link";

// Placeholder colors for visual variety (until real images are added)
const placeholderColors = [
  "bg-stone-200",
  "bg-slate-200",
  "bg-zinc-300",
  "bg-neutral-200",
  "bg-stone-300",
  "bg-slate-300",
];

// Placeholder data - will be replaced with database content
const gridItems = [
  {
    id: 1,
    title: "ITEM NAME",
    price: "PRICE",
    href: "/shop/item-1",
    aspect: "tall",
    showLabel: true,
    colorIndex: 0,
  },
  {
    id: 2,
    title: "ITEM NAME",
    price: "PRICE",
    href: "/shop/item-2",
    aspect: "standard",
    showLabel: true,
    colorIndex: 1,
  },
  {
    id: 3,
    title: null,
    price: null,
    href: "/work/item-3",
    aspect: "standard",
    showLabel: false,
    colorIndex: 2,
  },
  {
    id: 4,
    title: "ITEM NAME",
    price: "PRICE",
    href: "/shop/item-4",
    aspect: "standard",
    showLabel: true,
    colorIndex: 3,
  },
  {
    id: 5,
    title: null,
    price: null,
    href: "/work/item-5",
    aspect: "tall",
    showLabel: false,
    colorIndex: 4,
  },
  {
    id: 6,
    title: null,
    price: null,
    href: "/work/item-6",
    aspect: "standard",
    showLabel: false,
    colorIndex: 1,
  },
  {
    id: 7,
    title: null,
    price: null,
    href: "/work/item-7",
    aspect: "standard",
    showLabel: false,
    colorIndex: 5,
  },
  {
    id: 8,
    title: null,
    price: null,
    href: "/work/item-8",
    aspect: "wide",
    showLabel: false,
    colorIndex: 2,
  },
];

function DescriptionBar() {
  return (
    <div className="py-4 md:py-6 border-b border-border">
      <div className="flex items-center justify-center gap-4 px-6 text-text-secondary">
        {/* Left decorative glyph */}
        <span
          className="hidden sm:inline text-sm md:text-base opacity-60 whitespace-nowrap"
          aria-hidden="true"
        >
          ࿔‧ ֶָ֢˚˖𐦍˖˚ֶָ֢ ‧࿔
        </span>

        {/* Description text */}
        <span className="text-sm md:text-base text-center">
          images and objects curated for you
        </span>

        {/* Right decorative glyph */}
        <span
          className="hidden sm:inline text-sm md:text-base opacity-60 whitespace-nowrap"
          aria-hidden="true"
        >
          ࿔‧ ֶָ֢˚˖𐦍˖˚ֶָ֢ ‧࿔
        </span>
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

  const colorClass = placeholderColors[item.colorIndex] || placeholderColors[0];

  return (
    <Link
      href={item.href}
      className={`group flex flex-col ${gridClasses[item.aspect as keyof typeof gridClasses] || ""}`}
    >
      {/* Image container */}
      <div
        className={`relative flex-1 ${colorClass} overflow-hidden transition-transform duration-200 group-hover:scale-[1.02]`}
      >
        {/* Placeholder - will be replaced with actual images */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="material-symbols-outlined text-4xl text-black/10">
            image
          </span>
        </div>
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
