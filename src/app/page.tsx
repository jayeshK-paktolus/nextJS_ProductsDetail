"use client";
import { Navbar } from "../components/navbar";
import Sidebar from "../components/sidebar";
import { Outlet } from "react-router-dom";
import { useState } from "react";

export default function Home() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleClose = () => setIsOpen(false);
  return (
    <div>
      <Navbar open={isOpen} toggleClose={setIsOpen} />
      <div className="flex">
        <Sidebar open={isOpen} onClose={handleClose} />
        <main className="relative overflow-y-auto p-4 md:ml-64 h-auto pt-20 bg-gray-50 dark:bg-gray-900">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
