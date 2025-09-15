"use client";

import { ColumnDef } from "@tanstack/react-table";
import { useRouter } from "next/navigation";

export type Review = {
  rating:number,
  comment : string,
  reviewerName: string,
  reviewerEmail: string,
  date: string
}

export type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
  warrantyInformation: string;
  returnPolicy:string;
  reviews: Review[];
};

export const columns: ColumnDef<Product>[] = [
  {
  accessorKey: "title",
  header: "Title",
  cell: ({ row }) => {
    const product = row.original;

    // Child component can use hooks
    const TitleButton = () => {
      const router = useRouter();
      return (
        <button
          onClick={() => router.push(`/products/${product.id}`)}
          className="text-blue-600 hover:text-blue-800 hover:underline text-left"
        >
          {product.title}
        </button>
      );
    };

    return <TitleButton />;
  },
},
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const price = parseInt(row.getValue("price"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(price);
      return formatted;
    },
  },
  {
    accessorKey: "stock",
    header: "Stock",
  },
  {
    accessorKey: "brand",
    header: "Brand",
  },
  {
    accessorKey: "warrantyInformation",
    header: "Warranty",
  },
  {
    accessorKey:'returnPolicy',
    header:'Return Policy'
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => {
      const category = row.getValue("category") as string;
      const altered = category.split("-").join(" ");
      return altered;
    },
  },
];