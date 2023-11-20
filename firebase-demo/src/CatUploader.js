import { useState } from "react";
import { getDatabase, ref, push } from "firebase/database";

import './CatUploader.css';

function CatUploader() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [breed, setBreed] = useState("");
  const [color, setColor] = useState("");
  const [likes, setLikes] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newCat = {
      name,
      age: parseInt(age), // Assuming age is a number
      breed,
      color,
      likes: likes.split(",").map((like) => like.trim()), // Convert string to array
      image,
    };

    try {
      const db = getDatabase(); // Firebase database instance
      const catRef = ref(db, "cats"); // Reference to the "cats" node in database
      await push(catRef, newCat); // Push new cat data to Firebase
      // Reset form fields after successful upload
      setName("");
      setAge("");
      setBreed("");
      setColor("");
      setLikes("");
      setImage("");
      setError(null);
      alert("Cat data uploaded successfully!");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="form-container">
      <h2>Upload a New Cat</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label>
          Age:
          <input type="number" value={age} onChange={(e) => setAge(e.target.value)} />
        </label>
        <label>
          Breed:
          <input type="text" value={breed} onChange={(e) => setBreed(e.target.value)} />
        </label>
        <label>
          Color:
          <input type="text" value={color} onChange={(e) => setColor(e.target.value)} />
        </label>
        <label>
          Likes (comma-separated):
          <input type="text" value={likes} onChange={(e) => setLikes(e.target.value)} />
        </label>
        <label>
          Image URL:
          <input type="text" value={image} onChange={(e) => setImage(e.target.value)} />
        </label>
        <button type="submit">Upload Cat</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
}

export default CatUploader;
