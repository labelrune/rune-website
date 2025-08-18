export enum CatalogueEnum {
  Anarkali = "anarkali",
  Kurta = "kurta",
  Dress = "dress",
  NewArrivals = "new-arrivals",
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
