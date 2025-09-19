"use client";

import { Product } from "./columns";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Check, Heart } from "lucide-react";
import { useCart } from "@/app/context/CartContext";
import { toast } from "@/hooks/use-toast";
import { useFav } from "@/app/context/FavContext";

interface ProductDetailProps {
  product: Product;
}

function ProductDetail({ product }: ProductDetailProps) {
  const router = useRouter();
  const { removeFromCart, addToCart, cart } = useCart();
  const { addToFav, removeFromFav, favorites } = useFav();
  const [mainImage, setMainImage] = useState(product.thumbnail);
  const [isInCart, setIsInCart] = useState(false);
  const [isInFav, setIsInFav] = useState(false);

  // Check if product is already in cart
  useEffect(() => {
    const itemInCart = cart.find((item) => item.id === product.id);
    setIsInCart(!!itemInCart);
    const itemInFav = favorites.find((item) => item.id === product.id);
    setIsInFav(!!itemInFav);
  }, [cart, favorites, product.id]);

  const handleAddToCart = () => {
    if (isInCart) {
      // Remove from cart
      removeFromCart(product.id);

      toast({
        title: "Product Removed from Cart 🗑️",
        description: `${product.title} has been removed from your cart.`,
        duration: 3000,
      });
    } else {
      // Add to cart
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

  const handleAddToFav = () => {
    if (isInFav) {
      removeFromFav(product.id);

      toast({
        title: "Product Removed from Favorites",
        description: `${product.title} has been removed from your Favorites.`,
        duration: 3000,
      });
    } else {
      // Add to cart
      addToFav({
        id: product.id,
        title: product.title,
        price: product.price,
        thumbnail: product.thumbnail,
      });

      toast({
        title: "Product Added to Favorites",
        description: `${product.title} has been added to your Favorites.`,
        duration: 3000,
      });
    }
  };
  return (
    <div className="w-screen max-w-5xl mx-auto">
      <Button variant="outline" onClick={() => router.back()} className="mb-6">
        ← Back to Products
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div>
          <div className="relative aspect-square rounded-lg overflow-hidden mb-4">
            <Image
              src={mainImage}
              alt={product.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {product.images.slice(0, 4).map((image, index) => (
              <div
                key={index}
                className="relative aspect-square rounded-md overflow-hidden hover:scale-105 transition-transform cursor-pointer"
                onClick={() => setMainImage(image)}
              >
                <Image
                  src={image}
                  alt={`${product.title} ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
          <div className="flex mt-4 gap-2">
            <Button onClick={handleAddToFav}>
                        {isInFav ? (
                          <Heart color="red" size={18} />
                        ) : (
                          <Heart size={18} />
                        )}
            </Button>
            <Button
              disabled={product.stock === 0}
              className="w-full flex items-center justify-center gap-2"
              onClick={handleAddToCart}
            >
              {isInCart ? (
                <>
                  <Check size={18} />
                  Added to Cart
                </>
              ) : product.stock > 0 ? (
                "Add to Cart"
              ) : (
                "Out of Stock"
              )}
            </Button>
          </div>
        </div>

        <div>
          <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
          <p className="text-muted-foreground mb-4">{product.brand}</p>

          <div className="flex items-center mb-4">
            <div className="flex items-center mr-4">
              <span className="text-2xl font-bold">${product.price}</span>
              {product.discountPercentage > 0 && (
                <span className="ml-2 text-sm text-green-600 line-through">
                  $
                  {(
                    product.price /
                    (1 - product.discountPercentage / 100)
                  ).toFixed(2)}
                </span>
              )}
            </div>
            {product.discountPercentage > 0 && (
              <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                {product.discountPercentage}% OFF
              </span>
            )}
          </div>

          <div className="flex items-center mb-6">
            <div className="flex items-center mr-4">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.floor(product.rating)
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="ml-2 text-gray-600 dark:text-gray-400">
                {product.rating}
              </span>
            </div>

            <span
              className={`text-sm font-medium ${
                product.stock > 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
            </span>
          </div>

          <p className="text-gray-700 mb-6">{product.description}</p>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Category</h3>
              <p className="capitalize">
                {product.category.split("-").join(" ")}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Brand</h3>
              <p>{product.brand}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Warranty</h3>
              <p>{product.warrantyInformation}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">
                Return Policy
              </h3>
              <p>{product.returnPolicy}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 mt-8">
            <h3 className="text-sm font-medium text-gray-500">
              Product Reviews
            </h3>
            {product.reviews.map((review, index) => (
              <div
                key={index}
                className="p-4 border rounded shadow-sm hover:scale-105 transition-transform cursor-pointer"
              >
                <div className="font-semibold">{review.reviewerName}</div>
                <div className="text-sm text-gray-500">
                  {new Date(review.date).toLocaleDateString()}
                </div>
                <div className="mt-2">Rating: {review.rating} ⭐</div>
                <div className="mt-1">{review.comment}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
