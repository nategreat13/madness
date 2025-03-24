import admin from "firebase-admin";
import { FirestoreCollections, config } from "madness-shared";

// Initialize Firebase
admin.initializeApp({
  credential: admin.credential.cert(config.GOOGLE_SERVICE_ACCOUNT as any),
});

const db = admin.firestore();

export async function getAllDocsInCollection(collection: FirestoreCollections) {
  try {
    const snapshot = await db.collection(collection).get();
    const docs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return docs as any;
  } catch (e) {
    throw new Error(`Error fetching all docs from collection: ${collection}`);
  }
}

export async function getDoc(collection: FirestoreCollections, docId: string) {
  try {
    return (await db.collection(collection).doc(docId).get()).data() ?? null;
  } catch (e) {
    throw new Error(
      `Couldn't find doc: ${docId} from collection: ${collection}`
    );
  }
}

export async function setDoc(
  collection: FirestoreCollections,
  docId: string | number,
  data: any
) {
  return await db.collection(collection).doc(`${docId}`).set(data);
}
