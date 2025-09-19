// import { redirect } from "next/navigation";

// export default function Home() {
//   redirect("/");
// }
"use client";

import Navbar from "@/components/navbar";
import React from "react";
import HeaderSlider from "@/components/ui/header-slider";
import { Card } from "@/components/ui/card";
import { popularProducts } from "@/assets/popular-products";
import Link from "next/link";
import Banner from "@/components/ui/banner";
import Footer from "@/components/ui/footer";
import ProductCard from "@/components/ui/product-card";

export default function Home() {

  return (
    <>
      <Navbar />
      <HeaderSlider />

      <section className="w-11/12 mx-auto py-3">
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex justify-start">
          Popular Products
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {popularProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
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
      </section>
      <Footer />
    </>
  );
}
