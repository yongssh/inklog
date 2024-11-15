import { auth } from '../firebase';
import { GoogleAuthProvider, signInWithPopup, User } from "firebase/auth";

// Google Sign-In function
export const signInWithGoogle = async (): Promise<User | null> => {
  const provider = new GoogleAuthProvider();

  try {
    const result = await signInWithPopup(auth, provider);
    console.log("User signed in successfully:", result.user);
    return result.user; // User info if sign-in succeeds
  } catch (error: any) {
    console.error("Error during Google sign-in:", error.message);
    throw error; // Rethrow the error for upstream handling
  }
};
