// LevelsPage.jsx

import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { collection, getDocs, doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase'; // Update the path based on your project structure
import { getAuth } from 'firebase/auth';
import AddLevelForm from './AddLevelForm'; // Update the path based on your project structure
import "./Levels.css"
const LevelsPage = (props) => {
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

  

  return (
    <div className="level">
      <h1>Levels</h1>

      <ul className='levels'>
        {levels.map((level) => (
          <li key={level.id}>
            {/* Link to the LevelDetailPage for the specific level */}
            <Link className="levels" to={`/level/${level.id}`}>{`Level ${level.id}`}</Link>
          </li>
        ))}
      </ul>

      {user && (
        <>
          <p>Hi {user.displayName} ! Lets get to learning </p>
          
          {/* Render AddLevelForm only for me !*/}
          {user.uid === 'HFI6oa0nZcM3bZeWsvidUaMqMoi2' && <AddLevelForm currentUser={user} />}
        </>
      )}
    </div>
  );
  
};

export default LevelsPage;
