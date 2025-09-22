import { assets } from "@/assets/assets";
import Navbar from "@/components/navbar";
import AboutSlider from "@/components/ui/about-slider";
import Footer from "@/components/ui/footer";
import Image from "next/image";
import React from "react";

const AboutUs = () => {
  return (
    <>
      <Navbar />
      <div className="w-full mx-auto mt-12">
        <div className="bg-[#E6E9F2] w-full flex flex-col-reverse md:flex-row items-center justify-between px-6 py-8 md:py-12 md:px-12">
          <div className="w-full md:w-1/2 space-y-4 md:pr-6 text-center md:text-left">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
              About Us
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600">
              lorem ipsum company and culture are a lot like our product. They
              are crafted, not cobbled, for a delightful experience.
            </p>
          </div>

          <div className="w-full md:w-1/2 flex justify-center">
            <Image
              className="rounded-2xl w-full max-w-[450px] h-auto"
              src={assets.Hubspotters}
              alt="About Us Image"
              width={450}
              height={300}
            />
          </div>
        </div>

        <div className="w-11/12 mt-12 mx-auto flex flex-col-reverse md:flex-row gap-8 md:gap-12 items-center">
          <div className="w-full md:w-1/2 flex justify-center">
            <Image
              src={assets.grow_better}
              alt="Grow Better"
              width={480}
              height={700}
              className="rounded-2xl w-full max-w-[480px] h-auto"
            />
          </div>

          <div className="w-full md:w-1/2 flex flex-col space-y-4 text-center md:text-left">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
              Our Mission: Helping Millions of Organizations Grow Better
            </h2>
            <p className="text-base sm:text-lg text-gray-600">
              We believe not just in growing bigger, but in growing better. And
              growing better means aligning the success of your own business
              with the success of your customers. Win-win!
            </p>
          </div>
        </div>

        <div className="w-full mt-20 bg-[#E6E9F2] py-12 flex flex-col items-center px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-10 text-center">
            Our Numbers
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            {[
              { image: assets.TeamConnection, text: "700+ Employees" },
              { image: assets.customers, text: "268,000+ Customers" },
              { image: assets.Global_Connection, text: "15+ Global Offices" },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow p-6 flex flex-col items-center w-full max-w-[280px] mx-auto"
              >
                <Image
                  src={item.image}
                  alt={`Stat ${index + 1}`}
                  width={200}
                  height={200}
                  className="rounded-xl w-full h-auto"
                />
                <p className="mt-4 text-base sm:text-lg font-semibold text-gray-700 text-center">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full mt-10 py-12 flex flex-col items-center px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-10 text-center">
            Growing Better Together
          </h2>
          <AboutSlider />
        </div>
      </div>

      <Footer />
    </>
  );
};

export default AboutUs;
