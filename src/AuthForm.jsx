import React, { useState } from "react";
import { auth } from "./firebase";
import { signOut, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import "./AuthForm.css"; // Import CSS for styling

const AuthForm = ({ isSignUp, handleAuth, setEmail, setPassword, user, setIsSignUp, setShowAuthForm }) => {
  const [email, setLocalEmail] = useState("");
  const [password, setLocalPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      alert("Signed out successfully!");
    } catch (error) {
      alert(error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      alert("Signed in with Google successfully!");
    } catch (error) {
      alert(error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignUp && password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    setEmail(email);
    setPassword(password);
    handleAuth(e);
  };

  return (
    <div className="auth-form" onClick={(e) => e.stopPropagation()}>
      {user ? (
        <div className="profile">
          <h2>Welcome, {user.email}</h2>
          <button onClick={handleSignOut}>Sign Out</button>
        </div>
      ) : (
        <>
          <h2>{isSignUp ? "Sign Up" : "Sign In"}</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setLocalEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setLocalPassword(e.target.value)}
              required
            />
            {isSignUp && (
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            )}
            <button type="submit">{isSignUp ? "Sign Up" : "Sign In"}</button>
          </form>
          <div className="google-signin">
            <button onClick={handleGoogleSignIn}>Sign in with Google</button>
          </div>
          {!isSignUp && (
            <div className="forgot-password">
              <button onClick={() => alert("Forgot Password clicked")}>
                Forgot Password?
              </button>
            </div>
          )}
          <div className="toggle-auth">
            <span>
              {isSignUp ? "Already have an account? " : "Don't have an account? "}
              <button
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setLocalEmail("");
                  setLocalPassword("");
                  setConfirmPassword("");
                }}
              >
                {isSignUp ? "Sign In" : "Sign Up"}
              </button>
            </span>
          </div>
        </>
      )}
    </div>
  );
};

export default AuthForm;