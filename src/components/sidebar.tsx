import React from "react";

import { cn } from "../lib/utils";
import ChartPie from "./icons/ChartPie";
import RectangleList from "./icons/RectangleList";
import { AccountSettings } from "./icons/UserSettings";
import { Drawer } from "./ui/drawer";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  onClose: () => void;
  open?: boolean;
}

const Sidebar = React.forwardRef<HTMLDivElement, SidebarProps>(
  ({ className, ...props }, ref) => (
    <Drawer
      ref={ref}
      className={cn(
        "pt-14 w-64 -translate-x-full border-r border-gray-200 md:translate-x-0 dark:border-gray-700 bg-gray-50 dark:bg-gray-800",
        className
      )}
      {...props}
    >
      <aside
        aria-label="Sidebar"
        className="mt-[50px] px-[15px] py-[5px]px-[15px] py-[5px] w-[20%] h-[93vh] flex border border-gray-200 dark:border-gray-700 dark:bg-gray-800 bg-[#F9FAFB]"
      >
        <div className="flex flex-col w-full h-full">
          <div className="h-full py-4 overflow-y-auto">
            <ul className="space-y-2 font-medium">
              <li>
                <Link href="/">
                  <div className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                    <ChartPie className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                    <span className="ms-3">Dashboard</span>
                  </div>
                </Link>
              </li>
              <li>
                <Link href="/products">
                  <div className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                    <RectangleList className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                    <span className="ms-3">Products</span>
                  </div>
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex items-center justify-center p-4 space-x-4 w-full mt-auto">
            <Link href="/account" passHref>
              <div className="inline-flex justify-center p-2 rounded text-gray-500 dark:text-gray-400 dark:hover:text-white hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-600 border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                <AccountSettings className="h-6 w-6" />
              </div>
            </Link>
            <Select>
              <SelectTrigger className="w-[60px]">
                <SelectValue placeholder="en" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">en</SelectItem>
                <SelectItem value="es">es</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </aside>
    </Drawer>
  )
);

Sidebar.displayName = "Sidebar";

export default Sidebar;
