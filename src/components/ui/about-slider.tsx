"use client";

import React, { useState, useEffect } from "react";
import Image, { StaticImageData } from "next/image";
import { assets } from "@/assets/assets";
import { ArrowRight } from "lucide-react";

type Slide = {
  id: number;
  title: string;
  buttonText1: string;
  buttonText2: string;
  imgSrc: string | StaticImageData;
};

const sliderData: Slide[] = [
  {
    id: 1,
    title: "We are responsible for business report",
    buttonText1:
      "Progress and key data on our journey to build a company future generations would be proud of.",
    buttonText2: "Read the report",
    imgSrc: assets.business_report,
  },
  {
    id: 2,
    title: "Careers at workplace",
    buttonText1:
      "If you're ready to grow your career and help millions of organizations grow better, you've come to the right place. Employees can choose to work from one of our offices across the globe, fully remotely, or a mix of the two",
    buttonText2: "Learn more",
    imgSrc: assets.careers,
  },
];

const AboutSlider = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderData.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleSlideChange = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="overflow-hidden relative w-11/12 mx-auto rounded-xl">
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{
          transform: `translateX(-${currentSlide * 100}%)`,
        }}
      >
        {sliderData.map((slide, index) => (
          <div
            key={slide.id}
            className="flex flex-col md:flex-row items-center justify-between bg-[#E6E9F2] py-10 px-6 md:px-14 rounded-xl min-w-full"
          >
            <div className="md:w-1/2 text-center md:text-left">
              <h1 className="text-3xl md:text-4xl font-semibold text-gray-800">
                {slide.title}
              </h1>

              <p className="mt-4 text-gray-600 leading-relaxed">
                {slide.buttonText1}
              </p>

              <button className="mt-6 inline-flex items-center gap-2 px-5 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition">
                {slide.buttonText2}
                <ArrowRight size={20} />
              </button>
            </div>

            {/* Image */}
            <div className="md:w-1/2 flex justify-center mt-8 md:mt-0">
              <Image
                src={slide.imgSrc}
                alt={`Slide ${index + 1}`}
                width={400}
                height={300}
                className="rounded-lg object-cover"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Dots */}
      <div className="flex items-center justify-center gap-3 mt-6">
        {sliderData.map((_, index) => (
          <button
            key={index}
            onClick={() => handleSlideChange(index)}
            className={`h-3 w-3 rounded-full transition-colors ${
              currentSlide === index ? "bg-orange-600" : "bg-gray-400"
            }`}
            aria-label={`Slide ${index + 1}`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default AboutSlider;
