"use client";

import { Heart, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Popover, PopoverTrigger, PopoverContent } from "./ui/popover";
import { useFav } from "@/app/context/FavContext";

const Navbar = () => {
  const { data: session } = useSession();
  const { favorites } = useFav();

  return (
    <header>
      <nav className=" bg-white border-b border-gray-200 p-2.5 fixed top-0 left-0 right-0 z-50 rounded-b-2xl shadow-lg">
        <div className="flex flex-wrap justify-between items-center p-0.5">
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

          <div className="flex justify-center flex-1">
            <Link
              href="/"
              className="font-medium mx-4 text-black hover:scale-105 transform transition"
            >
              Home
            </Link>
            <Link
              href="/products"
              className="font-medium mx-4 text-black hover:scale-105 transform transition"
            >
              Products
            </Link>
            <Link
              href="/cart"
              className="font-medium mx-4 text-black hover:scale-105 transform transition"
            >
              Cart
            </Link>
            <Link
              href="/about-us"
              className="font-medium mx-4 text-black hover:scale-105 transform transition"
            >
              About us
            </Link>
            {session?.user && (
              <>
                <Link
                  href="/dashboard"
                  className="font-medium mx-4 text-black hover:scale-105 transform transition"
                >
                  Dashboard
                </Link>
                <Link
                  href="/admin"
                  className="font-medium mx-4 text-black hover:scale-105 transform transition"
                >
                  Admin
                </Link>
              </>
            )}
          </div>

          <div className="flex justify-end items-center gap-3">
            <Link href={'/fav'}>
              <div className="relative w-8 h-8 flex items-center justify-center rounded-full">
                <Heart className="cursor-pointer" />
                {favorites.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {favorites.length}
                  </span>
                )}
              </div>

            </Link>

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
