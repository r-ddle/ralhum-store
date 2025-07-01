const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  console.log("🚀 Setting up Ralhum Sports CMS database...");

  try {
    // Create default admin user
    const hashedPassword = await bcrypt.hash("Admin123!", 12);

    const adminUser = await prisma.user.upsert({
      where: { email: "admin@ralhumsports.com" },
      update: {},
      create: {
        email: "admin@ralhumsports.com",
        name: "Admin User",
        password: hashedPassword,
        role: "ADMIN",
      },
    });

    console.log("✅ Admin user created/updated");
    console.log("📧 Email: admin@ralhumsports.com");
    console.log("🔑 Password: Admin123!");

    // Create default product manager
    const managerPassword = await bcrypt.hash("Manager123!", 12);

    const managerUser = await prisma.user.upsert({
      where: { email: "manager@ralhumsports.com" },
      update: {},
      create: {
        email: "manager@ralhumsports.com",
        name: "Product Manager",
        password: managerPassword,
        role: "PRODUCT_MANAGER",
      },
    });

    console.log("✅ Product Manager user created/updated");
    console.log("📧 Email: manager@ralhumsports.com");
    console.log("🔑 Password: Manager123!");

    // Create default categories
    const categories = [
      {
        categoryName: "Cricket",
        slug: "cricket",
        categoryDescription: "Cricket equipment and accessories",
      },
      {
        categoryName: "Rugby",
        slug: "rugby",
        categoryDescription: "Rugby balls and training equipment",
      },
      {
        categoryName: "Basketball",
        slug: "basketball",
        categoryDescription: "Basketball equipment and accessories",
      },
      {
        categoryName: "Volleyball",
        slug: "volleyball",
        categoryDescription: "Volleyball equipment and court accessories",
      },
      {
        categoryName: "Hockey",
        slug: "hockey",
        categoryDescription: "Field hockey sticks and protective equipment",
      },
      {
        categoryName: "Tennis",
        slug: "tennis",
        categoryDescription: "Tennis rackets, balls, and court accessories",
      },
      {
        categoryName: "Badminton",
        slug: "badminton",
        categoryDescription: "Badminton rackets and shuttlecocks",
      },
    ];

    for (const category of categories) {
      await prisma.category.upsert({
        where: { slug: category.slug },
        update: {},
        create: category,
      });
    }

    console.log("✅ Default categories created");

    // Create default brands
    const brands = [
      {
        brandName: "Gray-Nicolls",
        slug: "gray-nicolls",
        brandDescription:
          "World's finest cricket equipment manufacturer since 1855",
        brandWebsite: "https://gray-nicolls.co.uk",
      },
      {
        brandName: "Gilbert",
        slug: "gilbert",
        brandDescription: "Official Rugby World Cup supplier since 1823",
        brandWebsite: "https://gilbert-rugby.com",
      },
      {
        brandName: "Molten",
        slug: "molten",
        brandDescription:
          "Innovation leader in basketball and volleyball equipment",
        brandWebsite: "https://molten.com",
      },
      {
        brandName: "Grays",
        slug: "grays",
        brandDescription: "Field sports excellence trusted by Olympic athletes",
        brandWebsite: "https://grays-hockey.com",
      },
    ];

    for (const brand of brands) {
      await prisma.brand.upsert({
        where: { slug: brand.slug },
        update: {},
        create: brand,
      });
    }

    console.log("✅ Default brands created");

    // Create company info
    await prisma.companyInfo.upsert({
      where: { id: "main" },
      update: {},
      create: {
        id: "main",
        companyName: "Ralhum Sports",
        description:
          "Sri Lanka's premier sports equipment distributor with 25+ years of excellence",
        address: "Colombo, Sri Lanka",
        phone: "+94 11 234 5678",
        email: "info@ralhumsports.com",
        website: "https://ralhumsports.com",
        founded: "1999",
        employees: "50+",
        heritage: "25+ Years of Athletic Excellence",
      },
    });

    console.log("✅ Company information created");

    console.log("🎉 Database setup complete!");
    console.log(
      "🌐 You can now login to the dashboard at http://localhost:3000/dashboard",
    );
  } catch (error) {
    console.error("❌ Error setting up database:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
