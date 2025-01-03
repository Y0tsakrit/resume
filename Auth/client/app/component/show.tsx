import React, { useState, useEffect } from "react";

const images = [
    "/assets/cpu.jpg",
    "/assets/gpu.jpg",
];

const Show = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
    const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 1000);

    }, []);

  return (
    <div className="w-full flex justify-center items-center">
      <img
        className="w-full h-[500px] object-cover"
        src={images[currentIndex]}
      />
    </div>
  );
};

export default Show;