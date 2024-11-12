"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Struktur({ products }) {
  const [cart, setCart] = useState([
    // {
    //   id: 1,
    //   title: "tøj",
    //   price: "120kr",
    // },
    // {
    //   id: 2,
    //   title: "tøj",
    //   price: "999",
    // },
  ]);

  function addBasket(product) {
    const newProduct = {
      id: crypto.randomUUID(),
      title: product.title,
      price: product.price,
    };
    setCart([newProduct, ...cart]);
  }

  return (
    <div className="grid grid-cols-[3fr_1fr] min-h-screen">
      <div className="grid grid-cols-3 items-center justify-items-center p-8 pb-20 gap-16 font-[family-name:var(--font-geist-sans)]">
        {products.map((product) => (
          <div key={product.id} className="p-3 rounded-lg shadow-sm bg-gray-50">
            <Image src={product.thumbnail} width={250} height={250} alt={product.title} />
            <Link className="text-black" href={`/detaljer/${product.id}`}>
              {product.title}
            </Link>
            <Form addBasket={addBasket} product={product} />
          </div>
        ))}
      </div>

      <Cartlist cart={cart} />
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
