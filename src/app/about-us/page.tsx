import Navbar from "@/components/navbar";
import React from "react";

const AboutUs = () => {
  return (
    <>
      <Navbar />
      <div className="w-11/12 mx-auto mt-20">
        <h1 className="text-3xl">About Us</h1>
        <p>
          We are a leading e-commerce platform offering a wide range of
          products.
        </p>
      </div>
    </>
  );
};

export default AboutUs;
