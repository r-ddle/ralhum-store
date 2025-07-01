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

    // Get counts for all entities
    const [
      productsCount,
      categoriesCount,
      brandsCount,
      newsCount,
      ordersCount,
      usersCount,
    ] = await Promise.all([
      prisma.product.count(),
      prisma.category.count(),
      prisma.brand.count(),
      prisma.news.count(),
      prisma.order.count(),
      // Only count users if user is admin
      session.user.role === "ADMIN" ? prisma.user.count() : 0,
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
  } catch (error) {
    console.error("Dashboard stats error:", error);
    return NextResponse.json(
      { error: "Failed to fetch dashboard stats" },
      { status: 500 },
    );
  }
}
