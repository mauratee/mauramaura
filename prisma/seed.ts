import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seed...");

  // Clear existing data (in reverse order of dependencies)
  console.log("Clearing existing data...");
  await prisma.order.deleteMany();
  await prisma.inquiry.deleteMany();
  await prisma.product.deleteMany();
  await prisma.artwork.deleteMany();
  await prisma.category.deleteMany();
  await prisma.shippingZone.deleteMany();
  await prisma.adminUser.deleteMany();
  await prisma.siteConfig.deleteMany();

  // ==========================================================================
  // ADMIN USER
  // ==========================================================================
  console.log("Creating admin user...");
  const passwordHash = await bcrypt.hash("admin123", 10);
  const adminUser = await prisma.adminUser.create({
    data: {
      email: "admin@mauramaura.com",
      passwordHash,
      name: "Admin",
    },
  });
  console.log(`  Created admin: ${adminUser.email}`);

  // ==========================================================================
  // CATEGORIES
  // ==========================================================================
  console.log("Creating categories...");
  const categories = await Promise.all([
    prisma.category.create({
      data: {
        name: "Illustration",
        slug: "illustration",
        description: "Digital and traditional illustration work",
        displayOrder: 1,
      },
    }),
    prisma.category.create({
      data: {
        name: "Fine Art",
        slug: "fine-art",
        description: "Original paintings and drawings",
        displayOrder: 2,
      },
    }),
    prisma.category.create({
      data: {
        name: "Prints",
        slug: "prints",
        description: "High-quality art prints",
        displayOrder: 3,
      },
    }),
    prisma.category.create({
      data: {
        name: "Merchandise",
        slug: "merchandise",
        description: "Apparel, stickers, and other goods",
        displayOrder: 4,
      },
    }),
  ]);
  console.log(`  Created ${categories.length} categories`);

  const [illustrationCat, fineArtCat, printsCat, merchCat] = categories;

  // ==========================================================================
  // ARTWORKS
  // ==========================================================================
  console.log("Creating artworks...");
  const artworks = await Promise.all([
    prisma.artwork.create({
      data: {
        title: "Mountain Dawn",
        slug: "mountain-dawn",
        description:
          "Inspired by early morning hikes in the Pacific Northwest. The soft light filtering through the mist creates a dreamlike atmosphere.",
        categoryId: illustrationCat.id,
        medium: "Digital illustration",
        dimensions: "18 × 24 inches",
        year: 2025,
        images: JSON.stringify([
          "https://placehold.co/1200x1600/e7e5e4/1c1917?text=Mountain+Dawn",
        ]),
        featured: true,
        displayOrder: 1,
      },
    }),
    prisma.artwork.create({
      data: {
        title: "Coastal Solitude",
        slug: "coastal-solitude",
        description:
          "A quiet moment by the sea. This piece explores themes of introspection and the healing power of nature.",
        categoryId: illustrationCat.id,
        medium: "Digital illustration",
        dimensions: "16 × 20 inches",
        year: 2025,
        images: JSON.stringify([
          "https://placehold.co/1200x1500/e7e5e4/1c1917?text=Coastal+Solitude",
        ]),
        featured: true,
        displayOrder: 2,
      },
    }),
    prisma.artwork.create({
      data: {
        title: "Urban Garden",
        slug: "urban-garden",
        description:
          "Finding pockets of green in the concrete jungle. A celebration of urban nature.",
        categoryId: illustrationCat.id,
        medium: "Digital illustration",
        dimensions: "12 × 16 inches",
        year: 2024,
        images: JSON.stringify([
          "https://placehold.co/1200x1600/e7e5e4/1c1917?text=Urban+Garden",
        ]),
        featured: false,
        displayOrder: 3,
      },
    }),
    prisma.artwork.create({
      data: {
        title: "Abstract Emotions I",
        slug: "abstract-emotions-i",
        description:
          "Part of an ongoing series exploring color and emotion through abstract forms.",
        categoryId: fineArtCat.id,
        medium: "Oil on canvas",
        dimensions: "24 × 30 inches",
        year: 2024,
        images: JSON.stringify([
          "https://placehold.co/1200x1500/e7e5e4/1c1917?text=Abstract+Emotions+I",
        ]),
        featured: true,
        displayOrder: 1,
      },
    }),
    prisma.artwork.create({
      data: {
        title: "Night Blooms",
        slug: "night-blooms",
        description:
          "Flowers that only reveal their beauty under moonlight. A study in contrast and mystery.",
        categoryId: fineArtCat.id,
        medium: "Watercolor on paper",
        dimensions: "11 × 14 inches",
        year: 2025,
        images: JSON.stringify([
          "https://placehold.co/1100x1400/e7e5e4/1c1917?text=Night+Blooms",
        ]),
        featured: false,
        displayOrder: 2,
      },
    }),
    prisma.artwork.create({
      data: {
        title: "Winter Light",
        slug: "winter-light",
        description:
          "The soft glow of winter afternoons. Capturing the unique quality of light during the coldest months.",
        categoryId: illustrationCat.id,
        medium: "Digital illustration",
        dimensions: "20 × 20 inches",
        year: 2024,
        images: JSON.stringify([
          "https://placehold.co/1200x1200/e7e5e4/1c1917?text=Winter+Light",
        ]),
        featured: false,
        displayOrder: 4,
      },
    }),
  ]);
  console.log(`  Created ${artworks.length} artworks`);

  // ==========================================================================
  // PRODUCTS
  // ==========================================================================
  console.log("Creating products...");
  const products = await Promise.all([
    prisma.product.create({
      data: {
        title: "Mountain Dawn Print 8×10",
        slug: "mountain-dawn-print-8x10",
        description:
          "Archival giclée print on Hahnemühle Photo Rag 308gsm. Signed and numbered limited edition.",
        artworkId: artworks[0].id,
        categoryId: printsCat.id,
        price: 45.0,
        inventoryCount: 25,
        sku: "MD-PRINT-8X10",
        images: JSON.stringify([
          "https://placehold.co/800x1000/e7e5e4/1c1917?text=Mountain+Dawn+8x10",
        ]),
        weightOz: 4.5,
        active: true,
        featured: true,
      },
    }),
    prisma.product.create({
      data: {
        title: "Mountain Dawn Print 16×20",
        slug: "mountain-dawn-print-16x20",
        description:
          "Large format archival giclée print on Hahnemühle Photo Rag 308gsm. Signed and numbered limited edition.",
        artworkId: artworks[0].id,
        categoryId: printsCat.id,
        price: 95.0,
        compareAtPrice: 120.0,
        inventoryCount: 15,
        sku: "MD-PRINT-16X20",
        images: JSON.stringify([
          "https://placehold.co/1600x2000/e7e5e4/1c1917?text=Mountain+Dawn+16x20",
        ]),
        weightOz: 8.0,
        active: true,
        featured: true,
      },
    }),
    prisma.product.create({
      data: {
        title: "Coastal Solitude Print 11×14",
        slug: "coastal-solitude-print-11x14",
        description:
          "Archival giclée print on Hahnemühle Photo Rag 308gsm. Signed and numbered limited edition.",
        artworkId: artworks[1].id,
        categoryId: printsCat.id,
        price: 55.0,
        inventoryCount: 20,
        sku: "CS-PRINT-11X14",
        images: JSON.stringify([
          "https://placehold.co/1100x1400/e7e5e4/1c1917?text=Coastal+Solitude+11x14",
        ]),
        weightOz: 5.0,
        active: true,
        featured: false,
      },
    }),
    prisma.product.create({
      data: {
        title: "Abstract Emotions I - Original",
        slug: "abstract-emotions-i-original",
        description:
          "Original oil painting on stretched canvas. Includes certificate of authenticity. Framing not included.",
        artworkId: artworks[3].id,
        categoryId: fineArtCat.id,
        price: 850.0,
        inventoryCount: 1,
        sku: "AE1-ORIG",
        images: JSON.stringify([
          "https://placehold.co/1200x1500/e7e5e4/1c1917?text=Abstract+Emotions+Original",
        ]),
        weightOz: 48.0,
        active: true,
        featured: true,
      },
    }),
    prisma.product.create({
      data: {
        title: "Artist Sticker Pack",
        slug: "artist-sticker-pack",
        description:
          "Set of 6 vinyl stickers featuring mini versions of popular artworks. Waterproof and UV resistant.",
        categoryId: merchCat.id,
        price: 12.0,
        inventoryCount: 100,
        sku: "STICKER-PACK-6",
        images: JSON.stringify([
          "https://placehold.co/800x800/e7e5e4/1c1917?text=Sticker+Pack",
        ]),
        weightOz: 1.0,
        active: true,
        featured: false,
      },
    }),
    prisma.product.create({
      data: {
        title: "Mountain Dawn Tote Bag",
        slug: "mountain-dawn-tote-bag",
        description:
          "Organic cotton tote bag featuring the Mountain Dawn design. 15×16 inches with 22 inch handles.",
        artworkId: artworks[0].id,
        categoryId: merchCat.id,
        price: 28.0,
        inventoryCount: 50,
        sku: "MD-TOTE",
        images: JSON.stringify([
          "https://placehold.co/800x800/e7e5e4/1c1917?text=Tote+Bag",
        ]),
        weightOz: 6.0,
        active: true,
        featured: false,
      },
    }),
  ]);
  console.log(`  Created ${products.length} products`);

  // ==========================================================================
  // SHIPPING ZONES
  // ==========================================================================
  console.log("Creating shipping zones...");
  const shippingZones = await Promise.all([
    prisma.shippingZone.create({
      data: {
        name: "Domestic (US)",
        countries: JSON.stringify(["US"]),
        baseRate: 8.0,
        perItemRate: 2.0,
        freeThreshold: 100.0,
        estimatedDays: "3-5 business days",
        active: true,
      },
    }),
    prisma.shippingZone.create({
      data: {
        name: "Canada",
        countries: JSON.stringify(["CA"]),
        baseRate: 15.0,
        perItemRate: 4.0,
        freeThreshold: 150.0,
        estimatedDays: "7-10 business days",
        active: true,
      },
    }),
    prisma.shippingZone.create({
      data: {
        name: "International",
        countries: JSON.stringify(["*"]),
        baseRate: 25.0,
        perItemRate: 5.0,
        freeThreshold: null,
        estimatedDays: "14-21 business days",
        active: true,
      },
    }),
  ]);
  console.log(`  Created ${shippingZones.length} shipping zones`);

  // ==========================================================================
  // SITE CONFIG
  // ==========================================================================
  console.log("Creating site config...");
  const siteConfigs = await Promise.all([
    prisma.siteConfig.create({
      data: {
        key: "site_title",
        value: "maura maura studio",
      },
    }),
    prisma.siteConfig.create({
      data: {
        key: "site_description",
        value:
          "Original artwork, prints, and merchandise by Maura. Inspired by nature, emotion, and the quiet moments in between.",
      },
    }),
    prisma.siteConfig.create({
      data: {
        key: "contact_email",
        value: "hello@mauramaura.com",
      },
    }),
    prisma.siteConfig.create({
      data: {
        key: "about_text",
        value:
          "I'm Maura, a visual artist based in the Pacific Northwest. My work explores the intersection of nature and emotion, using both digital and traditional mediums to capture fleeting moments of beauty and introspection.\n\nWhen I'm not in the studio, you can find me hiking forest trails, tending to my houseplants, or hunting for vintage treasures at local markets.",
      },
    }),
    prisma.siteConfig.create({
      data: {
        key: "social_instagram",
        value: "https://instagram.com/mauramaura",
      },
    }),
    prisma.siteConfig.create({
      data: {
        key: "social_twitter",
        value: "https://twitter.com/mauramaura",
      },
    }),
  ]);
  console.log(`  Created ${siteConfigs.length} site config entries`);

  console.log("\n✅ Database seeded successfully!");
  console.log(`
Summary:
  - 1 admin user (admin@mauramaura.com / admin123)
  - ${categories.length} categories
  - ${artworks.length} artworks
  - ${products.length} products
  - ${shippingZones.length} shipping zones
  - ${siteConfigs.length} site config entries
`);
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
