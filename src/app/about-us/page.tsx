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
      <div className="min-w-full mx-auto mt-12">
        <div className="bg-[#E6E9F2] w-full flex flex-col-reverse md:flex-row items-center justify-between px-6 py-6">
          <div className="w-5/12">
            <h2 className="text-3xl font-bold text-gray-800">About Us</h2>
            <p className="text-xl my-2 text-gray-600">
              lorem ipsum company and culture are a lot like our product. They
              are crafted, not cobbled, for a delightful experience.
            </p>
          </div>
          <div>
            <Image
              className="rounded-2xl"
              src={assets.Hubspotters}
              alt="image"
              width={450}
              height={300}
            />
          </div>
        </div>
        <div className="w-11/12 mt-7 mx-auto justify-between items-center flex flex-col-reverse md:flex-row gap-12">
          <div className="flex-shrink-0">
            <Image
              src={assets.grow_better}
              alt="image"
              width={480}
              height={700}
              className="rounded-2xl"
            />
          </div>
          <div className="flex flex-col space-y-4">
            <h2 className="text-2xl font-bold text-gray-800">
              Our Mission: Helping Millions of Organizations Grow Better
            </h2>
            <p className="text-gray-600">
              We believe not just in growing bigger, but in growing better. And
              growing better means aligning the success of your own business
              with the success of your customers. Win-win!
            </p>
          </div>
        </div>
        <div className="min-w-full mt-20 bg-[#E6E9F2] py-12 flex flex-col items-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-10">
            Our Numbers
          </h2>

          <div className="flex flex-col md:flex-row gap-20 justify-center items-center">
            {[
              { image: assets.TeamConnection, text: "700+ Employees" },
              { image: assets.customers, text: "268,000+ Customers" },
              { image: assets.Global_Connection, text: "15+ Global Offices" },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow p-4 flex flex-col items-center w-72"
              >
                <Image
                  src={item.image}
                  alt={`Stat ${index + 1}`}
                  width={200}
                  height={200}
                  className="rounded-xl"
                />
                <p className="mt-4 text-lg font-semibold text-gray-700 text-center">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="min-w-full mt-5 py-12 flex flex-col items-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-10">
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
