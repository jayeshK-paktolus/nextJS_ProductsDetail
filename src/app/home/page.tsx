"use client";

import Navbar from "@/components/navbar";
import React from "react";
import HeaderSlider from "@/components/ui/header-slider";
import { Card } from "@/components/ui/card";
import { popularProducts } from "@/assets/popular-products";
import Link from "next/link";
import Banner from "@/components/ui/banner";
import Footer from "@/components/ui/footer";
import { ShoppingCart, Check, Heart } from "lucide-react";
import { useCart } from "../context/CartContext";
import { toast } from "@/hooks/use-toast";
import Image from "next/image";
import { useFav } from "../context/FavContext";

export default function Home() {
  const { removeFromCart, addToCart, cart } = useCart();
  const { removeFromFav, addToFav, favorites } = useFav();

  type Product = {
    id: number;
    title: string;
    price: number;
    thumbnail: string;
  };

  const handleCartToggle = (product: Product) => {
    const isInCart = cart.find((item) => item.id === product.id);

    if (isInCart) {
      removeFromCart(product.id);

      toast({
        title: "Product Removed from Cart 🗑️",
        description: `${product.title} has been removed from your cart.`,
        duration: 3000,
      });
    } else {
      addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        thumbnail: product.thumbnail,
        quantity: 1,
      });

      toast({
        title: "Product Added to Cart 🛒",
        description: `${product.title} has been added to your cart.`,
        duration: 3000,
      });
    }
  };

  const handleFavToggle = (product : Product) => {
   const isInFav = favorites.find((item) => item.id === product.id);

    if (isInFav) {
      removeFromFav(product.id);

      toast({
        title: "Product Removed from Favorites 🗑️",
        description: `${product.title} has been removed from your favorites.`,
        duration: 3000,
      });
    } else {
      addToFav({
        id: product.id,
        title: product.title,
        price: product.price,
        thumbnail: product.thumbnail,
      });

      toast({
        title: "Product Added to Favorites 🛒",
        description: `${product.title} has been added to your favorites.`,
        duration: 3000,
      });
    }
  }

  return (
    <>
      <Navbar />
      <HeaderSlider />

      <section className="w-11/12 mx-auto py-3">
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex justify-start">
          Popular Products
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {popularProducts.map((product) => {
            const isInCart = cart.some((item) => item.id === product.id);
            const isInFav = favorites.some((item) => item.id === product.id)

            return (
              <Link href={`/products/${product.id}`} key={product.id}>
                <Card className="hover:shadow-lg transition-transform transform hover:-translate-y-1 flex flex-col">
                  <div className="relative h-full w-full overflow-hidden rounded-t-lg bg-gray-200">
                    <Image
                      src={product.thumbnail}
                      alt={product.title}
                      width={500}
                      height={500}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <h3 className="font-semibold text-lg text-gray-900 mt-2 px-4">
                    {product.title}
                  </h3>

                  <div className="p-4 flex justify-between items-center flex-1">
                    <p className="font-bold text-orange-600 text-lg items-center">
                      ${product.price}
                    </p>

                    <div className="flex space-x-2">
                      <button
                        className="w-8 h-8 flex rounded-full items-center justify-center transition"
                        
                      onClick={(e) => {
                        e.preventDefault();
                        handleFavToggle(product)
                      }}
                      >
                        {isInFav ? (
                          <Heart color="red" size={18} />
                        ) : (
                          <Heart size={18} />
                        )}
                      </button>
                      <button
                        className={`w-8 h-8 rounded-full ${
                          isInCart
                            ? "bg-green-500 text-white"
                            : "bg-orange-400 text-white"
                        } flex items-center justify-center shadow hover:bg-orange-600 transition`}
                        onClick={(e) => {
                          e.preventDefault();
                          handleCartToggle(product);
                        }}
                      >
                        {isInCart ? (
                          <Check size={18} />
                        ) : (
                          <ShoppingCart size={18} />
                        )}
                      </button>
                    </div>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>

        <h2 className="text-xl font-bold text-gray-800 mb-4 mt-5 flex justify-start">
          Product Categories
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-7">
          {[
            "smartphones",
            "laptops",
            "tablets",
            "sunglasses",
            "mens-watches",
          ].map((category) => (
            <Link href={`/products?category=${category}`} key={category}>
              <Card className="hover:shadow-lg transition-transform transform hover:-translate-y-1 flex flex-col">
                <div className="relative h-full w-full overflow-hidden rounded-t-lg bg-gray-200"></div>

                <div className="p-4 flex flex-col flex-1">
                  <h3 className="font-semibold text-lg text-gray-900">
                    {category}
                  </h3>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        <Link
          href={"/products"}
          className="mt-6 text-center flex justify-center text-orange-300 py-2 px-4 rounded hover:underline font-semibold "
        >
          see all products
        </Link>

        <Banner />

        <Footer />
      </section>
    </>
  );
}
