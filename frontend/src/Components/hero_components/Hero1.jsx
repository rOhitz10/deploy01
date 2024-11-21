import React from 'react';
import { GiSevenPointedStar } from "react-icons/gi";
import image from '../../assets/funding.png';

function Hero1() {
  return (
    <div className="min-h-screen bg-slate-200 flex flex-col md:flex-row items-center justify-around p-6 md:p-10 space-y-8 md:space-y-0">
      {/* Left Section */}
      <div className="flex flex-col justify-center space-y-6 md:w-1/2">
        <h1 className="text-3xl md:text-5xl font-bold text-gray-800">
          The Better World, Quam Sed Laudantium
        </h1>
        <p className="text-gray-600 text-lg md:text-xl">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam sed laudantium sequi dicta veritatis nesciunt
          vitae totam vel? Perspiciatis officiis dolorum exercitationem, voluptatibus natus iusto inventore! Fugit ipsum
          quod voluptates modi incidunt laudantium cumque praesentium, exercitationem esse veritatis.
        </p>
        <div className="flex space-x-4">
          <button className="border-2 border-[#ff9a60] text-black font-bold py-2 px-6 rounded-xl transition-all duration-300 hover:bg-[#ff9a60] hover:text-white">
            Get Started
          </button>
          <button className="bg-black text-white font-bold py-2 px-6 rounded-xl transition-all duration-300 hover:bg-[#ff9a60] hover:text-black">
            Learn More
          </button>
        </div>
      </div>

      {/* Right Section */}
      <div className="relative md:w-1/2">
        <img
          className="max-h-[60vh] w-full rounded-xl object-cover shadow-lg transform transition-transform duration-300 hover:scale-105"
          src={image}
          alt="Funding"
        />
      </div>
    </div>
  );
}

export default Hero1;
