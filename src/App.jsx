import React, { useState, useEffect } from "react";
import { auth } from "./firebase";
import { onAuthStateChanged, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import AuthForm from "./AuthForm";
import "./App.css";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [showAuthForm, setShowAuthForm] = useState(false);
  const [user, setUser] = useState(null);

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setShowAuthForm(false); // Close the auth form when user is signed in
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  // Handle authentication (sign up/sign in)
  const handleAuth = async (e) => {
    e.preventDefault();
    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
        alert("Sign up successful!");
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        alert("Sign in successful!");
      }
      setShowAuthForm(false); // Close the auth form after successful login/signup
    } catch (error) {
      alert(error.message);
    }
  };

  // Handle sign out
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      alert("Signed out successfully!");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div>
      <Navbar user={user} handleSignOut={handleSignOut} />
      {showAuthForm && (
        <div className="auth-overlay" onClick={() => setShowAuthForm(false)}>
          <AuthForm
            isSignUp={isSignUp}
            handleAuth={handleAuth}
            setEmail={setEmail}
            setPassword={setPassword}
            user={user}
            setIsSignUp={setIsSignUp}
            setShowAuthForm={setShowAuthForm}
          />
        </div>
      )}
      <Hero setShowAuthForm={setShowAuthForm} setIsSignUp={setIsSignUp} />
      <Footer />
    </div>
  );
}

// Navbar Component
const Navbar = ({ user, handleSignOut }) => {
  return (
    <div className="navbar">
      <h1>StartFlow</h1>
      <ul className="nav-items">
        <li><a href="#Home">Home</a></li>
        <li><a href="#About">About</a></li>
        <li><a href="#Contact">Contact</a></li>
        {user ? (
          <li>
            <div className="profile">
              <span>{user.email}</span>
              <button onClick={handleSignOut}>Sign Out</button>
            </div>
          </li>
        ) : null}
      </ul>
    </div>
  );
};

// Hero Component
const Hero = ({ setShowAuthForm, setIsSignUp }) => {
  return (
    <div id="Home" className="hero">
      <img
        id="img1"
        src="https://www.cardivision.com/files/image-gallery/Volvo-Cars-03-2019.jpg"
        alt="Car Image"
      />
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos, assumenda. Natus, dolore. Sint, nam. Voluptas nemo harum ratione optio accusantium accusamus cupiditate aliquam cumque iste, in, enim quisquam minus dignissimos?
      </p>
      <button className="btn-1" onClick={() => alert("Learn More clicked")}>
        Learn More
      </button>
      <button
        className="btn"
        onClick={() => {
          setIsSignUp(false); // Default to Sign In
          setShowAuthForm(true); // Show the auth form
        }}
      >
        Get Started
      </button>
      <br />
      <img
        className="img2"
        src="https://www.carscoops.com/wp-content/uploads/2020/08/Hyundai-Elantra-N-Line-i30-Sedan-27.jpg"
        alt=""
      />
      <p className="p2">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Mollitia laudantium deleniti vitae neque possimus magni, voluptates cumque placeat, totam illo, aperiam minima excepturi aspernatur deserunt dolores fugiat dolorum numquam eum?
      </p>
    </div>
  );
};

// Footer Component
const Footer = () => {
  return (
    <div className="footer-section">
      <h3>Contact Information</h3>
      <p>Email: info@example.com</p>
      <p>Phone: +123 456 7890</p>
      <p>Address: 123, Main Street, City, Country</p>
      <div className="footer-bottom">
        <p>&copy; 2024 Landing Page. All rights reserved.</p>
      </div>
    </div>
  );
};

export default App;