import { User as FirebaseUser } from "firebase/auth";
import { 
  doc, 
  getDoc, 
  setDoc, 
  collection, 
  query, 
  getDocs, 
  updateDoc, 
  serverTimestamp, 
  where 
} from "firebase/firestore";
import { db } from "./firebase";
import { UserDocument } from "../types/User";

const USERS_COLLECTION = "users";

/**
 * Creates or updates a user document in Firestore
 */
export const saveUserToFirestore = async (user: FirebaseUser): Promise<void> => {
  if (!user.uid) return;

  const userRef = doc(db, USERS_COLLECTION, user.uid);
  const userSnapshot = await getDoc(userRef);
  
  if (!userSnapshot.exists()) {
    // Create new user
    const userData: UserDocument = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      createdAt: serverTimestamp(),
      lastLogin: serverTimestamp()
    };
    
    await setDoc(userRef, userData);
  } else {
    // Update last login
    await updateDoc(userRef, {
      lastLogin: serverTimestamp(),
      // Update profile info in case it changed
      displayName: user.displayName,
      photoURL: user.photoURL,
      email: user.email
    });
  }
};

/**
 * Gets a user document from Firestore
 */
export const getUserFromFirestore = async (uid: string) => {
  const userRef = doc(db, USERS_COLLECTION, uid);
  const userSnapshot = await getDoc(userRef);
  
  if (userSnapshot.exists()) {
    return {
      id: userSnapshot.id,
      ...userSnapshot.data()
    };
  }
  
  return null;
};

/**
 * Gets all users from Firestore
 */
export const getAllUsers = async () => {
  const usersQuery = query(collection(db, USERS_COLLECTION));
  const querySnapshot = await getDocs(usersQuery);
  
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
};

/**
 * Get users by email
 */
export const getUserByEmail = async (email: string) => {
  const usersQuery = query(
    collection(db, USERS_COLLECTION), 
    where("email", "==", email)
  );
  
  const querySnapshot = await getDocs(usersQuery);
  
  if (querySnapshot.empty) {
    return null;
  }
  
  // Return the first matching user
  const doc = querySnapshot.docs[0];
  return {
    id: doc.id,
    ...doc.data()
  };
}; 