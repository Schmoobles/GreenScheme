import React, { useState, useEffect } from 'react';
import PlantItem from './PlantItem';

const AddPlant = () => {
  const [plants, setPlants] = useState([]);
  const [newPlant, setNewPlant] = useState({
    name: '',
    species: '',
    datePlanted: '',
    location: '',
    sunlight: '',
    wateringFrequency: '',
    notes: '',
    images: [],
  });

  useEffect(() => {
    setPlants(JSON.parse(localStorage.getItem('plants')) || []);
  }, []);

  useEffect(() => {
    localStorage.setItem('plants', JSON.stringify(plants));
  }, [plants]);

  const handleInputChange = (e) => {
    setNewPlant({ ...newPlant, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const readers = files.map(file => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });
    });

    Promise.all(readers).then(images => {
      setNewPlant(prev => ({ ...prev, images: [...prev.images, ...images] }));
    });
  };

  const handleAddPlant = (e) => {
    e.preventDefault();
    if (!newPlant.name.trim()) return;

    setPlants([...plants, newPlant]);

    // Reset the form fields after submission
    setNewPlant({
      name: '',
      species: '',
      datePlanted: '',
      location: '',
      sunlight: '',
      wateringFrequency: '',
      notes: '',
      images: [],
    });
  };

  const handleUpdatePlant = (index, updatedPlant) => {
    const updatedPlants = plants.map((plant, i) =>
      i === index ? updatedPlant : plant
    );
    setPlants(updatedPlants);
  };

  return (
    <div>
      <h3>Add a Plant 🌱</h3>
      <form onSubmit={handleAddPlant}> {/* ✅ Fixed onSubmit Handler */}
        <input type="text" name="name" placeholder="Plant Name (required)" value={newPlant.name} onChange={handleInputChange} required />
        <input type="text" name="species" placeholder="Species" value={newPlant.species} onChange={handleInputChange} />
        <input type="date" name="datePlanted" value={newPlant.datePlanted} onChange={handleInputChange} />
        
        <select name="location" value={newPlant.location} onChange={handleInputChange}>
          <option value="">Location</option>
          <option value="Indoor">Indoor</option>
          <option value="Outdoor">Outdoor</option>
        </select>

        <select name="sunlight" value={newPlant.sunlight} onChange={handleInputChange}>
          <option value="">Sunlight</option>
          <option value="Full">Full</option>
          <option value="Partial">Partial</option>
          <option value="Shade">Shade</option>
        </select>

        <select name="wateringFrequency" value={newPlant.wateringFrequency} onChange={handleInputChange}>
          <option value="">Watering Frequency</option>
          <option value="Daily">Daily</option>
          <option value="Every Other Day">Every Other Day</option>
          <option value="Weekly">Weekly</option>
          <option value="Bi-Weekly">Bi-Weekly</option>
        </select>

        <textarea name="notes" placeholder="Additional notes..." value={newPlant.notes} onChange={handleInputChange} />
        <input type="file" accept="image/*" multiple onChange={handleImageUpload} />
        <button type="submit">Add Plant</button>
      </form>

      <h3>My Plants 🌿</h3>
      <div>
        {plants.map((plant, index) => (
          <PlantItem 
            key={index} 
            plant={plant} 
            index={index} 
            onDelete={() => setPlants(plants.filter((_, i) => i !== index))}
            onUpdate={handleUpdatePlant}
             
          />
        ))}
      </div>
    </div>
  );
};

export default AddPlant;