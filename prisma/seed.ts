import "dotenv/config";
import { PrismaLibSql } from "@prisma/adapter-libsql";
import { PrismaClient } from "../src/generated/prisma/client";
import bcrypt from "bcryptjs";
import { BASE_MENU_ITEMS } from "../src/lib/constants";

const adapter = new PrismaLibSql({
  url: process.env.DATABASE_URL ?? "file:./dev.db",
});
const prisma = new PrismaClient({ adapter });

const stores = [
  {
    name: "Main Branch — Gate 777, Banilad",
    address: "Gate 777, across Cebu Country Club, Banilad Road, Apas, Cebu City",
    phone: "(032) 268-0327",
    hours: "Daily: 8:00 AM – 6:00 PM",
    mapEmbedUrl:
      "https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=Ayer's+Lechon,Banilad+Cebu+City&zoom=16",
    mapLink: "https://maps.app.goo.gl/1WBaAPTnxvsRk8Eq8",
    sortOrder: 1,
  },
  {
    name: "IT Park Branch — Asiatown, Lahug",
    address: "2nd Floor, i2 Building, Asia Town, IT Park, Lahug, Cebu City",
    phone: "(032) 231-7615",
    hours: "Open 24/7",
    mapEmbedUrl:
      "https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=Ayer's+Lechon+IT+Park,Cebu+City&zoom=16",
    mapLink: "https://maps.google.com/?q=Ayer's+Lechon+IT+Park+Cebu+City",
    sortOrder: 2,
  },
  {
    name: "SM City Cebu Branch",
    address: "3rd Level, SM Trade Mall, SM City Cebu, North Reclamation Area, Cebu City",
    phone: "0927-440-6891",
    hours: "Daily: 10:00 AM – 9:00 PM",
    mapEmbedUrl:
      "https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=SM+City+Cebu,Cebu+City&zoom=15",
    mapLink: "https://maps.google.com/?q=SM+City+Cebu",
    sortOrder: 3,
  },
  {
    name: "Mango Square Branch",
    address: "Mango Square, General Maxilom Avenue, Cebu City, 6000",
    phone: "0927-440-6891",
    hours: "Daily: 9:00 AM – 8:00 PM",
    mapEmbedUrl:
      "https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=Mango+Square,General+Maxilom+Avenue,Cebu+City&zoom=16",
    mapLink: "https://maps.google.com/?q=Mango+Square+Cebu+City",
    sortOrder: 4,
  },
  {
    name: "Elizabeth Mall (e-Mall) Branch",
    address: "Ground Floor, Elizabeth Mall, Leon Kilat Street, Sambag I, Cebu City",
    phone: "0927-440-6891",
    hours: "Daily: 9:00 AM – 8:00 PM",
    mapEmbedUrl:
      "https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=Elizabeth+Mall,Cebu+City&zoom=16",
    mapLink: "https://maps.google.com/?q=Elizabeth+Mall+Cebu+City",
    sortOrder: 5,
  },
  {
    name: "Gaisano South — Colon Branch",
    address: "Gaisano South, Colon Street, Cebu City",
    phone: "0949-503-2206",
    hours: "Daily: 9:00 AM – 8:00 PM",
    mapEmbedUrl:
      "https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=Gaisano+South,Colon+Street,Cebu+City&zoom=16",
    mapLink: "https://maps.google.com/?q=Gaisano+South+Colon+Street+Cebu+City",
    sortOrder: 6,
  },
  {
    name: "Mak's View — Busay Branch",
    address: "Mak's View, Busay, Cebu City",
    phone: "0927-440-6891",
    hours: "Daily: 10:00 AM – 10:00 PM",
    mapEmbedUrl:
      "https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=Mak's+View,Busay,Cebu+City&zoom=15",
    mapLink: "https://maps.google.com/?q=Mak's+View+Busay+Cebu+City",
    sortOrder: 7,
  },
  {
    name: "Mactan Airport Branch",
    address: "Departure Area, Mactan Domestic Airport, Lapu-Lapu City, Cebu",
    phone: "(032) 268-0327",
    hours: "Daily: 5:00 AM – 8:00 PM",
    city: "Lapu-Lapu City",
    mapEmbedUrl:
      "https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=Mactan-Cebu+International+Airport,Lapu-Lapu+City&zoom=14",
    mapLink: "https://maps.google.com/?q=Mactan+Cebu+International+Airport",
    sortOrder: 8,
  },
];

const menuItems = BASE_MENU_ITEMS.map((item) => ({ ...item }));

async function main() {
  await prisma.feedback.deleteMany();
  await prisma.menuItem.deleteMany();
  await prisma.store.deleteMany();
  await prisma.admin.deleteMany();

  const passwordHash = await bcrypt.hash("admin123", 12);

  await prisma.admin.create({
    data: {
      email: "admin@ayerlechon.com",
      passwordHash,
      name: "Store Manager",
    },
  });

  const createdStores = await Promise.all(
    stores.map((store) => prisma.store.create({ data: store }))
  );

  await prisma.menuItem.createMany({ data: menuItems });

  const sampleFeedback = [
    {
      branchId: createdStores[0].id,
      orderType: "DINE_IN",
      foodRating: 5,
      serviceRating: 5,
      cleanlinessRating: 4,
      overallRating: 5,
      orderDetails: "Lechon Belly Full Tray, Calamansi Juice",
      comments: "Best lechon in Cebu! The skin was incredibly crispy.",
      wouldRecommend: true,
      customerName: "Maria S.",
    },
    {
      branchId: createdStores[1].id,
      orderType: "TAKEOUT",
      foodRating: 4,
      serviceRating: 4,
      cleanlinessRating: 5,
      overallRating: 4,
      orderDetails: "Lechon Rice Meal x3",
      comments: "IT Park branch is so convenient — open 24/7!",
      wouldRecommend: true,
    },
    {
      branchId: createdStores[2].id,
      orderType: "TAKEOUT",
      foodRating: 5,
      serviceRating: 5,
      cleanlinessRating: 5,
      overallRating: 5,
      orderDetails: "Whole Lechon Medium for birthday party",
      comments: "Grabbed some after shopping at SM. Our guests loved it!",
      wouldRecommend: true,
      customerName: "Juan D.",
      customerPhone: "+63 917 123 4567",
    },
    {
      branchId: createdStores[0].id,
      orderType: "DELIVERY",
      foodRating: 4,
      serviceRating: 3,
      cleanlinessRating: 4,
      overallRating: 4,
      orderDetails: "Lechon Party Tray",
      comments: "Food was excellent. Delivery took a bit longer than expected.",
      wouldRecommend: true,
    },
    {
      branchId: createdStores[3].id,
      orderType: "DINE_IN",
      foodRating: 4,
      serviceRating: 4,
      cleanlinessRating: 4,
      overallRating: 4,
      orderDetails: "Kinutchillo half lechon",
      comments: "Mango Square branch is always packed — great lechon!",
      wouldRecommend: true,
      customerName: "Ana R.",
    },
  ];

  for (const feedback of sampleFeedback) {
    const daysAgo = Math.floor(Math.random() * 60);
    const createdAt = new Date();
    createdAt.setDate(createdAt.getDate() - daysAgo);

    await prisma.feedback.create({
      data: {
        ...feedback,
        createdAt,
      },
    });
  }

  console.log("Database seeded successfully!");
  console.log("Admin login: admin@ayerlechon.com / admin123");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
