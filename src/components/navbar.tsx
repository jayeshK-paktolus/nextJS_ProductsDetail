"use client";

import { User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <header>
      <nav className="m-0.5 bg-white border-b border-gray-200 p-2.5 fixed top-0 left-0 right-0 z-50">
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

          <div className="flex justify-end items-center">
            {session?.user ? (
              <div className="flex items-center space-x-4">
                <User className="cursor-pointer" />
                <button
                  onClick={() => signOut()}
                  className="text-sm text-red-500 hover:underline"
                >
                  Logout
                </button>
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
