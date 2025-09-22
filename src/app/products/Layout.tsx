"use client";

import { ReactNode, useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Navbar from "@/components/navbar";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

function Layout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [year, setYear] = useState(searchParams.get("year") || "");
  const [minPrice, setMinPrice] = useState<number>(
    parseInt(searchParams.get("min") || "0")
  );
  const [maxPrice, setMaxPrice] = useState<number>(
    parseInt(searchParams.get("max") || "2000")
  );
  const [brand, setBrand] = useState<string>(searchParams.get("brand") || "");
  const [category, setCategory] = useState<string>(
    searchParams.get("category") || ""
  );
  const [showFilters, setShowFilters] = useState<boolean>(false);

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

  const handleShowFilters = () => {
    setShowFilters(!showFilters);
  };

  const clearAllFilters = () => {
    setYear("");
    setMinPrice(0);
    setMaxPrice(2000);
    setBrand("");
    setCategory("");
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col md:flex-row mt-16">
        <div className="md:hidden flex justify-end px-4 mt-4">
          <Button onClick={handleShowFilters}>
            {showFilters ? "Hide Filters" : "show Filters"}
          </Button>
        </div>
        <aside
          className={`${
            showFilters ? "block" : "hidden"
          } md:block w-full md:w-1/5 bg-gray-100 p-4 space-y-4`}
        >
          <h2 className="font-semibold text-lg">Filters</h2>

          <div className="flex items-center space-x-2">
            <div className="flex-1">
              <label className="block font-medium mb-1">Category</label>
              <Select
                value={category}
                onValueChange={(value) => setCategory(value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="smartphones">Smartphones</SelectItem>
                  <SelectItem value="laptops">Laptops</SelectItem>
                  <SelectItem value="tablets">Tablets</SelectItem>
                  <SelectItem value="mens-watches">Mens Watches</SelectItem>
                  <SelectItem value="sports-accessories">
                    Sports Accessories
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="mt-6">
              {category && (
                <Button size="icon" onClick={() => setCategory("")}>
                  &times;
                </Button>
              )}
            </div>
          </div>

          {/* Year Filter */}
          <div className="flex items-center space-x-2">
            <div className="flex-1">
              <label className="block font-medium mb-1">Year</label>
              <Select value={year} onValueChange={(value) => setYear(value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="All Years" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2023">2023</SelectItem>
                  <SelectItem value="2024">2024</SelectItem>
                  <SelectItem value="2025">2025</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="mt-6">
              {year && (
                <Button size="icon" onClick={() => setYear("")}>
                  &times;
                </Button>
              )}
            </div>
          </div>

          <div className="flex flex-col">
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
            <div className="flex justify-between mt-2 text-sm text-gray-600 items-center">
              <span>Min: ${minPrice}</span>
              <span>Max: ${maxPrice}</span>
              {(minPrice !== 0 || maxPrice !== 2000) && (
                <Button
                  size="icon"
                  onClick={() => {
                    setMinPrice(0);
                    setMaxPrice(2000);
                  }}
                >
                  &times;
                </Button>
              )}
            </div>
          </div>

          {/* Brand Filter */}
          <div className="flex items-center space-x-2">
            <div className="flex-1">
              <label className="block font-medium mb-1">Brand</label>
              <Select value={brand} onValueChange={(value) => setBrand(value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="All Brands" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Apple">Apple</SelectItem>
                  <SelectItem value="Samsung">Samsung</SelectItem>
                  <SelectItem value="Sony">Sony</SelectItem>
                  <SelectItem value="Realme">Realme</SelectItem>
                  <SelectItem value="Oppo">Oppo</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="mt-6">
              {brand && (
                <Button size="icon" onClick={() => setBrand("")}>
                  &times;
                </Button>
              )}
            </div>
          </div>
          <Button
            variant="destructive"
            onClick={clearAllFilters}
            className="w-full"
          >
            Clear All Filters
          </Button>
        </aside>

        <main className="flex-1 p-6">{children}</main>
      </div>
    </>
  );
}

export default Layout;
