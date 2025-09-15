import React from "react";
import Image from "next/image";

const Banner = () => {
  return (
    <div className="bg-[#E6E9F2] text-black rounded-2xl shadow-lg overflow-hidden mx-auto my-10 max-w-7xl">
      
      <div className="flex flex-col md:flex-row items-center justify-between px-8 py-12">
        
        <div className="text-center md:text-left max-w-xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Level Up Your Buying Experience
          </h1>
          <p className="text-lg text-black mb-6">
            Discover the latest tech products, unbeatable deals, and seamless shopping experience — all in one place.
          </p>
          <button className="bg-white text-orange-600 font-semibold px-6 py-2 rounded-full shadow hover:bg-gray-100 transition">
            Start Shopping
          </button>
        </div>

        <div className="mt-8 md:mt-0">
          <Image
            src='/Apple_iPhone_17_bg.png'
            alt="Shopping Illustration"
            className="mx-auto"
            width={430}
            height={450}
          />
        </div>
        
      </div>
    </div>
  );
};

export default Banner;
