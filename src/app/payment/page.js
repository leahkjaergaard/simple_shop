"use client";

import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function PaymentPage() {
  const searchParams = useSearchParams();
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const items = searchParams.get("items");
    const parsedItems = items ? JSON.parse(decodeURIComponent(items)) : [];
    setCartItems(parsedItems);
  }, [searchParams]);

  // Lægger alle priser sammen
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="p-4 md:p-8">
      <nav className="mb-4">
        <Link href="/products" className="text-white p-2 rounded-lg text-sm md:text-base bg-custom-green">
          Tilbage
        </Link>
      </nav>

      <h1 className="text-black text-5xl">
        <b>Betalingssiden</b>
      </h1>

      {cartItems.length > 0 ? (
        <div className="justify-center gap-9 relative md:flex">
          <ul className="flex flex-col w-96">
            {cartItems.map((item) => (
              <li key={item.id} className="p-10 border-b self-center flex items-center gap-2">
                <Image src={item.thumbnail} width={150} height={150} alt={item.title} />
                <div className="text-black">
                  <p>
                    <b>{item.title}</b>
                  </p>
                  <p>{item.price} DKK</p>
                  <p>Antal: {item.quantity}</p>
                </div>
              </li>
            ))}
          </ul>

          <ul className="text-black bg-gray-300 h-48 sticky top-16">
            <div className="flex flex-col md:w-96 items-center justify-center h-full gap-3">
              <h2 className="text-3xl">
                <b>TOTAL</b>
              </h2>
              <span>{totalPrice} Kr</span>
              <button className="text-white p-2 rounded-lg text-sm md:text-base bg-custom-green">GÅ TIL BETALING</button>
            </div>
          </ul>
        </div>
      ) : (
        <h1 className="text-black text-6xl">Kurven er tom.</h1>
      )}
    </div>
  );
}
