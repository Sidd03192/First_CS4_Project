// questions.js
import {addDoc,collection,onSnapshot,orderBy,query,serverTimestamp, where}from "firebase/firestore";

import React, { useState, useEffect } from 'react';
import { db } from '../components/firebase'; // Make sure to adjust the path based on your project structure

export const Question = () => {
  const [userProgress, setUserProgress] = useState(null);

  useEffect(() => {
    // Fetch user progress from Firestore based on the current user's UID
    const uid = 'uid1'; // Replace with the actual UID of the signed-in user
    const userProgressRef = db.collection('users').doc(uid).collection('progress');

    userProgressRef.get().then((snapshot) => {
      const progressData = {};
      snapshot.forEach((doc) => {
        progressData[doc.id] = doc.data();
      });
      setUserProgress(progressData);
    });
  }, []); // Ensure this effect runs only once on component mount

  // Rest of your component

  return (
    <div>
      <h1>Questions</h1>
      {userProgress && (
        <div>
          <h2>User Progress</h2>
          {Object.entries(userProgress).map(([level, numCorrect]) => (
            <div key={level}>
              <p>{`Level ${level}: ${numCorrect} questions answered correctly`}</p>
              {/* Add logic to display questions for this level */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

