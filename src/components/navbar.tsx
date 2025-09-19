"use client";

import { Heart, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Popover, PopoverTrigger, PopoverContent } from "./ui/popover";
import { useFav } from "@/app/context/FavContext";
import { useCart } from "@/app/context/CartContext";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const { data: session } = useSession();
  const pathname = usePathname();
  const { favorites } = useFav();
  const { cart } = useCart();

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
      <nav className="bg-white border-b border-gray-200 p-2.5 fixed top-0 left-0 right-0 z-50 rounded-b-2xl shadow-lg">
        <div className="flex flex-wrap justify-between items-center p-0.5">
          {/* Logo */}
          <div className="flex justify-start items-center">
            <Link href="/" className="mr-8 flex">
              <Image
                src="/logo.svg"
                alt="Dashboard Logo"
                className="mr-3"
                width={32}
                height={32}
              />
            </Link>
          </div>

          {/* Nav Links */}
          <div className="flex justify-center flex-1 gap-2">
            {links.map(({ href, label }) => {
              const isActive = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={`relative font-medium px-3 py-1 rounded-md transition ${
                    isActive
                      ? "text-blue-600 font-semibold bg-blue-50"
                      : "text-black hover:scale-105 hover:text-blue-500"
                  }`}
                >
                  {label}

                  {/* Cart badge */}
                  {href === "/cart" && cart.length > 0 && (
                    <span className="absolute -top-1 -right-0 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                      {cart.length}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right Side: Favorites + User */}
          <div className="flex justify-end items-center gap-4">
            {/* Favorites (Heart icon only) */}
            <Link href="/fav">
              <div
                className={`relative w-8 h-8 flex items-center justify-center rounded-full transition ${
                  pathname === "/fav" ? "bg-blue-50 text-blue-600" : ""
                }`}
              >
                <Heart
                  className={`cursor-pointer ${
                    pathname === "/fav" ? "text-blue-600" : "text-black"
                  }`}
                />
                {favorites.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    {favorites.length}
                  </span>
                )}
              </div>
            </Link>

            {/* User */}
            {session?.user ? (
              <div className="flex items-center space-x-4">
                <Popover>
                  <PopoverTrigger>
                    <User className="cursor-pointer" />
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
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  href="/auth/sign-in"
                  className="text-blue-500 hover:underline"
                >
                  Login/Signup
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
