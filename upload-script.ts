// have to add "type": "module" to package.json to make it work

type RawProduct = {
  "Timestamp": string;
  "Product Name": string;
  "Original Price": string;
  "Discounted Price (if applicable)": string;
  "Category of product": string;
  "Product description(explain in brief, as it goes on the website)": string;
  "Product Images (upload multiple if available)": string;
  "Sizes (available in, if applicable)": string;
  "Specifications (like 'Colour' = 'Green', 'Occasion' = 'Formal Wear', etc). Make it comma-separated": string;
  "id": string;
};

const rawData: RawProduct[] = [
  // last added product
  {
    "id": "011",
    "Timestamp": "8/6/2025 13:46:54",
    "Product Name": "Moh",
    "Original Price": "",
    "Discounted Price (if applicable)": "",
    "Category of product": "Kurta",
    "Product description(explain in brief, as it goes on the website)": "Crafted in raspberry pink Malai Chanderi, this gathered silhouette pairs with a scalloped dupatta featuring subtle handwork,effortlessly elegant and easy to wear.\n\nMaterial  Kurta: Chanderi Pants: Silk cotton Dupatta: Chanderi",
    "Product Images (upload multiple if available)": "https://drive.google.com/thumbnail?sz=w800&id=1-ac5FhFhqIedFzh5R-AXB-4vXWNIT1rN, https://drive.google.com/thumbnail?sz=w800&id=1oP03UTEyxJl8BVhgD52ozL_GpZKX4xO6",
    "Sizes (available in, if applicable)": "",
    "Specifications (like 'Colour' = 'Green', 'Occasion' = 'Formal Wear', etc). Make it comma-separated": ""
  }
]

function transformRawProduct(raw: RawProduct): FBProduct {
  const basePrice = raw["Original Price"] ? parseFloat(raw["Original Price"]) : null;
  const cutPrice = raw["Discounted Price (if applicable)"] ? parseFloat(raw["Discounted Price (if applicable)"]) : null;

  const imageLinks: Record<string, string> = {};
  raw["Product Images (upload multiple if available)"]
    .split(",")
    .map((url, index) => url.trim())
    .forEach((url, index) => {
      // const idMatch = url.match(/[-\w]{25,}/); // extract Drive ID
      // if (idMatch) {
        // const imageId = idMatch[0];
        imageLinks[`${index + 1}`] = url;
      // }
    });

  const specification = raw["Specifications (like 'Colour' = 'Green', 'Occasion' = 'Formal Wear', etc). Make it comma-separated"]
    ? raw["Specifications (like 'Colour' = 'Green', 'Occasion' = 'Formal Wear', etc). Make it comma-separated"]
        .split(",")
        .map((entry) => {
          const [key, value] = entry.split("=").map((s) => s.trim());
          return { key, value };
        })
        .filter((entry) => entry.key && entry.value)
    : [];

  const size = raw["Sizes (available in, if applicable)"]
    ? raw["Sizes (available in, if applicable)"].split(",").map((s) => s.trim())
    : [];

  return {
    id: raw["id"],
    productName: raw["Product Name"],
    basePrice,
    cutPrice,
    category: raw["Category of product"],
    description: raw["Product description(explain in brief, as it goes on the website)"],
    imageLinks,
    specification,
    size,
  };
}

import { doc, setDoc } from "firebase/firestore";

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

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDZBVQBTYhhhzAWy5VMmRevxXHLjApRFvk",
  authDomain: "rune-catalogue.firebaseapp.com",
  projectId: "rune-catalogue",
  storageBucket: "rune-catalogue.firebasestorage.app",
  messagingSenderId: "708830780650",
  appId: "1:708830780650:web:39c328b3bbc43d253acb93",
  measurementId: "G-254T9J3FRQ"
};

const app = initializeApp(firebaseConfig);

export const firestore = getFirestore(app);

async function uploadProduct(product: FBProduct): Promise<void> {
  const docRef = doc(firestore, "products", product.id); // using your custom ID like "001"
  await setDoc(docRef, { ...product });
}

async function uploadProducts(rawData: RawProduct[]): Promise<void> {
  for (const raw of rawData) {
    const product = transformRawProduct(raw);
    await uploadProduct(product);
  }
}

uploadProducts(rawData);
