"use client";
import { Cell, Pie, PieChart } from "recharts";

const data = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
];
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default function TrafficByDevice() {
  return (
    <>
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-gray-200 dark:border-gray-700">
        <div>
          <h3 className="text-base font-normal text-gray-500 dark:text-gray-400">
            TtrafficByDevice
          </h3>
          <span className="text-2xl font-bold leading-none text-gray-900 sm:text-3xl dark:text-white">
            Desktop
          </span>
        </div>
      </div>
      <div className="w-full flex justify-center">
        <PieChart width={200} height={200}>
          <Pie
            data={data}
            cx={95}
            cy={95}
            innerRadius={80}
            outerRadius={100}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((_entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </div>
      <div className="flex items-center justify-between pt-4 lg:justify-evenly sm:pt-6">
        <div>
          <svg
            className="w-8 h-8 mb-1 text-gray-500 dark:text-gray-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              clipRule="evenodd"
              fillRule="evenodd"
              d="M2 4.25A2.25 2.25 0 014.25 2h11.5A2.25 2.25 0 0118 4.25v8.5A2.25 2.25 0 0115.75 15h-3.105a3.501 3.501 0 001.1 1.677A.75.75 0 0113.26 18H6.74a.75.75 0 01-.484-1.323A3.501 3.501 0 007.355 15H4.25A2.25 2.25 0 012 12.75v-8.5zm1.5 0a.75.75 0 01.75-.75h11.5a.75.75 0 01.75.75v7.5a.75.75 0 01-.75.75H4.25a.75.75 0 01-.75-.75v-7.5z"
            ></path>
          </svg>
          <h3 className="text-gray-500 dark:text-gray-400">Desktop</h3>
          <h4 className="text-xl font-bold dark:text-white">234k</h4>
          <p className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <span className="flex items-center mr-1.5 text-sm text-green-500 dark:text-green-400">
              <svg
                className="w-4 h-4"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  clipRule="evenodd"
                  fillRule="evenodd"
                  d="M10 17a.75.75 0 01-.75-.75V5.612L5.29 9.77a.75.75 0 01-1.08-1.04l5.25-5.5a.75.75 0 011.08 0l5.25 5.5a.75.75 0 11-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0110 17z"
                ></path>
              </svg>
              4%
            </span>
            VersusLastMonth
          </p>
        </div>
        <div>
          <svg
            className="w-8 h-8 mb-1 text-gray-500 dark:text-gray-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path d="M8 16.25a.75.75 0 01.75-.75h2.5a.75.75 0 010 1.5h-2.5a.75.75 0 01-.75-.75z"></path>
            <path
              clipRule="evenodd"
              fillRule="evenodd"
              d="M4 4a3 3 0 013-3h6a3 3 0 013 3v12a3 3 0 01-3 3H7a3 3 0 01-3-3V4zm4-1.5v.75c0 .414.336.75.75.75h2.5a.75.75 0 00.75-.75V2.5h1A1.5 1.5 0 0114.5 4v12a1.5 1.5 0 01-1.5 1.5H7A1.5 1.5 0 015.5 16V4A1.5 1.5 0 017 2.5h1z"
            ></path>
          </svg>
          <h3 className="text-gray-500 dark:text-gray-400">Phone</h3>
          <h4 className="text-xl font-bold dark:text-white">94k</h4>
          <p className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <span className="flex items-center mr-1.5 text-sm text-red-600 dark:text-red-500">
              <svg
                className="w-4 h-4"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  clipRule="evenodd"
                  fillRule="evenodd"
                  d="M10 3a.75.75 0 01.75.75v10.638l3.96-4.158a.75.75 0 111.08 1.04l-5.25 5.5a.75.75 0 01-1.08 0l-5.25-5.5a.75.75 0 111.08-1.04l3.96 4.158V3.75A.75.75 0 0110 3z"
                ></path>
              </svg>
              1%
            </span>
            VersusLastMonth
          </p>
        </div>
        <div>
          <svg
            className="w-8 h-8 mb-1 text-gray-500 dark:text-gray-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              clipRule="evenodd"
              fillRule="evenodd"
              d="M5 1a3 3 0 00-3 3v12a3 3 0 003 3h10a3 3 0 003-3V4a3 3 0 00-3-3H5zM3.5 4A1.5 1.5 0 015 2.5h10A1.5 1.5 0 0116.5 4v12a1.5 1.5 0 01-1.5 1.5H5A1.5 1.5 0 013.5 16V4zm5.25 11.5a.75.75 0 000 1.5h2.5a.75.75 0 000-1.5h-2.5z"
            ></path>
          </svg>
          <h3 className="text-gray-500 dark:text-gray-400">Tablet</h3>
          <h4 className="text-xl font-bold dark:text-white">16k</h4>
          <p className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <span className="flex items-center mr-1.5 text-sm text-red-600 dark:text-red-500">
              <svg
                className="w-4 h-4"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  clipRule="evenodd"
                  fillRule="evenodd"
                  d="M10 3a.75.75 0 01.75.75v10.638l3.96-4.158a.75.75 0 111.08 1.04l-5.25 5.5a.75.75 0 01-1.08 0l-5.25-5.5a.75.75 0 111.08-1.04l3.96 4.158V3.75A.75.75 0 0110 3z"
                ></path>
              </svg>
              0,6%
            </span>
            VersusLastMonth
          </p>
        </div>
      </div>
    </>
  );
}