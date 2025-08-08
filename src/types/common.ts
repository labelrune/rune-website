import { DocumentReference } from "firebase/firestore";

type FirebaseIDObject = { id: string };

export type ProductItemData = {
  basePrice: number | null;
  cutPrice: number | null;
  specification: Array<Record<"key" | "value", string>>;
  imageLinks: Record<string, string>;
  description: string;
  productName: string;
  category: string;
  size: Array<string>;
};

export type FBProduct = ProductItemData & FirebaseIDObject;

export type CollectionItemData = {
    name: string;
    items: Array<DocumentReference>;
}

export type FBCollection = CollectionItemData & FirebaseIDObject;

export type CollectionGroupItemData = {
    labels: Array<DocumentReference>;
}

export type FBCollectionGroup = CollectionGroupItemData & FirebaseIDObject;
