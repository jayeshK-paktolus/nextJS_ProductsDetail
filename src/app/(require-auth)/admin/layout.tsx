"use client";

import { ReactNode, useEffect, useState } from "react";
import Navbar from "@/components/navbar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  Users,
  Settings,
  Menu,
} from "lucide-react";
import { Button } from "@/components/ui/button";

function Layout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);

  const links = [
    { href: "/admin", label: "Account Details", icon: LayoutDashboard },
    { href: "/admin/products", label: "Add Products", icon: Package },
    { href: "/admin/users", label: "Users", icon: Users },
    { href: "/admin/settings", label: "Settings", icon: Settings },
  ];

  useEffect(() => {
    setMobileOpen(false);
  },[pathname])

  return (
    <>
      <Navbar />
      <div className="flex mt-16">
        <aside
          className={`fixed md:static top-0 left-0 min-h-screen w-64 bg-gray-100 p-6 shadow-md 
          transform transition-transform duration-200 ease-in-out z-50 md:z-auto
          ${
            mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          }`}
        >
          <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
          {/* <Button
            onClick={() => setMobileOpen(false)}
            className="md:hidden text-gray-700"
          >
            <X size={24} />
          </Button> */}
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

        {mobileOpen && (
          <div
            className="fixed inset-0 bg-black/40 z-40 md:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}

        <main className="flex-1 p-6 bg-gray-50 min-h-screen">
          <Button
            className="md:hidden mb-4 flex items-center gap-2 px-3 py-2 bg-white rounded-md "
            onClick={() => setMobileOpen(true)}
          >
            <Menu size={20} color="black" />
            <span className="font-medium text-black">Menu</span>
          </Button>
          {children}
        </main>
      </div>
    </>
  );
}

export default Layout;
