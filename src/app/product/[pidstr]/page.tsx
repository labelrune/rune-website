import ProductInfo from "src/molecules/product/ProductInfo";
import { getLimitedProducts, getProductById } from "src/queries/products";

export default async function Page({
  params,
}: {
  params: Promise<{ pidstr: string }>
}) {
  const { pidstr } = await params;

  const pid = pidstr.split("-")?.[0];

  const productData = await getProductById(pid);

  const associatedProducts = await getLimitedProducts();

  if (!productData || !associatedProducts) return;

  return (
    <div className="flex w-screen justify-center p-4 max-w-screen overflow-x-hidden">
      <div className="max-w-7xl w-full self-center mt-8">
        <ProductInfo productData={productData} associatedProducts={associatedProducts} />
      </div>
    </div>
  )
}
