// "use client";

// import { useState, useEffect, useMemo } from "react";
// import { useSearchParams } from "next/navigation";

// import { DataTable } from "@/components/ui/data-table";
// import { Pagination } from "@/components/pagination/pagination";
// import { mockProducts } from "../mock-products";
// import { columns } from "./columns";

// function ProductsList() {
//   const searchParams = useSearchParams();

//   const year = searchParams.get("year") || "";
//   const minPrice = parseFloat(searchParams.get("min") || "0");
//   const maxPrice = parseFloat(searchParams.get("max") || "999999");
//   const brand = searchParams.get("brand") || "";
//   const category = searchParams.get("category") || "";

//   const [currentPage, setCurrentPage] = useState(1);
//   const productsPerPage = 10;

//   const filteredProducts = useMemo(() => {
//     return mockProducts.filter((product) => {
//       const matchesYear =
//         year === "" ||
//         new Date(product.meta.createdAt).getFullYear().toString() === year;

//       const matchesMinPrice = product.price >= minPrice;
//       const matchesMaxPrice = product.price <= maxPrice;

//       const matchesBrand =
//         brand === "" || product.brand.toLowerCase() === brand.toLowerCase();

//       const matchesCategory = category === "" ||
//       product.category.toLowerCase() === category.toLowerCase();

//       return matchesYear && matchesMinPrice && matchesMaxPrice && matchesBrand && matchesCategory;
//     });
//   }, [year, minPrice, maxPrice, brand, category]);

//   const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
//   const indexOfLastProduct = currentPage * productsPerPage;
//   const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
//   const currentProducts = filteredProducts.slice(
//     indexOfFirstProduct,
//     indexOfLastProduct
//   );

//   return (
//     <div className="w-full h-full flex flex-col gap-8">
//       <DataTable columns={columns} data={currentProducts} />

//       {totalPages !== 0 && (
//         <Pagination
//           totalNumberOfPages={totalPages}
//           currentPage={currentPage}
//           changePage={setCurrentPage}
//         />
//       )}
//     </div>
//   );
// }

// export default ProductsList;
"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { Pagination } from "@/components/pagination/pagination";
import { mockProducts } from "../mock-products";
import ProductCard from "@/components/ui/product-card";

function ProductsList() {
  const searchParams = useSearchParams();
  const year = searchParams.get("year") || "";
  const minPrice = parseFloat(searchParams.get("min") || "0");
  const maxPrice = parseFloat(searchParams.get("max") || "999999");
  const brand = searchParams.get("brand") || "";
  const category = searchParams.get("category") || "";

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;

  const filteredProducts = useMemo(() => {
    return mockProducts.filter((product) => {
      const matchesYear =
        year === "" ||
        new Date(product.meta.createdAt).getFullYear().toString() === year;

      const matchesMinPrice = product.price >= minPrice;
      const matchesMaxPrice = product.price <= maxPrice;

      const matchesBrand =
        brand === "" ||
        (typeof product.brand === "string" &&
          product.brand.toLowerCase() === brand.toLowerCase());

      const matchesCategory =
        category === "" ||
        product.category.toLowerCase() === category.toLowerCase();

      return (
        matchesYear &&
        matchesMinPrice &&
        matchesMaxPrice &&
        matchesBrand &&
        matchesCategory
      );
    });
  }, [year, minPrice, maxPrice, brand, category]);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  return (
    <div className="w-full h-full flex flex-col gap-8">
      {currentProducts.length === 0 ? (
        <p className="text-center text-gray-600 text-lg mt-10">
          No products found matching your filter criteria.
        </p>
      ) : (
        <>
          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {currentProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages !== 0 && (
            <Pagination
              totalNumberOfPages={totalPages}
              currentPage={currentPage}
              changePage={setCurrentPage}
            />
          )}
        </>
      )}
    </div>
  );
}

export default ProductsList;

