"use client";

import { useState, useMemo } from "react";

import Search from "./search";
import Filter from "./filter";
import { Table } from "./table";
import { Pagination } from "@/components/pagination/pagination";

import { mockProducts } from "../mock-products";

function ProductsList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("");
  console.log("selectedFilter state: ", selectedFilter);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  const filterOptions = mockProducts.reduce<string[]>(
    (accumulator, product, index) => {
      if (index === 0) {
        accumulator.push("All");
      }
      if (!accumulator.includes(product.category)) {
        accumulator.push(product.category);
      }
      return accumulator;
    },
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
      <Table products={currentProducts} />
      <Pagination
        totalNumberOfPages={totalPages}
        currentPage={currentPage}
        changePage={setCurrentPage}
      />
    </div>
  );
}

export default ProductsList;
