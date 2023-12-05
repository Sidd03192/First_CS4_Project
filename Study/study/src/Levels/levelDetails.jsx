// LevelDetailPage.jsx

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  getDocs,
  collection,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
  increment,
} from 'firebase/firestore';
import { db } from '../firebase'; // Update the path based on your project structure
import { getAuth } from 'firebase/auth';
import AddLevelForm from './AddLevelForm'; // Update the path based on your project structure
import "./Levels.css";
const LevelDetailPage = () => {
  const { levelId } = useParams();
  const [user, setUser] = useState(getAuth().currentUser);
  const [levels, setLevels] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [userProgress, setUserProgress] = useState(0);

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

    const fetchUserProgress = async () => {
      try {
        if (user) {
          const userRef = doc(db, 'users', user.uid);
          const levelProgressRef = doc(userRef, 'progress', `level${levelId}`);
          const levelProgressSnapshot = await getDoc(levelProgressRef);

          if (levelProgressSnapshot.exists()) {
            setUserProgress(levelProgressSnapshot.data().progress);
          } else {
            setUserProgress(0);
          }
        }
      } catch (error) {
        console.error('Error fetching user progress:', error);
      }
    };

    fetchLevels();
    fetchUserProgress();
  }, [levelId, user]);

  const currentLevel = levels.find((level) => level.id === levelId);
  const currentQuestionIndex = userProgress;

  const handleAnswer = async (userAnswer) => {
    try {
      const currentQuestion = questions[currentQuestionIndex];

      // Check if the user's answer is correct
      const isCorrect = userAnswer === currentQuestion.answer;

      // Handle the user's answer (e.g., update progress in Firestore)
      if (isCorrect) {
        // Update user progress in Firestore
        if (user) {
          const userRef = doc(db, 'users', user.uid);
          const levelProgressRef = doc(userRef, 'progress', `level${levelId}`);
          await updateDoc(levelProgressRef, { progress: increment(1) });

          // Move to the next question if available
          if (currentQuestionIndex + 1 < questions.length) {
            setUserProgress(userProgress + 1);
          } else {
            // Handle moving to the next level or completion logic
            console.log('User has completed all questions for this level');
          }
        }
      } else {
        console.log('Incorrect answer. Please try again.');
        // You can handle incorrect answers here (e.g., display a message)
      }
    } catch (error) {
      console.error('Error handling answer:', error);
    }
  };

  return (
    <div>
      <h2>{currentLevel && `Level ${currentLevel.id}`}</h2>
      {user && (
        <>
          <p>Welcome, {user.displayName}!</p>
          <p>Your progress: {userProgress} / 10</p>
          {/* Render AddLevelForm only for authenticated users */}
          <AddLevelForm userId={user.uid} />
        </>
      )}
      {questions.length > 0 && userProgress < questions.length && (
        <div>
          <p>{questions[userProgress].question}</p>
          <input type="text" placeholder="Type your answer" />
          <button onClick={() => handleAnswer('userInput')}>Submit Answer</button>
        </div>
      )}
    </div>
  );
};

export default LevelDetailPage;
