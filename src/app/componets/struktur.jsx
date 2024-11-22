"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Struktur({ products }) {
  // State til at holde styr på varer i kurven
  const [cart, setCart] = useState([]);
  // State til at holde styr på valgt kategori
  const [category, setCategory] = useState("all");

  // Funktion til at tilføje varer til kurven
  function addBasket(product) {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.title === product.title);

      if (existingProduct) {
        
        return prevCart.map((item) => (item.title === product.title ? { ...item, quantity: item.quantity + 1 } : item));
      } else {
        // Hvis varen ikke allerede er i kurven, tilføj den til kurven
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

  // Funktion til at fjerne en vare fra kurven
  function deleteProduct(id) {
    setCart(cart.filter((item) => item.id !== id));
  }

  // Filtrerer produkter baseret på valgt kategori
  const filteredProducts = category === "all" ? products : products.filter((product) => product.category === category);

  // Håndterer ændring af kategori
  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  return (
    <div>
      <div>
        <div className={`grid min-h-screen relative ${cart.length > 0 ? "grid-cols-[4fr_1fr]" : "grid-cols-[4fr]"}`}>
          <div className="py-5">
            {/* Filter til at vælge produktkategori */}
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
            {/* Liste over produkter */}
            <div className="grid sm:grid-cols-2 grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 items-center justify-items-center p-8 pb-20 gap-16 font-[family-name:var(--font-geist-sans)]">
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
                    {/* Knappen til at tilføje produktet til kurven */}
                    <Form addBasket={addBasket} product={product} />
                  </div>
                ))
              ) : (
                // Vis besked hvis der ikke er nogen produkter i den valgte kategori
                <p className="text-center text-white">No products available in this category.</p>
              )}
            </div>
          </div>
          {/* Viser kurven hvis der er varer */}
          {cart.length > 0 && <Cartlist cart={cart} deleteProduct={deleteProduct} />}
        </div>
      </div>
    </div>
  );
}

// Komponent for "Læg i Kurv"-knap
function Form({ addBasket, product }) {
  return (
    <button onClick={() => addBasket(product)} className="text-white p-2 rounded-lg text-sm md:text-base bg-custom-green w-fit">
      Læg i Kurv
    </button>
  );
}

// Komponent for visning af kurv
function Cartlist({ cart, deleteProduct }) {
  // Konverterer kurvdata til en URL-læselig streng
  const cartData = encodeURIComponent(JSON.stringify(cart));

  return (
    <div className="p-8 bg-custom-beige text-black min-h-48 max-h-fit sticky top-0">
      <h2 className="text-2xl mb-4">Indkøbskurv</h2>
      <ul>
        {cart.map((item) => (
          <li key={item.id} className="flex flex-col xl:flex-row bg-gray-300 my-4 p-4 gap-2 text-black items-center">
            {/* Billede og oplysninger om varen */}
            <Image src={item.thumbnail} width={125} height={125} alt={item.title} />
            <div className="flex flex-col gap-2">
              <span>
                <b>{item.title}</b>
              </span>
              <span>{item.price} DKK</span>
              <span>Antal: {item.quantity}</span>
              {/* Knappen til at fjerne varen */}
              <ListItem id={item.id} deleteProduct={deleteProduct} />
            </div>
          </li>
        ))}
      </ul>
      {/* Link til betalingsside med kurvdata i URL'en */}
      <div className="text-white p-2 rounded-lg text-sm md:text-base bg-custom-green w-fit">
        <Link href={`/payment?items=${cartData}`}>Betal nu</Link>
      </div>
    </div>
  );
}

// Komponent for knap til at fjerne varer fra kurven
function ListItem({ id, deleteProduct }) {
  return (
    <button onClick={() => deleteProduct(id)} className="text-red-500">
      Delete
    </button>
  );
}
