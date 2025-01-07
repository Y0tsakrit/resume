import React, { useState, useEffect } from 'react';

const Shelf = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/products");
        const data = await response.json();
        console.log(data);
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-row flex-wrap gap-10 m-10">
      {products.map((product, index) => (
        <div key={index} className="flex flex-col items-center gap-2 border border-black rounded-md justify-start w-[150px] h-[200px]">
          <img src={product.image} alt={product.name} className="w-full h-1/2 object-cover" />
          <h1 className="text-xs">{product.name}</h1>
          <h2 className="text-xs">{product.price} Baht</h2>
          <button className="bg-blue-500 text-white p-1 rounded-md text-xs">Buy</button>
        </div>
      ))}
    </div>
  );
};

export default Shelf;