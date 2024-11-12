import Struktur from ".//../componets/struktur";

export default async function Home() {
  let response = await fetch("https://dummyjson.com/products");
  let data = await response.json();
  return <Struktur products={data.products} />;
}
