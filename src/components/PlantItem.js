import React, { useState } from 'react';
import TextField from './TextField';
import GrowthTracker from './GrowthTracker';
import Reminders from './Reminders';

const PlantItem = ({ plant, index, onDelete, onUpdate, onUpload }) => {
  const [expanded, setExpanded] = useState(false);
  const [showGrowth, setShowGrowth] = useState(false);
  const [showReminders, setShowReminders] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedPlant, setEditedPlant] = useState({ ...plant });

  const handleEditSubmit = () => {
    onUpdate(index, editedPlant);
    setIsEditing(false);
  };

  const handleEditInputChange = (field, value) => {
    setEditedPlant(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div style={{ border: '1px solid #ddd', padding: '10px', margin: '10px' }}>
      <div>
        {plant.images.length > 0 && <img src={plant.images[0]} alt="Plant" style={{ width: '80px', height: '80px' }} />}
        <h4>{plant.name}</h4>
        <button onClick={() => setExpanded(!expanded)}>
          {expanded ? 'Hide Details' : 'Show Details'}
        </button>
      </div>

      {expanded && (
        <div>
          {isEditing ? (
            <>
              <TextField onSubmit={(value) => handleEditInputChange("name", value)} initialValue={editedPlant.name} />
              <TextField onSubmit={(value) => handleEditInputChange("species", value)} initialValue={editedPlant.species} />
              <input type="date" value={editedPlant.datePlanted} onChange={(e) => handleEditInputChange("datePlanted", e.target.value)} />
              <select value={editedPlant.location} onChange={(e) => handleEditInputChange("location", e.target.value)}>
                <option value="">Location</option>
                <option value="Indoor">Indoor</option>
                <option value="Outdoor">Outdoor</option>
              </select>
              <select value={editedPlant.sunlight} onChange={(e) => handleEditInputChange("sunlight", e.target.value)}>
                <option value="">Sunlight</option>
                <option value="Full">Full</option>
                <option value="Partial">Partial</option>
                <option value="Shade">Shade</option>
              </select>
              <select value={editedPlant.wateringFrequency} onChange={(e) => handleEditInputChange("wateringFrequency", e.target.value)}>
                <option value="">Watering Frequency</option>
                <option value="Daily">Daily</option>
                <option value="Every Other Day">Every Other Day</option>
                <option value="Weekly">Weekly</option>
                <option value="Bi-Weekly">Bi-Weekly</option>
              </select>
              <textarea value={editedPlant.notes} onChange={(e) => handleEditInputChange("notes", e.target.value)} />
            </>
            
          ) : (
            <>
              {plant.species && <p><strong>Species:</strong> {plant.species}</p>}
              {plant.datePlanted && <p><strong>Date Planted:</strong> {plant.datePlanted}</p>}
              {plant.location && <p><strong>Location:</strong> {plant.location}</p>}
              {plant.sunlight && <p><strong>Sunlight:</strong> {plant.sunlight}</p>}
              {plant.wateringFrequency && <p><strong>Watering Frequency:</strong> {plant.wateringFrequency}</p>}
              {plant.notes && <p><strong>Notes:</strong> {plant.notes}</p>}
            </>
          )}


          {isEditing ? (
            <>
              <button onClick={handleEditSubmit}>Save</button>
              <button onClick={() => setIsEditing(false)}>Cancel</button>
            </>
          ) : (
            <button onClick={() => setIsEditing(true)}>Edit</button>
          )}

          <button onClick={() => onDelete(index)}>Delete</button>

          <button onClick={() => setShowGrowth(!showGrowth)}>
            {showGrowth ? 'Hide Growth' : 'Track Growth'}
          </button>
          <button onClick={() => setShowReminders(!showReminders)}>
            {showReminders ? 'Hide Reminders' : 'Set Reminders'}
          </button>

          {showGrowth && <GrowthTracker plantName={plant.name} onClose={() => setShowGrowth(false)} />}
          {showReminders && <Reminders plantName={plant.name} onClose={() => setShowReminders(false)} />}
        </div>
      )}
    </div>
  );
};

export default PlantItem;