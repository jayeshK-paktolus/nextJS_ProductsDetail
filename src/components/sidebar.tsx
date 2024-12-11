import Link from "next/link";
import { ChartPie, SquareChartGantt, UserRoundCog } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const Sidebar = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <div
      className={`${"w-64 h-screen pt-8 border-r border-gray-300 fixed top-0 left-0 transition-transform duration-300 ease-in-out"} ${
        isOpen ? "transform translate-x-0" : "transform -translate-x-full"
      }`}
    >
      <aside>
        <div className="h-full pt-4 pb-4 m-[20px]">
          <ul>
            <li className="hover:bg-gray-100 rounded ">
              <Link
                className="flex items-center p-2 text-gray-800 rounded-lg mb-[-10px] font-bold hover:text-gray-950"
                href="/"
              >
                <ChartPie className="text-gray-500 transition-colors duration-[75ms] m-2 hover:text-gray-950 " />
                Dashboard
              </Link>
            </li>
            <li className="hover:bg-gray-100 rounded">
              <Link
                className="flex items-center p-2 text-gray-800 rounded-lg mb-[-10px] font-bold hover:text-gray-950"
                href="/products"
              >
                <SquareChartGantt className="text-gray-500 transition-colors duration-[75ms] m-2 hover:text-gray-950" />
                Products
              </Link>
            </li>
          </ul>
        </div>
        <div className="absolute bottom-0 left-0 w-full p-4 bg-white flex justify-center">
          <Link
            className="inline-flex justify-center p-2 rounded-sm text-gray-500"
            href="/user/me"
          >
            <UserRoundCog className="h-6" />
          </Link>
          <div>
            <Select>
              <SelectTrigger className="max-w-[5rem] ml-5 border border-gray-300 rounded-sm">
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
    </div>
  );
};

export default Sidebar;
