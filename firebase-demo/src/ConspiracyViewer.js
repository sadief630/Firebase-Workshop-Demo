import { useState, useEffect } from "react";
import { getFirestore, collection, onSnapshot } from "firebase/firestore";

function ConspiracyViewer() {
  const [conspiracies, setConspiracies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const db = getFirestore(); // Firebase Firestore instance
    const conspiracyCollection = collection(db, "ConspiracyTheories"); // Reference to the "ConspiracyTheories" collection in Firestore

    const unsubscribe = onSnapshot(conspiracyCollection, (querySnapshot) => {
      const conspiracyData = [];
      querySnapshot.forEach((doc) => {
        conspiracyData.push({ id: doc.id, ...doc.data() });
      });
      setConspiracies(conspiracyData);
      setLoading(false);
    }, (error) => {
      setError(error.message);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h2>Conspiracy Theories</h2>
      <div className="conspiracy-list">
        {conspiracies.map((conspiracy) => (
          <div key={conspiracy.id} className="conspiracy-item">
            <h3>{conspiracy.title}</h3>
            <p>Description: {conspiracy.description}</p>
            <p>Evidence: {conspiracy.evidence}</p>
            <p>Believers: {conspiracy.believers.join(", ")}</p>
            {conspiracy.image && <img src={conspiracy.image} alt={conspiracy.title} style={{ maxWidth: "200px" }} />}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ConspiracyViewer;
