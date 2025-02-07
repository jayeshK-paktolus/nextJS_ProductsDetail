import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Navbar = ({
  toggleSidebar,
  sidebarOpen,
}: {
  toggleSidebar: () => void;
  sidebarOpen: boolean;
}) => (
  <header>
    <nav className="m-0.5 bg-white border-b border-gray-200 p-2.5 fixed top-0 left-0 right-0 z-50">
      <div className="flex flex-wrap justify-between items-center p-0.5">
        <div className="flex justify-start items-center">
          {!sidebarOpen && (
            <button
              onClick={toggleSidebar}
              className="bg-none border-0 flex items-center mr-4 cursor-pointer"
            >
              <Menu className="text-black text-xl" />
            </button>
          )}
          {sidebarOpen && (
            <button
              onClick={toggleSidebar}
              className="bg-none border-0 flex items-center mr-4 cursor-pointer md:hidden"
            >
              <X className="text-black text-xl" />
            </button>
          )}

          <Link href="/" className="mr-8 flex">
            <Image
              src="/logo.svg"
              alt="Dashboard Logo"
              className="mr-3"
              width={32}
              height={32}
            />
            <span className="text-[1.5rem] font-medium whitespace-nowrap text-black ml-2.5">
              Dashboard
            </span>
          </Link>
        </div>
      </div>
    </nav>
  </header>
);

export default Navbar;
