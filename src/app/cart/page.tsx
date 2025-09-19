"use client";

import { useCart } from "@/app/context/CartContext";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/navbar";
import ProductCard from "@/components/ui/product-card";

const Cart = () => {
  const { cart, clearCart } = useCart();

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
                <ProductCard key={item.id} product={item} />
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
