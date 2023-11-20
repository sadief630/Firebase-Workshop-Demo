import { useState, useEffect } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import './CatViewer.css';


function CatViewer() {
  const [cats, setCats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const db = getDatabase(); // Firebase database instance
    const catRef = ref(db, "cats"); // Reference to the "cats" node in database

    // Fetch all cat data when component mounts
    onValue(catRef, (snapshot) => {
      const catData = snapshot.val();
      if (catData) {
        const catArray = Object.values(catData);
        setCats(catArray);
      } else {
        setCats([]);
      }
      setLoading(false);
    }, (error) => {
      setError(error.message);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h2>All Cats</h2>
      <div className="cat-list">
        {cats.map((cat, index) => (
          <div key={index} className="cat-item">
            <h3>{cat.name}</h3>
            <p>Age: {cat.age}</p>
            <p>Breed: {cat.breed}</p>
            <p>Color: {cat.color}</p>
            <p>Likes: {cat.likes.join(", ")}</p>
            <img src={cat.image} alt={cat.name} style={{ maxWidth: "200px" }} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default CatViewer;
