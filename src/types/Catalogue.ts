export enum Catalogue {
  Gulzaar,
  SpringSummer,
  FestiveStyles,
  BloomAndBreeze,
  VelvetAndTissueEdit,
  Bestsellers,
}

export type CatalogueDataType = {
  id: Catalogue;
  title: string;
  description: string;
  imageUrl: string[];
  link: string;
  price: number;
  isNewArrival: boolean;
};
