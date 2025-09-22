"use client";

import { Heart, User, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Popover, PopoverTrigger, PopoverContent } from "./ui/popover";
import { useFav } from "@/app/context/FavContext";
import { useCart } from "@/app/context/CartContext";
import { usePathname } from "next/navigation";
import { useState } from "react";

const Navbar = () => {
  const { data: session } = useSession();
  const pathname = usePathname();
  const { favorites } = useFav();
  const { cart } = useCart();

  const [mobileOpen, setMobileOpen] = useState<boolean>(false);

  const links = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/cart", label: "Cart" },
    { href: "/about-us", label: "About Us" },
  ];

  if (session?.user) {
    links.push({ href: "/dashboard", label: "Dashboard" });
    links.push({ href: "/admin", label: "Admin" });
  }

  return (
    <header>
      <nav className="bg-white border-b border-gray-200 fixed top-0 left-0 right-0 z-50 rounded-b-2xl shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.svg"
                alt="Logo"
                width={32}
                height={32}
                className="mr-2"
              />
            </Link>

            <div className="hidden md:flex flex-1 justify-center gap-4">
              {links.map(({ href, label }) => {
                const isActive = pathname === href;
                return (
                  <Link
                    key={href}
                    href={href}
                    className={`relative font-medium px-3 py-1 rounded-md transition ${
                      isActive
                        ? "text-blue-600 font-semibold bg-blue-50"
                        : "text-black hover:text-blue-500 hover:scale-105"
                    }`}
                  >
                    {label}

                    {href === "/cart" && cart.length > 0 && (
                      <span className="absolute -top-1 -right-0 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                        {cart.length}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-4">
              {/* Favorites */}
              <Link href="/fav" className="relative">
                <Heart
                  className={`w-6 h-6 cursor-pointer ${
                    pathname === "/fav" ? "text-blue-600" : "text-black"
                  }`}
                />
                {favorites.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    {favorites.length}
                  </span>
                )}
              </Link>

              {session?.user ? (
                <Popover>
                  <PopoverTrigger>
                    <User className="cursor-pointer w-6 h-6" />
                  </PopoverTrigger>
                  <PopoverContent>
                    <button
                      onClick={() => signOut()}
                      className="text-sm text-red-500 hover:underline"
                    >
                      Logout
                    </button>
                  </PopoverContent>
                </Popover>
              ) : (
                <Link
                  href="/auth/sign-in"
                  className="text-blue-500 text-sm hover:underline"
                >
                  Login/Signup
                </Link>
              )}

              <button
                className="md:hidden"
                onClick={() => setMobileOpen(!mobileOpen)}
              >
                {mobileOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {mobileOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 px-4 pt-2 pb-4 space-y-1">
            {links.map(({ href, label }) => {
              const isActive = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    isActive
                      ? "bg-blue-50 text-blue-600 font-semibold"
                      : "text-black hover:text-blue-500"
                  }`}
                  onClick={() => setMobileOpen(false)}
                >
                  {label}

                  {href === "/cart" && cart.length > 0 && (
                    <span className="ml-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 inline-flex items-center justify-center">
                      {cart.length}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
