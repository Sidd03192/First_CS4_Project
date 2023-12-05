// LevelsPage.jsx

import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { collection, getDocs, doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase'; // Update the path based on your project structure
import { getAuth } from 'firebase/auth';
import AddLevelForm from './AddLevelForm'; // Update the path based on your project structure
import "./Levels.css"
const LevelsPage = () => {
  const { levelId } = useParams();
  const [user, setUser] = useState(getAuth().currentUser);
  const [levels, setLevels] = useState([]);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchLevels = async () => {
      try {
        const levelsCollection = collection(db, 'levels');
        const levelsSnapshot = await getDocs(levelsCollection);

        const levelsData = levelsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setLevels(levelsData);
      } catch (error) {
        console.error('Error fetching levels:', error);
      }
    };

    fetchLevels();
  }, []);

  const handleAddLevel = async () => {
    try {
      // Assuming you have a 'levels' collection and each document contains a 'questions' subcollection
      const levelsCollection = collection(db, 'levels', user.uid);
      const newLevelRef = doc(levelsCollection, levelId);

      // Add the question and answer to the 'questions' subcollection
      const questionsCollection = collection(newLevelRef, 'questions');
      await setDoc(questionsCollection, {
        question: 'Sample Question',
        answer: 'Sample Answer',
        created_at: new Date(),
      });

      // Fetch levels again to update the state
      const updatedLevelsSnapshot = await getDocs(levelsCollection);
      const updatedLevelsData = updatedLevelsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setLevels(updatedLevelsData);
    } catch (error) {
      console.error('Error adding level:', error);
    }
  };

  return (
    <div className="level">
      <h1>Levels</h1>
      {user && (
        <>
          <p>Welcome, {user.displayName}!</p>
          {/* Render AddLevelForm only for authenticated users */}
          <AddLevelForm userId={user.uid} />
          <button onClick={handleAddLevel}>Add Sample Level</button>
        </>
      )}
      <ul>
        {levels.map((level) => (
          <li key={level.id}>
            {/* Link to the LevelDetailPage for the specific level */}
            <Link to={`/level/${level.id}`}>{`Level ${level.id}`}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LevelsPage;
