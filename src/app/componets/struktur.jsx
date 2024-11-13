"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Struktur({ products }) {
  const [cart, setCart] = useState([]);
  const [category, setCategory] = useState('all');

  function addBasket(product) {
    const newProduct = {
      id: crypto.randomUUID(),
      title: product.title,
      price: product.price,
    };
    setCart([newProduct, ...cart]);
  }
  
  const filteredProducts = category === 'all' 
    ? products 
    : products.filter(product => product.category === category);

  
  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  return (
    <div>
      <div className="bg-black p-4">
        <label htmlFor="category-select" className="text-white">
          Choose a category
        </label>
        <select
          id="category-select"
          className="bg-gray-800 text-white p-2"
          value={category}
          onChange={handleCategoryChange}
        >
          <option value="all">All</option>
          <option value="beauty">Beauty</option>
          <option value="fragrances">Fragrances</option>
          <option value="furniture">Furniture</option>
          <option value="groceries">Groceries</option>
        </select>
      </div>

      <div className="grid grid-cols-[3fr_1fr] min-h-screen">
        <div className="grid grid-cols-3 items-center justify-items-center p-8 pb-20 gap-16 font-[family-name:var(--font-geist-sans)]">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div key={product.id} className="p-3 rounded-lg shadow-sm bg-gray-50">
                <Image src={product.thumbnail} width={250} height={250} alt={product.title} />
                <Link className="text-black" href={`/detaljer/${product.id}`}>
                  {product.title}
                </Link>
                <Form addBasket={addBasket} product={product} />
              </div>
            ))
          ) : (
            <p className="text-center text-white">No products available in this category.</p>
          )}
        </div>
        
        <Cartlist cart={cart} />
      </div>
    </div>
  );
}

function Form({ addBasket, product }) {
  return (
    <button onClick={() => addBasket(product)} className=" bg-sky-950">
      Læg i Kurv
    </button>
  );
}

function Cartlist({ cart }) {
  return (
    <div className="p-8  bg-sky-950">
      <h2 className="text-2xl mb-4">Indkøbskurv</h2>
      <ul>
        {cart.map((item) => (
          <li key={item.id}>
            <span>{item.title}</span> - <span>{item.price}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
