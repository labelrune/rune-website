import { DocumentReference } from "firebase/firestore";

type FirebaseIDObject = { id: string };

export type ProductItemData = {
  specification: Array<Record<"key" | "value", string>>;
  imageLinks: Record<string, string>;
  description: string;
  productName: string;
  category: string;
  sizes: Record<string, { netPrice: string; grossPrice: string }>;
};

export type FBProduct = ProductItemData & FirebaseIDObject;

export enum SizeChart {
  XS = "XS",
  S = "S",
  M = "M",
  L = "L",
  XL = "XL",
  XXL = "XXL",
  XXXL = "XXXL",
}

export type CollectionItemData = {
  name: string;
  items: Array<DocumentReference>;
};

export type FBCollection = CollectionItemData & FirebaseIDObject;

export type CollectionGroupItemData = {
  labels: Array<DocumentReference>;
};

export type FBCollectionGroup = CollectionGroupItemData & FirebaseIDObject;

export type AccordionItem = {
  id: number;
  title: string;
  content: React.ReactNode;
  icon: React.ReactNode;
};
