"use client";

import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import {
  ShoppingBagIcon,
  TagIcon,
  BuildingStorefrontIcon,
  NewspaperIcon,
  ShoppingCartIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";

async function fetchDashboardStats() {
  const response = await fetch("/api/dashboard/stats");
  if (!response.ok) {
    throw new Error("Failed to fetch dashboard stats");
  }
  return response.json();
}

export default function DashboardPage() {
  const { data: session } = useSession();

  const { data: stats, isLoading } = useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: fetchDashboardStats,
  });

  const statCards = [
    {
      name: "Total Products",
      stat: stats?.products || 0,
      icon: ShoppingBagIcon,
      color: "bg-blue-500",
    },
    {
      name: "Categories",
      stat: stats?.categories || 0,
      icon: TagIcon,
      color: "bg-green-500",
    },
    {
      name: "Brands",
      stat: stats?.brands || 0,
      icon: BuildingStorefrontIcon,
      color: "bg-purple-500",
    },
    {
      name: "News Articles",
      stat: stats?.news || 0,
      icon: NewspaperIcon,
      color: "bg-orange-500",
    },
    {
      name: "Orders",
      stat: stats?.orders || 0,
      icon: ShoppingCartIcon,
      color: "bg-red-500",
    },
  ];

  // Add users card only for admins
  if (session?.user?.role === "ADMIN") {
    statCards.push({
      name: "Users",
      stat: stats?.users || 0,
      icon: UsersIcon,
      color: "bg-indigo-500",
    });
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="mt-1 text-sm text-gray-600">
          Welcome back, {session?.user?.name}! Here's what's happening with your
          store.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {statCards.map((item) => (
          <div
            key={item.name}
            className="relative bg-white pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden"
          >
            <dt>
              <div className={`absolute ${item.color} rounded-md p-3`}>
                <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <p className="ml-16 text-sm font-medium text-gray-500 truncate">
                {item.name}
              </p>
            </dt>
            <dd className="ml-16 pb-6 flex items-baseline sm:pb-7">
              <p className="text-2xl font-semibold text-gray-900">
                {isLoading ? (
                  <div className="animate-pulse bg-gray-200 h-8 w-16 rounded"></div>
                ) : (
                  item.stat
                )}
              </p>
            </dd>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mt-8">
        <h2 className="text-lg font-medium text-gray-900 mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <a
            href="/dashboard/products/new"
            className="relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-500 rounded-lg shadow hover:bg-gray-50"
          >
            <div>
              <span className="rounded-lg inline-flex p-3 bg-blue-50 text-blue-700 ring-4 ring-white">
                <ShoppingBagIcon className="h-6 w-6" />
              </span>
            </div>
            <div className="mt-8">
              <h3 className="text-lg font-medium">
                <span className="absolute inset-0" aria-hidden="true" />
                Add Product
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                Create a new product listing with details and images.
              </p>
            </div>
          </a>

          <a
            href="/dashboard/categories/new"
            className="relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-green-500 rounded-lg shadow hover:bg-gray-50"
          >
            <div>
              <span className="rounded-lg inline-flex p-3 bg-green-50 text-green-700 ring-4 ring-white">
                <TagIcon className="h-6 w-6" />
              </span>
            </div>
            <div className="mt-8">
              <h3 className="text-lg font-medium">
                <span className="absolute inset-0" aria-hidden="true" />
                Add Category
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                Create a new product category for organization.
              </p>
            </div>
          </a>

          <a
            href="/dashboard/news/new"
            className="relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-500 rounded-lg shadow hover:bg-gray-50"
          >
            <div>
              <span className="rounded-lg inline-flex p-3 bg-orange-50 text-orange-700 ring-4 ring-white">
                <NewspaperIcon className="h-6 w-6" />
              </span>
            </div>
            <div className="mt-8">
              <h3 className="text-lg font-medium">
                <span className="absolute inset-0" aria-hidden="true" />
                Write Article
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                Create a new news article or blog post.
              </p>
            </div>
          </a>

          <a
            href="/dashboard/orders"
            className="relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-red-500 rounded-lg shadow hover:bg-gray-50"
          >
            <div>
              <span className="rounded-lg inline-flex p-3 bg-red-50 text-red-700 ring-4 ring-white">
                <ShoppingCartIcon className="h-6 w-6" />
              </span>
            </div>
            <div className="mt-8">
              <h3 className="text-lg font-medium">
                <span className="absolute inset-0" aria-hidden="true" />
                View Orders
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                Check and manage customer orders.
              </p>
            </div>
          </a>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-8">
        <h2 className="text-lg font-medium text-gray-900 mb-4">
          Recent Activity
        </h2>
        <div className="bg-white shadow rounded-lg">
          <div className="p-6">
            <p className="text-gray-500 text-center">
              Recent activity will appear here once you start using the
              dashboard.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
