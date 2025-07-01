"use client";

import { useState, useEffect } from "react";

interface PayloadConfig {
  serverURL?: string;
  apiURL?: string;
}

const config: PayloadConfig = {
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000",
  apiURL: process.env.NEXT_PUBLIC_SERVER_URL
    ? `${process.env.NEXT_PUBLIC_SERVER_URL}/api`
    : "http://localhost:3000/api",
};

interface PayloadResponse<T> {
  docs: T[];
  totalDocs: number;
  limit: number;
  page: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  nextPage?: number;
  prevPage?: number;
}

interface PayloadError {
  message: string;
  name: string;
}

interface UsePayloadResult<T> {
  data: T[] | null;
  loading: boolean;
  error: PayloadError | null;
  refetch: () => Promise<void>;
  pagination?: {
    totalDocs: number;
    limit: number;
    page: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

export function usePayloadCollection<T = any>(
  collection: string,
  options: {
    where?: Record<string, any>;
    limit?: number;
    page?: number;
    sort?: string;
    depth?: number;
  } = {},
): UsePayloadResult<T> {
  const [data, setData] = useState<T[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<PayloadError | null>(null);
  const [pagination, setPagination] =
    useState<UsePayloadResult<T>["pagination"]>();

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const searchParams = new URLSearchParams();

      if (options.where) {
        searchParams.append("where", JSON.stringify(options.where));
      }
      if (options.limit) {
        searchParams.append("limit", options.limit.toString());
      }
      if (options.page) {
        searchParams.append("page", options.page.toString());
      }
      if (options.sort) {
        searchParams.append("sort", options.sort);
      }
      if (options.depth) {
        searchParams.append("depth", options.depth.toString());
      }

      const url = `${config.apiURL}/${collection}?${searchParams.toString()}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(
          `Failed to fetch ${collection}: ${response.statusText}`,
        );
      }

      const result: PayloadResponse<T> = await response.json();

      setData(result.docs);
      setPagination({
        totalDocs: result.totalDocs,
        limit: result.limit,
        page: result.page,
        totalPages: result.totalPages,
        hasNextPage: result.hasNextPage,
        hasPrevPage: result.hasPrevPage,
      });
    } catch (err) {
      setError({
        message: err instanceof Error ? err.message : "Unknown error occurred",
        name: "FetchError",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [collection, JSON.stringify(options)]);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
    pagination,
  };
}

export function usePayloadDocument<T = any>(
  collection: string,
  id: string,
  options: {
    depth?: number;
  } = {},
): Omit<UsePayloadResult<T>, "pagination"> & { data: T | null } {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<PayloadError | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const searchParams = new URLSearchParams();
      if (options.depth) {
        searchParams.append("depth", options.depth.toString());
      }

      const url = `${config.apiURL}/${collection}/${id}?${searchParams.toString()}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(
          `Failed to fetch ${collection}/${id}: ${response.statusText}`,
        );
      }

      const result: T = await response.json();
      setData(result);
    } catch (err) {
      setError({
        message: err instanceof Error ? err.message : "Unknown error occurred",
        name: "FetchError",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [collection, id, JSON.stringify(options)]);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
  };
}

// Hook for fetching products
export function useProducts(options?: {
  category?: string;
  brand?: string;
  featured?: boolean;
  status?: string;
  limit?: number;
  page?: number;
}) {
  const where: Record<string, any> = {};

  if (options?.category) {
    where["productCategory.slug"] = { equals: options.category };
  }
  if (options?.brand) {
    where["productBrand.slug"] = { equals: options.brand };
  }
  if (options?.featured) {
    where.featured = { equals: options.featured };
  }
  if (options?.status) {
    where.productStatus = { equals: options.status };
  }

  return usePayloadCollection("products", {
    where: Object.keys(where).length > 0 ? where : undefined,
    limit: options?.limit || 12,
    page: options?.page || 1,
    sort: "-createdAt",
    depth: 2,
  });
}

// Hook for fetching news articles
export function useNews(options?: {
  featured?: boolean;
  status?: string;
  category?: string;
  limit?: number;
  page?: number;
}) {
  const where: Record<string, any> = { status: { equals: "published" } };

  if (options?.featured) {
    where.featured = { equals: options.featured };
  }
  if (options?.category) {
    where["categories.category"] = { equals: options.category };
  }

  return usePayloadCollection("news", {
    where,
    limit: options?.limit || 10,
    page: options?.page || 1,
    sort: "-publishDate",
    depth: 1,
  });
}

// Hook for fetching brands
export function useBrands(options?: { featured?: boolean; status?: string }) {
  const where: Record<string, any> = {};

  if (options?.featured) {
    where.featured = { equals: options.featured };
  }
  if (options?.status) {
    where.status = { equals: options.status };
  }

  return usePayloadCollection("brands", {
    where: Object.keys(where).length > 0 ? where : undefined,
    sort: "displayOrder",
    depth: 1,
  });
}

// Hook for fetching categories
export function useCategories(options?: { status?: string }) {
  const where: Record<string, any> = {};

  if (options?.status) {
    where.status = { equals: options.status };
  }

  return usePayloadCollection("categories", {
    where: Object.keys(where).length > 0 ? where : undefined,
    sort: "displayOrder",
    depth: 1,
  });
}

// Hook for fetching homepage content
export function useHomepageContent() {
  return usePayloadCollection("homepage-content", {
    where: {
      status: { equals: "active" },
    },
    sort: "displayOrder",
    depth: 2,
  });
}

// Hook for fetching company info
export function useCompanyInfo() {
  return usePayloadCollection("company-info", {
    where: {
      status: { equals: "active" },
    },
    sort: "displayOrder",
    depth: 1,
  });
}

export default config;
