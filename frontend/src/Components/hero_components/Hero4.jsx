import React, { useState, useEffect } from "react";
import { FaAirbnb } from "react-icons/fa";
import Marque from "../Marque";


const Card = ({ icon, title, description }) => {
  const [isHovered, setisHovered] = useState(false);

  const handleMouseOver = () => {
    setisHovered(true);
  };

  const handleMouseOut = () => {
    setisHovered(false);
  };

  return (
    <div
      className={`relative flex flex-col items-center justify-center p-8 rounded-md shadow-lg transition-all duration-300 ease-in-out ${
        isHovered ? "scale-105" : "scale-100"
      }`}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      <div className="w-16 h-16 rounded-full flex items-center justify-center bg-gray-100">
        {icon}
      </div>
      <h3 className="mt-6 text-2xl font-bold text-gray-800">{title}</h3>
      <p className="mt-2 text-gray-600 text-center">{description}</p>
    </div>
  );
};

function Hero4(){
  return (
    <div className=" text-white min-h-screen p-8">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4 text-black">Help'n'Groww</h1>
        <p className="text-lg mb-8 text-black">
         Lorem ipsum dolor sit amet consectetur, adipisicing elit. Beatae ipsum odio nobis velit mollitia doloremque consectetur impedit ducimus vero, quisquam repellat, obcaecati aut ex sint labore autem nisi, eius officia placeat? Necessitatibus deleniti nesciunt minus fugit quisquam. Doloremque deserunt ape.
        </p>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md">
          Discover Enterprise
        </button>
      </div>
      <div className="container mx-auto mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <Card
          icon={<FaAirbnb  className=" fill-blue-500"/>}
          title="A scalable, reliable platform"
          description="Scale your traffic, content, and site performance to match your business - without worrying about reliability."
        />
        <Card
         
          title="Advanced collaboration"
          description="Build and launch sites quickly - and safely - with powerful features designed to help large teams collaborate."
        />
        <Card
     
          title="Dedicated, tailored support"
          description="From implementation support to in-the-moment troubleshooting, we're here to offer personalized help."
        />
        <Card
          title="Security and compliance"
          description="Launch with peace of mind thanks to Webflow's robust security and compliance features and reliable hosting infrastructure."
        />
      </div>
   
    </div>
  );
};

export default Hero4;