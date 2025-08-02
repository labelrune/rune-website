import StoreProducts from "src/molecules/store";
import { getProductsByCollection } from "src/queries/products";

export default async function Page({
  params,
}: {
  params: Promise<{ category: string }>
}) {
  const { category } = await params;

  const { name, products } = await getProductsByCollection(category);

  return (
    <div className="flex w-screen justify-center p-4 max-w-screen overflow-x-hidden">
      <div className="max-w-7xl w-full flex flex-col items-center self-center">
        <div className="text-3xl pb-8 text-black">{name}</div>
        <StoreProducts products={products} />
      </div>
    </div>
  )
}
