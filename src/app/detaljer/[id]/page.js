import Image from "next/image";
import Link from "next/link";

const Page = async ({ params }) => {
  const id = params.id;

  let response = await fetch(`https://dummyjson.com/products/${id}`);
  let product = await response.json();

  const mainImage = product.thumbnail;
  const thumbnailImages = product.images.slice(0, 4);

  return (
    <div className="p-8 text-gray-800">
      <nav className="mb-4">
        <Link href="/" className="text-black">
          &lt; Tilbage
        </Link>
      </nav>

      <div className="flex">
        <div className="flex-shrink-0 border-4 border-blue-950 p-4 rounded-lg">{mainImage && <Image src={mainImage} width={300} height={300} alt={product.title} className="object-cover rounded-lg" />}</div>

        <div className="ml-8">
          <h1 className="text-3xl font-bold text-blue-950">{product.title}</h1>
          <p className="mt-2 text-black">{product.description}</p>
          <p className="text-xl font-bold text-blue-950">{product.price} DKK</p>
        </div>
      </div>

      {/* Lille billede */}
      <div className="mt-4 flex space-x-4">
        {thumbnailImages.map((image, index) => (
          <div key={index} className="border-2 border-blue-950 rounded-lg p-1">
            <Image src={image} width={60} height={60} alt={`${product.title} ${index + 1}`} className="object-cover rounded-lg" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
