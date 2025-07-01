import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
      // Get counts for all entities
      const [
        productsCount,
        categoriesCount,
        brandsCount,
        newsCount,
        ordersCount,
        usersCount,
      ] = await Promise.all([
        prisma.product.count().catch(() => 0),
        prisma.category.count().catch(() => 0),
        prisma.brand.count().catch(() => 0),
        prisma.news.count().catch(() => 0),
        prisma.order.count().catch(() => 0),
        // Only count users if user is admin
        session.user.role === "ADMIN" ? prisma.user.count().catch(() => 0) : 0,
      ]);

      const stats = {
        products: productsCount,
        categories: categoriesCount,
        brands: brandsCount,
        news: newsCount,
        orders: ordersCount,
        ...(session.user.role === "ADMIN" && { users: usersCount }),
      };

      return NextResponse.json(stats);
    } catch (dbError) {
      // Return default stats if database is not set up yet
      console.log("Database not ready, returning default stats");
      const defaultStats = {
        products: 0,
        categories: 0,
        brands: 0,
        news: 0,
        orders: 0,
        ...(session.user.role === "ADMIN" && { users: 1 }),
      };
      return NextResponse.json(defaultStats);
    }
  } catch (error) {
    console.error("Dashboard stats error:", error);
    return NextResponse.json(
      { error: "Failed to fetch dashboard stats" },
      { status: 500 },
    );
  }
}
