import "./Levels.css";
import React, { useState, useEffect } from 'react';
import { collection, addDoc, doc, setDoc, getDoc, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../firebase'; // Update the path based on your project structure


const AddLevelForm = (props) => {
  const [levelName, setLevelName] = useState('');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [existingLevels, setExistingLevels] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState('');

  useEffect(() => {
    // Fetch existing levels for the dropdown
    const fetchLevels = async () => {
      try {
        const levelsQuery = query(collection(db, 'levels'));
        const levelsSnapshot = await getDocs(levelsQuery);
        const levelsData = levelsSnapshot.docs.map((levelDoc) => levelDoc.id); // Use levelDoc.id instead of levelDoc.data().levelName
        setExistingLevels(levelsData);
      } catch (error) {
        console.error('Error fetching levels:', error);
      }
    };
      
    fetchLevels();
  }, []);

  const handleAddLevel = async () => {
    try {
      // Add a new level to the levels collection
      const levelDocRef = doc(db, 'levels', levelName);
      await setDoc(levelDocRef, { levelName });
  
      // Create a subcollection "questions" under the new level document
      const questionsCollectionRef = collection(levelDocRef, 'questions');
      await addDoc(questionsCollectionRef, { name: 'question1' /* Add any initial data for question1 */ });
  
      // Initialize user progress for the new level
      const usersQuery = query(collection(db, 'users'));
      const usersSnapshot = await getDocs(usersQuery);
      const updatePromises = [];
  
      // Loop through each user and initialize progress for the new level
      usersSnapshot.forEach((userDoc) => {
        const email = userDoc.data().email; // Get the user's email from the document
        const userUid = userDoc.id;
        updatePromises.push(
          initializeUserProgress(userUid, email, levelName)
        );
      });
  
      // Update user progress for the new level
      await Promise.all(updatePromises);
  
      console.log('Level added successfully!');
      setLevelName('');
    } catch (error) {
      console.error('Error adding level:', error);
    }
  };
  
  const initializeUserProgress = async (uid, email, levelName) => {
    try {
      console.log("attempting to update users levels now.")
      const userDocRef = doc(db, 'users', uid);
      const userProgressRef = doc(userDocRef, 'progress', levelName);
  
      // Initialize with correct: 0, total: 10 for the new level
      await setDoc(
        userProgressRef,
        { [levelName]: { correct: 0, total: 10 } },
        { merge: true }
      );
    } catch (error) {
      console.error('Error initializing user progress:', error);
    }
  };
  
  

  const handleAddQuestion = async () => {
    try {
      // Fetch the current user's progress
      const userDoc = await getDoc(doc(db, 'users', 'uid1')); // Replace 'uid1' with the actual user ID
      const userProgress = userDoc.data().progress || {};
  
      // Specify the level name where you want to add the question
      const levelNameToAddQuestion = selectedLevel || 'defaultLevel'; // Use a default level name if none is selected
  
      // Get the current progress for the specified level
      const levelProgress = userProgress[levelNameToAddQuestion] || { correct: 0, total: 0 };
  
      // Add a new question to the level's subcollection
      const questionData = {
        question: question,
        answer: answer,
      };
  
      const questionsCollectionRef = collection(db, 'users', 'uid1', 'progress', levelNameToAddQuestion, 'questions');
      await addDoc(questionsCollectionRef, questionData);
  
      // Update user progress for the specified level
      await setDoc(doc(db, 'users', 'uid1'), {
        progress: {
          ...userProgress,
          [levelNameToAddQuestion]: { ...levelProgress, total: levelProgress.total + 1 },
        },
      }, { merge: true });
  
      console.log('Question added successfully!');
    } catch (error) {
      console.error('Error adding question:', error);
    }
  };
  

  return (
    <div className="add-level-form">
      <h2>Add New Level</h2>
      <label>
        Level Name:
        <input type="text" value={levelName} onChange={(e) => setLevelName(e.target.value)} />
      </label>
      <button onClick={handleAddLevel}>Add Level</button>

      <h2>Add Question</h2>
      <label>
        Select Existing Level:
        {existingLevels.length > 0 ? (
          <select className="dropdown" value={selectedLevel} onChange={(e) => setSelectedLevel(e.target.value)}>
            <option className="dropdown" value="" disabled>Select an existing level</option>
            {existingLevels.map((level) => (
              <option key={level} value={level}>{level}</option>
            ))}
          </select>
        ) : (
          <div>No existing levels found</div>
        )}
      </label>
      <label>
        Question:
        <input type="text" value={question} onChange={(e) => setQuestion(e.target.value)} />
      </label>
      <label>
        Answer:
        <input type="text" value={answer} onChange={(e) => setAnswer(e.target.value)} />
      </label>
      <button onClick={handleAddQuestion}>Add Question</button>
    </div>
  );
};

export default AddLevelForm;