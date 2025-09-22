"use client";

import { Card } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingCart, Check } from "lucide-react";
import { useCart } from "@/app/context/CartContext";
import { useFav } from "@/app/context/FavContext";
import { toast } from "@/hooks/use-toast";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type Product = {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
};

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { cart, addToCart, removeFromCart } = useCart();
  const { favorites, addToFav, removeFromFav } = useFav();

  const isInCart = cart.some((item) => item.id === product.id);
  const isInFav = favorites.some((item) => item.id === product.id);

  const handleCartToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isInCart) {
      removeFromCart(product.id);
      toast({
        title: "Product Removed from Cart 🗑️",
        description: `${product.title} has been removed from your cart.`,
      });
    } else {
      addToCart({ ...product, quantity: 1 });
      toast({
        title: "Product Added to Cart 🛒",
        description: `${product.title} has been added to your cart.`,
      });
    }
  };

  const handleFavToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isInFav) {
      removeFromFav(product.id);
      toast({
        title: "Product Removed from Favorites 🗑️",
        description: `${product.title} has been removed from your favorites.`,
      });
    } else {
      addToFav(product);
      toast({
        title: "Product Added to Favorites ❤️",
        description: `${product.title} has been added to your favorites.`,
      });
    }
  };

  return (
    <Link href={`/products/${product.id}`} key={product.id} className="block">
      <Card className="hover:shadow-lg transition-transform transform hover:-translate-y-1 flex flex-col w-full max-w-md mx-auto">
        <div className="relative w-full aspect-square overflow-hidden rounded-t-lg bg-gray-200">
          <Image
            src={product.thumbnail}
            alt={product.title}
            fill
            sizes="(max-width: 640px) 100vw, 
                   (max-width: 1024px) 50vw, 
                   33vw"
            className="object-cover"
          />
        </div>

        <h3 className="font-semibold text-base sm:text-lg text-gray-900 mt-2 px-3 sm:px-4">
          {product.title.length > 10 ? (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="cursor-pointer">
                    {product.title.substring(0, 10) + "..."}
                  </span>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{product.title}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : (
            product.title
          )}
        </h3>

        <div className="p-3 sm:p-4 flex justify-between items-center flex-1">
          <p className=" text-orange-600 text-sm sm:text-lg">
            ${product.price}
          </p>

          <div className="flex space-x-1">
            <button
              className="w-9 h-9 sm:w-10 sm:h-10 flex rounded-full items-center justify-center transition bg-white shadow hover:bg-gray-100"
              onClick={handleFavToggle}
            >
              {isInFav ? <Heart color="red" size={18} /> : <Heart size={18} />}
            </button>

            <button
              className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full ${
                isInCart
                  ? "bg-green-500 text-white"
                  : "bg-orange-400 text-white"
              } flex items-center justify-center shadow hover:opacity-90 transition`}
              onClick={handleCartToggle}
            >
              {isInCart ? <Check size={18} /> : <ShoppingCart size={18} />}
            </button>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default ProductCard;
