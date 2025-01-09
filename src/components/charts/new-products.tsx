"use client";
import { Bar, BarChart, ResponsiveContainer } from "recharts";
import data from "./data.json";

export default function NewProducts() {
  return (
    <>
      <div className="w-full">
        <h3 className="text-base font-normal text-gray-500 dark:text-gray-400">
          New products
        </h3>
        <span className="text-2xl font-bold leading-none text-gray-900 sm:text-3xl dark:text-white">
          2,340
        </span>
        <p className="flex items-center text-base font-normal text-gray-500 dark:text-gray-400">
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
            12.5%
          </span>
          sinceLastMonth
        </p>
      </div>
      <div className="w-full h-24">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart width={150} height={40} data={data}>
            <Bar dataKey="uv" fill="#8884d8" isAnimationActive={false} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}
