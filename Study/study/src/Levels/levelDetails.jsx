// LevelDetailPage.jsx
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {Input} from "@nextui-org/react";
import { useState, useEffect } from 'react';
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
import { db } from '../firebase';
import { getAuth } from 'firebase/auth';
import AddLevelForm from './AddLevelForm';
import { Alert } from '@mui/material';
import './Levels.css';

const LevelDetailPage = () => {

  const { levelId } = useParams();
  const [user, setUser] = useState(getAuth().currentUser);
  const [levels, setLevels] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [userProgress, setUserProgress] = useState();

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

    const fetchQuestions = async () => {
      try {
        console.log("attempting to fetch questions !")
        // Assuming you have a 'questions' collection under each level document
        const questionsCollection = collection(db, 'levels', levelId, 'questions');
        const questionsSnapshot = await getDocs(questionsCollection);
    
        const questionsData = questionsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
    
        setQuestions(questionsData);
        console.log("here are the questions "+ questionsData);
        console.log ("the first question is " +questions[0]);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };
    

    const fetchUserProgress = async () => {
      try {
        if (user) {
          const userRef = doc(db, 'users', user.uid);
          const levelProgressRef = doc(userRef, 'progress', levelId);
          const levelProgressSnapshot = await getDoc(levelProgressRef);

          if (levelProgressSnapshot.exists()) {
            setUserProgress(levelProgressSnapshot.data().correct); // Set to correct answers directly
          } else {
            setUserProgress(0);
          }
        }
      } catch (error) {
        console.error('Error fetching user progress:', error);
      }
    };
    fetchLevels();
    fetchQuestions();
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
          const levelRef = doc(userRef, 'progress', levelId);
  
          // Get the current progress data
          const progressSnapshot = await getDoc(levelRef);
          const currentProgress = progressSnapshot.data();
  
          // Update the "correct" field for the current level
          await updateDoc(levelRef, {
            correct: currentProgress.correct + 1,
          });
  
          console.log('User progress updated successfully.');
  
          // Set the user's progress to the total number of correct answers
          setUserProgress(currentProgress.correct);
  
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
    <div className='currentquestion'>
      <Alert />
      <h1 className='thislevel'>{currentLevel && `${currentLevel.id}`}</h1>
      {user && (
        <>
          <p className=''>Lets set started, {user.displayName}!</p>
          <p className='progress'>Your progress: {userProgress} / {questions.length}</p>
        </>
      )}
      {questions.length > 0 & userProgress < questions.length && (
  <div>
    <p className='thequestion'>{questions[userProgress].question}</p>
    <TextField className='answer'
      
      id='filled-basic' variant='filled'
      type="text" 
      placeholder="Type your answer"
      value={questions[userProgress].userAnswer || ''}
      onChange={(e) => {
        const updatedQuestions = [...questions];
        updatedQuestions[userProgress] = {
          ...updatedQuestions[userProgress],
          userAnswer: e.target.value,
        };
        setQuestions(updatedQuestions);
      }}
    />
    <button class="answerbutton" onClick={() => handleAnswer(questions[userProgress].userAnswer)}>
      Submit Answer
    </button>
  </div>
)}



      
    </div>
  );
};

export default LevelDetailPage;

