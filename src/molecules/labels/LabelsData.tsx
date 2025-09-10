import { getProductsByCollection } from "src/queries/products";
import { CatalogueEnum } from "src/types/Catalogue";
import { FBProduct } from "src/types/common";
import LabelsClient from "./LabelsClient";

const LabelsData = async ({ catalogue }: { catalogue: CatalogueEnum }) => {
  let filteredCatalogueData: FBProduct[] = [];

  try {
    filteredCatalogueData = (await getProductsByCollection(catalogue)).products;
  } catch (error) {
    console.error("Error fetching products:", error);
  }

  return (
    <LabelsClient catalogue={catalogue} products={filteredCatalogueData} />
  );
};

export default LabelsData;
