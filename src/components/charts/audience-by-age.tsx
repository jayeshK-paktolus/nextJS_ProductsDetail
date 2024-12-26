"use client";
import { Line, LineChart, ResponsiveContainer } from "recharts";
import data from "./data.json";

export default function AudienceByAge() {
  return (
    <div className="w-full">
      <h3 className="mb-2 text-base font-normal text-gray-500 dark:text-gray-400">
        AudienceByAge
      </h3>
      <div className="w-full h-28">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart width={300} height={100} data={data}>
            <Line
              type="monotone"
              dataKey="pv"
              stroke="#8884d8"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
