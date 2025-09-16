"use client";

import { useCart } from "@/app/context/CartContext";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/navbar";
import { Card } from "@/components/ui/card";
import Image from "next/image";

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useCart();

  return (
    <>
      <Navbar />

      <section className="w-11/12 mx-auto py-3 mt-16">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">Your Cart</h1>

        {cart.length === 0 ? (
          <p className="text-center text-gray-600 text-lg">
            Your cart is empty.
          </p>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {cart.map((item) => (
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
                      variant="destructive"
                      size="sm"
                      onClick={() => removeFromCart(item.id)}
                      className="mt-auto"
                    >
                      Remove
                    </Button>
                  </div>
                </Card>
              ))}
            </div>

            <div className="mt-8 text-center">
              <Button variant="outline" onClick={clearCart}>
                Clear Cart
              </Button>
            </div>
          </>
        )}
      </section>
    </>
  );
};

export default Cart;
