"use client";

import { useSearchParams } from "next/navigation";
import Image from "next/image";

export default function PaymentPage() {
  const searchParams = useSearchParams();
  const items = searchParams.get("items");

  // Nedbryder den givende URL fra tidligere side til en JSON-streng og der efter til et array som kan læses.
  const cartItems = items ? JSON.parse(decodeURIComponent(items)) : [];

  return (
    <div>
      <h1>Betalingssiden</h1>
      {cartItems.length > 0 ? (
        <ul>
          {cartItems.map((item) => (
            <li key={item.id} className="p-4 border-b">
              <Image src={item.thumbnail} width={125} height={125} alt={item.title} />
              <div className="text-black">
                <p><b>{item.title}</b></p>
                <p>{item.price} DKK</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>Kurven er tom.</p>
      )}
    </div>
  );
}
