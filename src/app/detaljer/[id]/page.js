// Brug "use client" til at angive, at koden skal køre på klienten
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

// Definerer hovedkomponenten, som viser produktinformation
const Page = ({ params }) => {
  const { id } = params;

  // Definerer state-variabler til at gemme produktdata og aktuelt billede
  const [product, setProduct] = useState(null);
  const [currentImage, setCurrentImage] = useState(null);

  // Hent produktdata fra API ved hjælp af produkt-ID
  useEffect(() => {
    const fetchProduct = async () => {
      const response = await fetch(`https://dummyjson.com/products/${id}`);
      const productData = await response.json();
      setProduct(productData); // Gem produktdata i state
      setCurrentImage(productData.thumbnail); // Sætter hovedbilledet til produktets thumbnail
    };

    fetchProduct(); // Kald funktionen til at hente data
  }, [id]); // Kør denne effekt, når ID ændres

  // Hvis data stadig hentes, vis en loading-tekst
  if (!product) return <p>Loading...</p>;

  // Håndterer klik på miniaturer ved at ændre hovedbilledet
  const handleThumbnailClick = (image) => {
    setCurrentImage(image);
  };

  return (
    <div className="p-4 md:p-8 text-gray-800">
      {/* Navigationsknap til at gå tilbage til produktsiden */}
      <nav className="mb-4">
        <Link href="/products" className="text-white p-2 rounded-lg text-sm md:text-base bg-sky-950">
          Tilbage
        </Link>
      </nav>

      {/* Sektion for produktdetaljer */}
      <div className="flex flex-col md:flex-row md:space-x-8">
        {/* Stort billede af produktet */}
        <div className="flex-shrink-0 border-2 border-black p-4 rounded-lg mb-4 md:mb-0 w-full md:w-[300px] lg:w-[400px] xl:w-[500px]">{currentImage && <Image src={currentImage} width={500} height={500} alt={product.title} className="object-cover rounded-lg w-full h-auto" />}
        {/* Miniaturebilleder, som brugeren kan klikke på for at ændre hovedbilledet */}
      <div className="mt-6 flex space-x-4 justify-center md:justify-start">
        {product.images.slice(0, 4).map((image, index) => (
          <div key={index} className="border-2 border-black rounded-lg p-1 cursor-pointer" onClick={() => handleThumbnailClick(image)}>
            <Image src={image} width={60} height={60} alt={`${product.title} ${index + 1}`} className="object-cover rounded-lg" />
          </div>
        ))}
      </div>
        </div>

        {/* Sektion for produktinformation */}
        <div className="space-y-4 text-center md:text-left max-w-full md:max-w-lg lg:max-w-xl">
          <h1 className="text-2xl md:text-3xl font-bold text-sky-950">{product.title}</h1>
          <p className="text-xl md:text-2xl font-semibold text-black">Pris: {product.price} kr</p>
          <p className="text-black leading-relaxed text-sm md:text-base">{product.description}</p>

          {/* Reviews sektion */}
          <div className="mt-8">
            <h2 className="text-xl font-bold text-sky-950 mb-4">Reviews</h2>
            <div className="flex items-center mb-6"></div>

            {/* Liste af anmeldelser */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {product.reviews?.map((review, stjerne) => (
                <div key={stjerne} className="text-center border-2 border-black p-4 rounded-lg">
                  {/* Viser stjerner for hver anmeldelse baseret på rating */}
                  <div className="mb-2">
                    {[...Array(5)].map((_, starIndex) => (
                      <span key={starIndex} className={`text-xl ${starIndex < review.rating ? "text-yellow-500" : "text-gray-300"}`}>
                        ★
                      </span>
                    ))}
                  </div>
                  <p className="text-sky-600 font-semibold">"{review.comment}"</p>
                  <p className="text-gray-500 mt-2">- {review.reviewerName}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Miniaturebilleder, som brugeren kan klikke på for at ændre hovedbilledet */}
      <div className="mt-6 flex space-x-4 justify-center md:justify-start">
        {product.images.slice(0, 4).map((image, index) => (
          <div key={index} className="border-2 border-black rounded-lg p-1 cursor-pointer" onClick={() => handleThumbnailClick(image)}>
            <Image src={image} width={60} height={60} alt={`${product.title} ${index + 1}`} className="object-cover rounded-lg" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
