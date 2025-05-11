export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  createdAt: Date;
  lastLogin: Date;
}

export interface UserDocument extends Omit<User, 'createdAt' | 'lastLogin'> {
  createdAt: any; // Firestore Timestamp
  lastLogin: any; // Firestore Timestamp
} 