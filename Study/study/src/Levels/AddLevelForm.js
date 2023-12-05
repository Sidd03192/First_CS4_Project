// AddLevelForm.jsx

import React, { useState, useEffect } from 'react';
import { collection, addDoc, serverTimestamp, getDocs } from 'firebase/firestore';
import { db } from '../firebase'; 
import "./Levels.css"


const AddLevelForm = ({ userId }) => {
  const [selectedLevel, setSelectedLevel] = useState('');
  const [newLevelName, setNewLevelName] = useState('');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [levels, setLevels] = useState([]);

  useEffect(() => {
    const fetchLevels = async () => {
      try {
       // Assuming you have a user-specific `userId` available
// Fetch all levels
const levelsCollection = collection(db, 'levels');  // Assuming 'levels' is the top-level collection for all levels
const levelsSnapshot = await getDocs(levelsCollection);

const allLevelsData = levelsSnapshot.docs.map((levelDoc) => ({
  id: levelDoc.id,
  name: levelDoc.id, // You can use the document ID as the level name, or replace it with the actual name field if available
}));

setLevels(allLevelsData);




   
      } catch (error) {
        console.error('Error fetching levels:', error);
      }
    };

    fetchLevels();
  }, [userId]);

  const handleAddQuestion = async (e) => {
    e.preventDefault();

    try {
      let selectedLevelId = selectedLevel;

      // Check if a new level needs to be created
      if (selectedLevel === 'new') {
        if (!newLevelName) {
          console.error('Please enter a name for the new level.');
          return;
        }

        // Create a new level and get its ID
        const newLevelRef = await addDoc(collection(db, 'levels', userId), {
          name: newLevelName,
          created_at: serverTimestamp(),
        });
        selectedLevelId = newLevelRef.id;

        // Update the local levels state
        setLevels([...levels, { id: selectedLevelId, name: newLevelName }]);
        setNewLevelName(''); // Clear the new level name field
      }

      // Add the question and answer to the selected level's 'questions' subcollection
      const questionsCollection = collection(db, 'levels', userId, selectedLevelId, 'questions');
      await addDoc(questionsCollection, {
        question,
        answer,
        created_at: serverTimestamp(),
      });

      // Clear the form fields after submission
      setSelectedLevel('');
      setQuestion('');
      setAnswer('');
    } catch (error) {
      console.error('Error adding question:', error);
    }
  };

  return (
    <form className="add-level-form" onSubmit={handleAddQuestion}>
      <label>
        Select or Create Level:
        <select value={selectedLevel} onChange={(e) => setSelectedLevel(e.target.value)}>
          <option value="" disabled>Select or create a level</option>
          {levels.map((level) => (
            <option key={level.id} value={level.id}>{`Level ${level.name}`}</option>
          ))}
          <option value="new">Create New Level</option>
        </select>
      </label>
      {selectedLevel === 'new' && (
        <label>
          New Level Name:
          <input
            type="text"
            value={newLevelName}
            onChange={(e) => setNewLevelName(e.target.value)}
          />
        </label>
      )}
      <label>
        Question:
        <input type="text" value={question} onChange={(e) => setQuestion(e.target.value)} />
      </label>
      <label>
        Answer:
        <input type="text" value={answer} onChange={(e) => setAnswer(e.target.value)} />
      </label>
      <button type="submit">Add Question</button>
    </form>
  );
};

export default AddLevelForm;

