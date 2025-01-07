"use client";

import { useState, useMemo } from "react";

import Search from "./search";
import Filter from "./filter";
import { DataTable } from "./data-table";
import { Pagination } from "@/components/pagination/pagination";

import { mockProducts } from "../mock-products";
import { columns } from "./columns";

function ProductsList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  const filterOptions = useMemo(
    () => [
      "All",
      ...Array.from(new Set(mockProducts.map((product) => product.category))),
    ],
    []
  );

  const filteredProducts = useMemo(() => {
    return mockProducts.filter((product) => {
      const matchesSearchQuery = product.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesSelectedFilter =
        product.category.toLowerCase() === selectedFilter ||
        selectedFilter === "all" ||
        selectedFilter === "";

      return matchesSearchQuery && matchesSelectedFilter;
    });
  }, [searchQuery, selectedFilter]);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const handleSearchQuery = (value: string) => {
    setSearchQuery(value);
  };

  const handleFilterChange = (value: string) => {
    setCurrentPage(1);
    setSelectedFilter(value);
  };

  return (
    <div className="w-full h-full  flex flex-col gap-8">
      <div className="flex gap-4">
        <Filter
          options={filterOptions}
          selected={selectedFilter}
          handleChange={handleFilterChange}
        />
        <Search handleChange={handleSearchQuery} />
      </div>

      <DataTable columns={columns} data={currentProducts} />

      {totalPages !== 0 && (
        <Pagination
          totalNumberOfPages={totalPages}
          currentPage={currentPage}
          changePage={setCurrentPage}
        />
      )}
    </div>
  );
}

export default ProductsList;
