import React, { useState, useEffect } from 'react';
import { signInWithGoogle } from '../utils/authentication';
import { auth } from '../firebase';  
import { onAuthStateChanged } from "firebase/auth";

const GoogleSignInButton = () => {
  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();  
      console.log("User signed in successfully.");
    } catch (error) {
      console.error("Google sign-in error:", error);
    }
  };

  return (
    <button className="sign-in-button" onClick={handleGoogleSignIn}>
      Sign in with Google
    </button>
  );
};

const SignInPage = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setIsSignedIn(!!currentUser);  
    });

     return () => unsubscribe();
  }, []);

  return (
    <div className="sign-in-page">
      <h2>Sign In</h2>
      {isSignedIn ? (
        <p>You are signed in!</p>  
      ) : (
        <>
          <GoogleSignInButton />
          <p>Please sign in.</p>
        </>
      )}
    </div>
  );
};

export default SignInPage;
