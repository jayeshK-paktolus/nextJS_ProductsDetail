import Bars from "./icons/Bars";
import Close from "./icons/Close";
import Link from "next/link";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";

export type NavbarProps = {
  toggleClose: (open: boolean) => void;
  open?: boolean;
};

const Navbar = ({ open, toggleClose }: NavbarProps) => (
  <header>
    <nav className="bg-white border-b border-gray-200 px-4 py-2.5 dark:bg-gray-800 dark:border-gray-700 fixed left-0 right-0 top-0 z-50">
      <div className="flex flex-wrap justify-between items-center">
        <div className="flex justify-start items-center">
          <Button
            className="p-2 md:hidden mb-0"
            onClick={() => toggleClose(!open)}
          >
            {open ? <Close /> : <Bars />}
          </Button>
          <Link href="/" className="flex mr-4">
            <img src="/vite.svg" className="mr-3 h-8" alt="Dashboard Logo" />
            <span className="self-center text-2xl font-semibold  whites  pace-nowrap dark:text-white">
              Dashboard
            </span>
          </Link>
        </div>
        <div className="flex items-center lg:order-2">
          {/* <Avatar
            className="w-8 h-8"
            src="https://picsum.photos/id/1025/150/150"
            alt="user photo"
          /> */}
          <Avatar className="w-6 h-6">
            <AvatarImage
              src="https://picsum.photos/id/1025/150/150"
              alt="user photo"
            />
          </Avatar>
        </div>
      </div>
    </nav>
  </header>
);

export { Navbar };
