import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import CatUploader from './CatUploader';
import CatViewer from "./CatViewer";
import './App.css';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCJCn48g6j1AAraqH3SPRTg7Em2yP2qJoE",
  authDomain: "fir-gdsc-demo-sadie.firebaseapp.com",
  projectId: "fir-gdsc-demo-sadie",
  storageBucket: "fir-gdsc-demo-sadie.appspot.com",
  messagingSenderId: "378246980732",
  appId: "1:378246980732:web:37db935f54879884ba55f9",
  measurementId: "G-Y1ZV7VEHM5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null); // State variable to hold the user data


  useEffect(() => {
    // Check if user is logged in on initial load
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is logged in
        setUser(user);
      } else {
        // No user is signed in
        setUser(null);
      }
    });

    // Unsubscribe when component unmounts
    return () => unsubscribe();
  }, [auth]);

  const handleSignUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // User signed up successfully
      console.log(userCredential.user);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSignIn = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      // User signed in successfully
      console.log(userCredential.user);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth); // Firebase sign out method
      setUser(null); // Clear the user state
    } catch (error) {
      setError(error.message);
    }
  };

  if(user){
    return(
      <div className="App">
      <div className="App-content">
        <div className="logout-btn">
          <button onClick={handleLogout}>Logout</button>
        </div>
        <h2>Welcome, {user.email}!</h2>
        <CatUploader></CatUploader>
        <CatViewer></CatViewer>
      </div>
      </div>
     
    );
  }
  return (
    <div className="App">
      <header className="App-header">
        Firebase Authentication Demo
      </header>
      <div className="App-content">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleSignUp}>Sign Up</button>
        <button onClick={handleSignIn}>Sign In</button>
        {error && <p>{error}</p>}
      </div>
    </div>
  );
}

export default App;

