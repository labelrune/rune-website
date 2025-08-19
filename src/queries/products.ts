import {
  collection,
  doc,
  getDoc,
  getDocs,
  DocumentReference,
  query,
  limit,
} from "firebase/firestore";
import { firestore } from "src/lib/firebase";
import { FBCollection, FBCollectionGroup, FBProduct } from "src/types/common";

/**
 * Fetches all documents from the "products" collection.
 */
export async function getAllProducts(): Promise<FBProduct[]> {
  // Corrected to query the "products" collection
  const productsCollectionRef = collection(firestore, "products");
  const querySnapshot = await getDocs(productsCollectionRef);

  const productsData: FBProduct[] = [];
  querySnapshot.forEach((doc) => {
    // Cast the document data to FBProduct
    productsData.push({ id: doc.id, ...doc.data() } as FBProduct);
  });

  return productsData;
}

/**
 * Fetches all products belonging to a specific collection/label.
 * @param {string} collectionId - The ID of the document in the "labels" collection.
 */
export const getProductsByCollection = async (
  collectionId: string
): Promise<{ name: string, products: FBProduct[] }> => {
  // 1. Get the reference to the specific label document
  const collectionRef = doc(firestore, "labels", collectionId);
  const collectionSnap = await getDoc(collectionRef);

  if (!collectionSnap.exists()) {
    console.warn(`Collection with ID ${collectionId} does not exist.`);
    return { name: "", products: [] };
  }

  const collectionData = collectionSnap.data() as FBCollection;

  const { name } = collectionData;

  // 2. Fetch all product documents referenced in the 'items' array
  const productPromises = collectionData.items.map((productRef) =>
    getDoc(productRef)
  );

  const productDocs = await Promise.all(productPromises);

  // 3. Map the results to FBProduct objects
  const products = productDocs
    .filter((doc) => doc.exists())
    .map((doc) => ({ id: doc.id, ...doc.data() } as FBProduct));

  return { name, products };
};

/**
 * Fetches all unique products belonging to a specific collection group.
 * @param {string} collectionGroupId - The ID of the document in the "label_groups" collection.
 */
export const getProductsByCollectionGroup = async (
  collectionGroupId: string
): Promise<FBProduct[]> => {
  // 1. Get the specific label group document
  const groupRef = doc(firestore, "label_groups", collectionGroupId);
  const groupSnap = await getDoc(groupRef);

  if (!groupSnap.exists()) {
    console.warn(`Group with ID ${collectionGroupId} does not exist.`);
    return [];
  }

  // 2. Fetch all the label documents referenced by the group
  const groupData = groupSnap.data() as FBCollectionGroup;
  const labelPromises = groupData.labels.map((labelRef) => getDoc(labelRef));
  const labelDocs = await Promise.all(labelPromises);

  // 3. Collect all unique product references from all labels
  const uniqueProductRefs = new Map<string, DocumentReference>();
  labelDocs.forEach((labelDoc) => {
    if (labelDoc.exists()) {
      const labelData = labelDoc.data() as FBCollection;
      labelData.items.forEach((productRef) => {
        // Use the document path as a unique key to prevent duplicates
        if (!uniqueProductRefs.has(productRef.path)) {
          uniqueProductRefs.set(productRef.path, productRef);
        }
      });
    }
  });

  // 4. Fetch all the unique product documents
  const productPromises = Array.from(uniqueProductRefs.values()).map((ref) =>
    getDoc(ref)
  );
  const productDocs = await Promise.all(productPromises);

  // 5. Map the results to FBProduct objects
  const products = productDocs
    .filter((doc) => doc.exists())
    .map((doc) => ({ id: doc.id, ...doc.data() } as FBProduct));

  return products;
};

/**
 * Fetches a single product by its document ID.
 * @param {string} productId - The document ID of the product to fetch.
 * @returns {Promise<FBProduct | null>} The product data or null if not found.
 */
export const getProductById = async (
  productId: string
): Promise<FBProduct | null> => {
  // 1. Create a reference to the specific document in the "products" collection
  const productRef = doc(firestore, "products", productId);

  // 2. Fetch the document
  const productSnap = await getDoc(productRef);

  // 3. Check if the document exists and return its data
  if (productSnap.exists()) {
    return { id: productSnap.id, ...productSnap.data() } as FBProduct;
  } else {
    // It's good practice to handle the case where the document is not found
    console.warn(`Product with ID "${productId}" not found.`);
    return null;
  }
};

/**
 * Fetches a limited number of products from the "products" collection.
 * @returns {Promise<FBProduct[]>} An array containing a maximum of 4 products.
 */
export async function getLimitedProducts(): Promise<FBProduct[]> {
  const productsRef = collection(firestore, "products");

  // Create a query that gets the first 4 documents it finds
  const q = query(productsRef, limit(5));

  const querySnapshot = await getDocs(q);

  const productsData: FBProduct[] = [];
  querySnapshot.forEach((doc) => {
    productsData.push({ id: doc.id, ...doc.data() } as FBProduct);
  });

  return productsData;
}
