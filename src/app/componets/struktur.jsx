"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Struktur({ products }) {
  const [cart, setCart] = useState([]);
  const [category, setCategory] = useState("all");

  function addBasket(product) {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.title === product.title);

      if (existingProduct) {
        // Hvis produktet allerede findes, opdater mængden
        return prevCart.map((item) => (item.title === product.title ? { ...item, quantity: item.quantity + 1 } : item));
      } else {
        // Ellers tilføj produktet med quantity 1
        return [
          ...prevCart,
          {
            id: crypto.randomUUID(),
            title: product.title,
            price: product.price,
            thumbnail: product.thumbnail,
            quantity: 1,
          },
        ];
      }
    });
  }

  function deleteProduct(id) {
    setCart(cart.filter((item) => item.id !== id));
  }

  const filteredProducts = category === "all" ? products : products.filter((product) => product.category === category);

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  return (
    <div>
      <div>
        <div className="grid grid-cols-[3fr_1fr] min-h-screen">
          <div className="py-5">
            <div className="bg-white px-4">
              <label htmlFor="category-select" className="text-black">
                <b>FILTER</b>
              </label>
              <select id="category-select" className="bg-custom-green text-white mx-4" value={category} onChange={handleCategoryChange}>
                <option value="all">All</option>
                <option value="beauty">Beauty</option>
                <option value="fragrances">Fragrances</option>
                <option value="furniture">Furniture</option>
                <option value="groceries">Groceries</option>
              </select>
            </div>
            <div className="grid sm:grid-cols-2 grid-cols-1 lg:grid-cols-3 items-center justify-items-center p-8 pb-20 gap-16 font-[family-name:var(--font-geist-sans)]">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <div key={product.id} className="p-3 rounded-lg shadow-sm flex flex-col gap-1">
                    <a href={`/detaljer/${product.id}`}>
                      <Image src={product.thumbnail} width={250} height={250} alt={product.title} />
                    </a>
                    <Link className="text-black" href={`/detaljer/${product.id}`}>
                      <b>{product.title}</b>
                    </Link>
                    <span className="text-black">{product.price} Kr</span>
                    <Form addBasket={addBasket} product={product} />
                  </div>
                ))
              ) : (
                <p className="text-center text-white">No products available in this category.</p>
              )}
            </div>
          </div>
          <Cartlist cart={cart} deleteProduct={deleteProduct} />
        </div>
      </div>
    </div>
  );
}

function Form({ addBasket, product }) {
  return (
    <button onClick={() => addBasket(product)} className="text-white p-2 rounded-lg text-sm md:text-base bg-custom-green w-fit">
      Læg i Kurv
    </button>
  );
}

function Cartlist({ cart, deleteProduct }) {
  // Konverter den data der er i "kurven(cartList-arrayet)" til JSON-streng og derefter til noget som URL'en kan læse
  const cartData = encodeURIComponent(JSON.stringify(cart));

  return (
    <div className="p-8 bg-custom-beige text-black">
      <h2 className="text-2xl mb-4">Indkøbskurv</h2>
      <ul>
        {cart.map((item) => (
          <li key={item.id} className="flex flex-col xl:flex-row bg-gray-300 my-4 p-4 gap-2 text-black items-center">
            <Image src={item.thumbnail} width={125} height={125} alt={item.title} />
            <div className="flex flex-col gap-2">
              <span>
                <b>{item.title}</b>
              </span>
              <span>{item.price} DKK</span>
              <span>Mængde: {item.quantity}</span>
              <ListItem id={item.id} deleteProduct={deleteProduct} />
            </div>
          </li>
        ))}
      </ul>
      <div>
        {/* Link til betalingsside med kurvdata i URL’en */}
        <Link href={`/payment?items=${cartData}`}>Betal nu</Link>
      </div>
    </div>
  );
}

function ListItem({ id, deleteProduct }) {
  return (
    <button onClick={() => deleteProduct(id)} className="text-red-500">
      Delete
    </button>
  );
}
