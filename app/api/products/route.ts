import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();

const productSchema = z.object({
  productName: z.string().min(1, "Product name is required"),
  productCategory: z.string().min(1, "Category is required"),
  productBrand: z.string().min(1, "Brand is required"),
  productPrice: z.number().min(0, "Price must be positive"),
  productSizes: z.string().optional(),
  productColors: z.string().optional(),
  description: z.string().optional(),
  material: z.string().optional(),
  weight: z.string().optional(),
  sizes: z.string().optional(),
  freeShipping: z.boolean().default(false),
  islandWideDelivery: z.boolean().default(false),
  easyReturn: z.boolean().default(false),
  images: z.array(z.string()).default([]),
  skuCode: z.string().min(1, "SKU code is required"),
  stockQuantity: z.number().min(0, "Stock quantity must be positive"),
  status: z
    .enum(["ACTIVE", "INACTIVE", "DRAFT", "OUT_OF_STOCK"])
    .default("ACTIVE"),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
  categoryId: z.string().min(1, "Category ID is required"),
  brandId: z.string().min(1, "Brand ID is required"),
});

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || "";
    const filter = searchParams.get("filter") || "";

    const where: any = {};

    if (search) {
      where.OR = [
        { productName: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
        { skuCode: { contains: search, mode: "insensitive" } },
      ];
    }

    if (filter) {
      where.status = filter;
    }

    const products = await prisma.product.findMany({
      where,
      include: {
        category: {
          select: { categoryName: true },
        },
        brand: {
          select: { brandName: true },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error("Products GET error:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const validatedData = productSchema.parse(body);

    // Generate slug from product name
    const slug = validatedData.productName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    const product = await prisma.product.create({
      data: {
        ...validatedData,
        slug,
      },
      include: {
        category: {
          select: { categoryName: true },
        },
        brand: {
          select: { brandName: true },
        },
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error("Products POST error:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.errors },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 },
    );
  }
}
