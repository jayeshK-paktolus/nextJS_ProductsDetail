"use client";

import { ReactNode, useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Navbar from "@/components/navbar";
import {Slider} from "@/components/ui/slider";
function Layout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [year, setYear] = useState(searchParams.get("year") || "");
  const [minPrice, setMinPrice] = useState<number>(parseInt(searchParams.get("min") || "0"));
  const [maxPrice, setMaxPrice] = useState<number>(parseInt(searchParams.get("max") || "2000"));
  const [brand, setBrand] = useState(searchParams.get("brand") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "");

  const handleFilterChange = useCallback(() => {
  const params = new URLSearchParams();

  if (year) params.set("year", year);
  if (minPrice !== 0) params.set("min", minPrice.toString());
  if (maxPrice !== 2000) params.set("max", maxPrice.toString());
  if (brand) params.set("brand", brand);
  if (category) params.set("category", category);

  router.replace(`?${params.toString()}`);
}, [year, minPrice, maxPrice, brand, category, router]);

  useEffect(() => {
    handleFilterChange();
  }, [handleFilterChange]);

  return (
    <>
      <Navbar />
      <div className="flex mt-16">
        <aside className="w-1/5 bg-gray-100 min-h-screen p-4 space-y-4">
          <h2 className="font-semibold text-lg">Filters</h2>

          <div>
            <label className="block font-medium">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-1 border rounded"
            >
              <option value="">All</option>
              <option value="smartphones">Smartphones</option>
              <option value="laptops">Laptops</option>
              <option value="tablets">Tablets</option>
            </select>
          </div>

          <div>
            <label className="block font-medium">Year</label>
            <select
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="w-full p-1 border rounded"
            >
              <option value="">All</option>
              <option value="2023">2023</option>
              <option value="2024">2024</option>
              <option value="2025">2025</option>
            </select>
          </div>

          <div>
            <label className="block font-medium mb-2">Price Range</label>
            <Slider
              value={[minPrice, maxPrice]}
              min={0}
              max={2000}
              step={10}
              onValueChange={(value) => {
                setMinPrice(value[0]);
                setMaxPrice(value[1]);
              }}
            />
            <div className="flex justify-between mt-2 text-sm text-gray-600">
              <span>Min: ${minPrice}</span>
              <span>Max: ${maxPrice}</span>
            </div>
          </div>

          <div>
            <label className="block font-medium">Brand</label>
            <select
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className="w-full p-1 border rounded"
            >
              <option value="">All</option>
              <option value="Apple">Apple</option>
              <option value="Samsung">Samsung</option>
              <option value="Sony">Sony</option>
              <option value="Realme">Realme</option>
              <option value="Oppo">Oppo</option>
            </select>
          </div>
        </aside>

        <main className="flex-1 p-6">{children}</main>
      </div>
    </>
  );
}

export default Layout;
