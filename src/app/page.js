import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="relative">
      <div className="relative w-full h-[730px]">
        <Image src="https://images.unsplash.com/photo-1556918589-eae612a2bbc2?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Nature landscape" layout="fill" objectFit="cover" />
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-0">
          <h1 className="text-white text-9xl font-bold mb-4">LEMIL</h1>
          <Link href="/products" className="bg-custom-green text-white px-6 py-2 rounded-full hover:bg-green-800 transition-all duration-400">
            UDFORSK NU!
          </Link>
        </div>
      </div>
    </main>
  );
}
