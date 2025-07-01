"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useMutation } from "@tanstack/react-query";
import { z } from "zod";
import toast from "react-hot-toast";
import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

const productSchema = z.object({
  productName: z.string().min(1, "Product name is required"),
  categoryId: z.string().min(1, "Category is required"),
  brandId: z.string().min(1, "Brand is required"),
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
  skuCode: z.string().min(1, "SKU code is required"),
  stockQuantity: z.number().min(0, "Stock quantity must be positive"),
  status: z.enum(["ACTIVE", "INACTIVE", "DRAFT", "OUT_OF_STOCK"]),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
});

type ProductForm = z.infer<typeof productSchema>;

async function fetchCategories() {
  const response = await fetch("/api/categories");
  if (!response.ok) throw new Error("Failed to fetch categories");
  return response.json();
}

async function fetchBrands() {
  const response = await fetch("/api/brands");
  if (!response.ok) throw new Error("Failed to fetch brands");
  return response.json();
}

async function createProduct(data: ProductForm) {
  const response = await fetch("/api/products", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Failed to create product");
  return response.json();
}

export default function NewProductPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  const { data: brands = [] } = useQuery({
    queryKey: ["brands"],
    queryFn: fetchBrands,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProductForm>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      status: "ACTIVE",
      stockQuantity: 0,
      productPrice: 0,
      freeShipping: false,
      islandWideDelivery: false,
      easyReturn: false,
    },
  });

  const createMutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      toast.success("Product created successfully!");
      router.push("/dashboard/products");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to create product");
    },
  });

  const onSubmit = async (data: ProductForm) => {
    setIsLoading(true);
    try {
      await createMutation.mutateAsync(data);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/dashboard/products"
          className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-4"
        >
          <ArrowLeftIcon className="mr-2 h-4 w-4" />
          Back to Products
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Add New Product</h1>
        <p className="mt-1 text-sm text-gray-600">
          Create a new product with all the necessary details and
          specifications.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-5 border-b border-gray-200">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Basic Information
            </h3>
          </div>
          <div className="px-6 py-5 space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Product Name *
                </label>
                <input
                  {...register("productName")}
                  type="text"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.productName && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.productName.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  SKU Code *
                </label>
                <input
                  {...register("skuCode")}
                  type="text"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.skuCode && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.skuCode.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Category *
                </label>
                <select
                  {...register("categoryId")}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select a category</option>
                  {categories.map((category: any) => (
                    <option key={category.id} value={category.id}>
                      {category.categoryName}
                    </option>
                  ))}
                </select>
                {errors.categoryId && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.categoryId.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Brand *
                </label>
                <select
                  {...register("brandId")}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select a brand</option>
                  {brands.map((brand: any) => (
                    <option key={brand.id} value={brand.id}>
                      {brand.brandName}
                    </option>
                  ))}
                </select>
                {errors.brandId && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.brandId.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Price (LKR) *
                </label>
                <input
                  {...register("productPrice", { valueAsNumber: true })}
                  type="number"
                  step="0.01"
                  min="0"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.productPrice && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.productPrice.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Stock Quantity *
                </label>
                <input
                  {...register("stockQuantity", { valueAsNumber: true })}
                  type="number"
                  min="0"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.stockQuantity && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.stockQuantity.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Status
                </label>
                <select
                  {...register("status")}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="ACTIVE">Active</option>
                  <option value="INACTIVE">Inactive</option>
                  <option value="DRAFT">Draft</option>
                  <option value="OUT_OF_STOCK">Out of Stock</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                {...register("description")}
                rows={4}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Additional Details */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-5 border-b border-gray-200">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Additional Details
            </h3>
          </div>
          <div className="px-6 py-5 space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Available Sizes
                </label>
                <input
                  {...register("productSizes")}
                  type="text"
                  placeholder="e.g., Small, Medium, Large"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Available Colors
                </label>
                <input
                  {...register("productColors")}
                  type="text"
                  placeholder="e.g., Red, Blue, Black"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Material
                </label>
                <input
                  {...register("material")}
                  type="text"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Weight
                </label>
                <input
                  {...register("weight")}
                  type="text"
                  placeholder="e.g., 500g"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Shipping Options */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Shipping Options
              </label>
              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    {...register("freeShipping")}
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-900">
                    Free Shipping
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    {...register("islandWideDelivery")}
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-900">
                    Island-wide Delivery
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    {...register("easyReturn")}
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-900">
                    Easy Return
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SEO Section */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-5 border-b border-gray-200">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              SEO Information
            </h3>
          </div>
          <div className="px-6 py-5 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                SEO Title
              </label>
              <input
                {...register("seoTitle")}
                type="text"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                SEO Description
              </label>
              <textarea
                {...register("seoDescription")}
                rows={3}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end space-x-4">
          <Link
            href="/dashboard/products"
            className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {isLoading ? "Creating..." : "Create Product"}
          </button>
        </div>
      </form>
    </div>
  );
}
