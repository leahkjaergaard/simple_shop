"use client";

import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function PaymentPage() {
  // Henter URL-parametre
  const searchParams = useSearchParams();
  const items = searchParams.get("items");

  // Konverterer URL-parametrene til array
  const cartItems = items ? JSON.parse(decodeURIComponent(items)) : [];

  // Beregner den samlede pris for alle varer i kurven
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="p-4 md:p-8">
      <div>
        <nav className="mb-4">
          <Link href="/products" className="text-white p-2 rounded-lg text-sm md:text-base bg-custom-green">
            Tilbage
          </Link>
        </nav>

        <h1 className="text-black text-5xl">
          <b>Betalingssiden</b>
        </h1>

        {/* Viser kurvens indhold, men kun hvis der er varer i */}
        {cartItems.length > 0 ? (
          <div className="justify-center gap-9 relative md:flex">
            {/* Liste over varer i kurven */}
            <ul className="flex flex-col w-96">
              {cartItems.map((item) => (
                <li key={item.id} className="p-10 border-b self-center flex items-center gap-2">
                  {/* Billede af varen */}
                  <Image src={item.thumbnail} width={150} height={150} alt={item.title} />
                  <div className="text-black">
                    {/* Vareinformationer */}
                    <p>
                      <b>{item.title}</b>
                    </p>
                    <p>{item.price} DKK</p>
                    <p>Antal: {item.quantity}</p>
                  </div>
                </li>
              ))}
            </ul>

            {/* Totalpris og betaling-knap */}
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
          // Viser en besked hvis kurven er tom
          <h1 className="text-black text-6xl">Kurven er tom.</h1>
        )}
      </div>
    </div>
  );
}
