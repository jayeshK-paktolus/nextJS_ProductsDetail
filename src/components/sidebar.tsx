import { cn } from "@/lib/utils";
import { ChartPie, SquareChartGantt, UserRoundCog } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import LanguageSwitcher from "./language-switcher";

const Sidebar = ({ isOpen }: { isOpen: boolean }) => {
  const t = useTranslations("sidebar");
  return (
    <div
      className={cn(
        "fixed z-40 overflow-y-auto p-4 transition-transform left-0 top-0 h-screen pt-14 w-64 -translate-x-full border-r border-gray-200 md:translate-x-0 bg-gray-50",
        { "transform-none": isOpen }
      )}
    >
      <aside>
        <div className="h-full pt-4 pb-4 m-[20px]">
          <ul>
            <li className="hover:bg-gray-100 rounded ">
              <Link
                className="flex items-center p-2 text-gray-800 rounded-lg mb-[-10px] font-bold hover:text-gray-950"
                href="/dashboard"
              >
                <ChartPie className="text-gray-500 transition-colors duration-[75ms] m-2 hover:text-gray-950 " />
                {t("dashboard")}
              </Link>
            </li>
            <li className="hover:bg-gray-100 rounded">
              <Link
                className="flex items-center p-2 text-gray-800 rounded-lg mb-[-10px] font-bold hover:text-gray-950"
                href="/products"
              >
                <SquareChartGantt className="text-gray-500 transition-colors duration-[75ms] m-2 hover:text-gray-950" />
                {t("products")}
              </Link>
            </li>
          </ul>
        </div>
        <div className="absolute bottom-0 left-0 w-full p-4 bg-white flex justify-evenly items-center">
          <Link
            className="inline-flex justify-center p-2 rounded-sm text-gray-500"
            href="/account"
          >
            <UserRoundCog className="h-6" />
          </Link>
          <LanguageSwitcher />
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
