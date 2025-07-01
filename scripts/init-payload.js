const payload = require("payload");
require("dotenv").config();

const init = async () => {
  console.log("🚀 Initializing PayloadCMS...");

  try {
    await payload.init({
      secret: process.env.PAYLOAD_SECRET,
      mongoURL: false, // We're using PostgreSQL
      express: false, // We're using Next.js
      local: true,
    });

    console.log("✅ PayloadCMS initialized successfully!");

    // Check if admin user exists
    const adminUsers = await payload.find({
      collection: "users",
      where: {
        role: {
          equals: "admin",
        },
      },
    });

    if (adminUsers.docs.length === 0) {
      console.log("👤 Creating default admin user...");

      const adminUser = await payload.create({
        collection: "users",
        data: {
          email: "admin@ralhumsports.com",
          password: "Admin123!",
          role: "admin",
          firstName: "Admin",
          lastName: "User",
        },
      });

      console.log("✅ Default admin user created!");
      console.log("📧 Email: admin@ralhumsports.com");
      console.log("🔑 Password: Admin123!");
      console.log("⚠️  Please change the password after first login!");
    } else {
      console.log("👤 Admin user already exists");
    }

    // Seed some initial data
    console.log("📦 Seeding initial data...");

    // Create default categories
    const categories = [
      {
        categoryName: "Cricket",
        categoryDescription: "Cricket equipment and accessories",
      },
      {
        categoryName: "Rugby",
        categoryDescription: "Rugby balls and training equipment",
      },
      {
        categoryName: "Basketball",
        categoryDescription: "Basketball equipment and accessories",
      },
      {
        categoryName: "Volleyball",
        categoryDescription: "Volleyball equipment and court accessories",
      },
      {
        categoryName: "Hockey",
        categoryDescription: "Field hockey sticks and protective equipment",
      },
      {
        categoryName: "Tennis",
        categoryDescription: "Tennis rackets, balls, and court accessories",
      },
      {
        categoryName: "Badminton",
        categoryDescription: "Badminton rackets and shuttlecocks",
      },
    ];

    for (const category of categories) {
      try {
        const existing = await payload.find({
          collection: "categories",
          where: {
            categoryName: {
              equals: category.categoryName,
            },
          },
        });

        if (existing.docs.length === 0) {
          await payload.create({
            collection: "categories",
            data: {
              ...category,
              status: "active",
            },
          });
          console.log(`✅ Created category: ${category.categoryName}`);
        }
      } catch (error) {
        console.log(
          `⚠️  Category ${category.categoryName} might already exist`,
        );
      }
    }

    // Create default brands
    const brands = [
      {
        brandName: "Gray-Nicolls",
        brandDescription:
          "World's finest cricket equipment manufacturer since 1855",
        heritage: "Since 1855",
        featured: true,
      },
      {
        brandName: "Gilbert",
        brandDescription: "Official Rugby World Cup supplier since 1823",
        heritage: "Since 1823",
        featured: true,
      },
      {
        brandName: "Molten",
        brandDescription:
          "Innovation leader in basketball and volleyball equipment",
        heritage: "Innovation Leader",
        featured: true,
      },
      {
        brandName: "Grays",
        brandDescription: "Field sports excellence trusted by Olympic athletes",
        heritage: "Field Sports Excellence",
        featured: true,
      },
      {
        brandName: "Dunlop",
        brandDescription:
          "Premium racquet sports equipment with global recognition",
        heritage: "Global Recognition",
        featured: false,
      },
      {
        brandName: "Slazenger",
        brandDescription:
          "Official Wimbledon ball supplier with multi-sport heritage",
        heritage: "Wimbledon Heritage",
        featured: false,
      },
    ];

    for (const brand of brands) {
      try {
        const existing = await payload.find({
          collection: "brands",
          where: {
            brandName: {
              equals: brand.brandName,
            },
          },
        });

        if (existing.docs.length === 0) {
          await payload.create({
            collection: "brands",
            data: {
              ...brand,
              status: "active",
            },
          });
          console.log(`✅ Created brand: ${brand.brandName}`);
        }
      } catch (error) {
        console.log(`⚠️  Brand ${brand.brandName} might already exist`);
      }
    }

    console.log("🎉 PayloadCMS setup complete!");
    console.log("🌐 Visit http://localhost:3000/admin to access the dashboard");
  } catch (error) {
    console.error("❌ Error initializing PayloadCMS:", error);
  }

  process.exit(0);
};

init();
