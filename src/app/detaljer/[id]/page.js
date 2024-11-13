import Image from "next/image";
import Link from "next/link";

const Page = async ({ params }) => {
  const id = params.id;

  let response = await fetch(`https://dummyjson.com/products/${id}`);
  let product = await response.json();

  return (
    <div className="text-black p-8">
      <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
      <p className="text-2xl font-semibold mb-4">Pris: {product.price} kr</p>
      <Link href={`/detaljer/${id}`}>
        {/* Har sat billede ind ligesom Troels' eksempel */}
        <Image src={product.thumbnail} width={250} height={250} alt={product.title} className="object-cover rounded cursor-pointer" />
      </Link>
    </div>
  );
};

export default Page;
