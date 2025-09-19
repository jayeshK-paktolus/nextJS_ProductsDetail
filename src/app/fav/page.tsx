"use client";

import { useFav } from "@/app/context/FavContext";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/navbar";
import ProductCard from "@/components/ui/product-card";

const Fav = () => {
  const { favorites, clearFav } = useFav();

  return (
    <>
      <Navbar />

      <section className="w-11/12 mx-auto py-3 mt-16">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">
          Favorite Products
        </h1>

        {favorites.length === 0 ? (
          <p className="text-center text-gray-600 text-lg">
            No favorite products yet.
          </p>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {favorites.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>

            <div className="mt-8 text-center">
              <Button variant="outline" onClick={clearFav}>
                Clear All Favorites
              </Button>
            </div>
          </>
        )}
      </section>
    </>
  );
};

export default Fav;
