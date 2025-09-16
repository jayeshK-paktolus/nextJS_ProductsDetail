"use client";

import { useFav } from "@/app/context/FavContext";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/navbar";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { toast } from "@/hooks/use-toast";
import { useCart } from "../context/CartContext";
import { Check, ShoppingCart } from "lucide-react";

type Product = {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
};

const Fav = () => {
  const { favorites, removeFromFav, clearFav } = useFav();
  const { cart, addToCart, removeFromCart } = useCart();

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
              {favorites.map((item) => {
                const isInCart = cart.find((cartItem) => cartItem.id === item.id);
                return (
                  <Card
                    key={item.id}
                    className="hover:shadow-lg transition-transform transform hover:-translate-y-1 flex flex-col"
                  >
                    <div className="relative h-48 w-full overflow-hidden rounded-t-lg bg-gray-200">
                      <Image
                        src={item.thumbnail}
                        alt={item.title}
                        width={500}
                        height={500}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="p-4 flex flex-col flex-1">
                      <h3 className="font-semibold text-lg text-gray-900 mb-2">
                        {item.title}
                      </h3>

                      <p className="font-bold text-orange-600 text-xl mb-4">
                        ${item.price}
                      </p>

                      <Button
                        size="sm"
                        onClick={(e) => {
                          e.preventDefault();
                          handleCartToggle(item);
                        }}
                        className="mt-auto mb-1"
                      >
                        {isInCart ? (
                          <p className="flex items-center justify-betweenify gap-1">
                            <Check size={18} />
                            Added To Cart
                          </p>
                        ) : (
                          <p className="flex items-center justify-betweenify gap-1">
                            <ShoppingCart size={18} />
                            Add To Cart
                          </p>
                        )}
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => {
                          removeFromFav(item.id);
                          toast({
                            title: "Removed from Favorites",
                            description: `${item.title} has been removed from your favorites.`,
                            duration: 3000,
                          });
                        }}
                        className="mt-auto"
                      >
                        Remove
                      </Button>
                    </div>
                  </Card>
                );
              })}
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
