export enum CatalogueEnum {
  Anarkali = "Anarkalis",
  Kurta = "Kurtas",
  Dress = "Dresses",
  NewArrivals = "New Arrivals",
  // VelvetAndTissueEdit,
  // Bestsellers,
}

export type CatalogueDataType = {
  id: CatalogueEnum;
  title: string;
  description: string;
  imageUrl: string[];
  link: string;
  price: number;
  isNewArrival: boolean;
};
