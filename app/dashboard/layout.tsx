"use client";

import { SessionProvider } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import {
  HomeIcon,
  ShoppingBagIcon,
  TagIcon,
  BuildingStorefrontIcon,
  NewspaperIcon,
  ShoppingCartIcon,
  UsersIcon,
  CogIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Toaster } from "react-hot-toast";
import QueryProvider from "@/components/providers/query-provider";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: HomeIcon,
    roles: ["ADMIN", "PRODUCT_MANAGER"],
  },
  {
    name: "Products",
    href: "/dashboard/products",
    icon: ShoppingBagIcon,
    roles: ["ADMIN", "PRODUCT_MANAGER"],
  },
  {
    name: "Categories",
    href: "/dashboard/categories",
    icon: TagIcon,
    roles: ["ADMIN", "PRODUCT_MANAGER"],
  },
  {
    name: "Brands",
    href: "/dashboard/brands",
    icon: BuildingStorefrontIcon,
    roles: ["ADMIN", "PRODUCT_MANAGER"],
  },
  {
    name: "News",
    href: "/dashboard/news",
    icon: NewspaperIcon,
    roles: ["ADMIN", "PRODUCT_MANAGER"],
  },
  {
    name: "Orders",
    href: "/dashboard/orders",
    icon: ShoppingCartIcon,
    roles: ["ADMIN", "PRODUCT_MANAGER"],
  },
  {
    name: "Users",
    href: "/dashboard/users",
    icon: UsersIcon,
    roles: ["ADMIN"],
  },
  {
    name: "Settings",
    href: "/dashboard/settings",
    icon: CogIcon,
    roles: ["ADMIN"],
  },
];

function DashboardContent({ children }: DashboardLayoutProps) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (status === "loading") return; // Still loading

    if (!session && pathname !== "/dashboard/login") {
      router.push("/dashboard/login");
    }
  }, [session, status, router, pathname]);

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!session && pathname !== "/dashboard/login") {
    return null; // Will redirect to login
  }

  if (pathname === "/dashboard/login") {
    return <>{children}</>;
  }

  const userRole = session?.user?.role || "PRODUCT_MANAGER";
  const filteredNavigation = navigation.filter((item) =>
    item.roles.includes(userRole),
  );

  return (
    <div className="h-screen flex overflow-hidden bg-gray-100">
      <Toaster position="top-right" />

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 flex z-40 md:hidden">
          <div
            className="fixed inset-0 bg-gray-600 bg-opacity-75"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
            <div className="absolute top-0 right-0 -mr-12 pt-2">
              <button
                className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                onClick={() => setSidebarOpen(false)}
              >
                <XMarkIcon className="h-6 w-6 text-white" />
              </button>
            </div>
            <SidebarContent
              navigation={filteredNavigation}
              pathname={pathname}
            />
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64">
          <SidebarContent navigation={filteredNavigation} pathname={pathname} />
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        {/* Top navigation */}
        <div className="relative z-10 flex-shrink-0 flex h-16 bg-white shadow">
          <button
            className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 md:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Bars3Icon className="h-6 w-6" />
          </button>
          <div className="flex-1 px-4 flex justify-between">
            <div className="flex-1 flex items-center">
              <h1 className="text-lg font-semibold text-gray-900">
                Ralhum Sports Dashboard
              </h1>
            </div>
            <div className="ml-4 flex items-center md:ml-6">
              <div className="relative">
                <span className="text-sm text-gray-700">
                  Welcome, {session?.user?.name}
                </span>
                <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                  {userRole}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function SidebarContent({
  navigation,
  pathname,
}: {
  navigation: any[];
  pathname: string;
}) {
  return (
    <div className="flex flex-col h-0 flex-1 border-r border-gray-200 bg-white">
      <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
        <div className="flex items-center flex-shrink-0 px-4">
          <h2 className="text-lg font-bold text-blue-900">Ralhum Sports</h2>
        </div>
        <nav className="mt-5 flex-1 px-2 space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`${
                  isActive
                    ? "bg-blue-100 text-blue-900"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                } group flex items-center px-2 py-2 text-sm font-medium rounded-md`}
              >
                <item.icon
                  className={`${
                    isActive
                      ? "text-blue-500"
                      : "text-gray-400 group-hover:text-gray-500"
                  } mr-3 flex-shrink-0 h-6 w-6`}
                />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <SessionProvider>
      <QueryProvider>
        <DashboardContent>{children}</DashboardContent>
      </QueryProvider>
    </SessionProvider>
  );
}
