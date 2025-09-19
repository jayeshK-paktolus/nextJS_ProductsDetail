"use client";

import { ReactNode } from "react";
import Navbar from "@/components/navbar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Package, Users, Settings } from "lucide-react";

function Layout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  const links = [
    { href: "/admin", label: "Account Details", icon: LayoutDashboard },
    { href: "/admin/products", label: "Add Products", icon: Package },
    { href: "/admin/users", label: "Users", icon: Users },
    { href: "/admin/settings", label: "Settings", icon: Settings },
  ];

  return (
    <>
      <Navbar />
      <div className="flex mt-16">
        <aside className="w-64 bg-gray-100 min-h-screen p-6 shadow-md">
          <h2 className="text-xl font-bold mb-6 text-gray-800">Admin Panel</h2>

          <nav className="space-y-2">
            {links.map(({ href, label, icon: Icon }) => {
              const isActive = pathname === href;

              return (
                <Link
                  key={href}
                  href={href}
                  className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors border-l-4 ${
                    isActive
                      ? "bg-white shadow-sm text-gray-900 font-semibold border-blue-500"
                      : "hover:bg-gray-200 text-gray-700 border-transparent"
                  }`}
                >
                  <Icon size={20} />
                  <span className="whitespace-nowrap">{label}</span>
                </Link>
              );
            })}
          </nav>
        </aside>

        <main className="flex-1 p-6 bg-gray-50 min-h-screen">
          {children}
        </main>
      </div>
    </>
  );
}

export default Layout;
