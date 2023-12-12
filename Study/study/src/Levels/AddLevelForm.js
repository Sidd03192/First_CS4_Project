import React, { useState, useEffect } from 'react';
import { Button } from "@nextui-org/react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import {Select, SelectSection, SelectItem} from "@nextui-org/react";

const AddLevelForm = () => {
  const [levelName, setLevelName] = useState('');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [existingLevels, setExistingLevels] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState('');

  useEffect(() => {
    // Fetch existing levels for the dropdown
    const fetchLevels = async () => {
      try {
        // Replace this with your actual logic to fetch existing levels
        const levelsData = ['Level 1', 'Level 2', 'Level 3']; 
        setExistingLevels(levelsData);
      } catch (error) {
        console.error('Error fetching levels:', error);
      }
    };

    fetchLevels();
  }, []);

  const handleAddLevel = async () => {
    // Add your logic to handle adding a level
  };

  const handleAddQuestion = async () => {
    // Add your logic to handle adding a question
  };

  return (
    <Card shadow="sm" className="w-[350px]">
      <CardHeader>
        <CardTitle>Add New Level</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid gap-4">
            <div className="flex flex-col space-y-1.5">
              <label htmlFor="levelName">Level Name</label>
              <Input
                id="levelName"
                placeholder="Enter level name"
                value={levelName}
                onChange={(e) => setLevelName(e.target.value)}
              />
            </div>
            <Button variant="contained" onClick={handleAddLevel}>
              Add Level
            </Button>
          </div>
        </form>
        <hr className="my-4" />
        <form>
          <div className="grid gap-4">
            <div className="flex flex-col space-y-1.5">
              <label htmlFor="existingLevel">Select Existing Level</label>
              <Select>
                <SelectTrigger id="existingLevel">
                  <SelectValue>{selectedLevel || 'Select an existing level'}</SelectValue>
                </SelectTrigger>
                <SelectContent position="popper">
                  {existingLevels.map((level) => (
                    <SelectItem key={level} value={level} onClick={() => setSelectedLevel(level)}>
                      {level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col space-y-1.5">
              <label htmlFor="question">Question</label>
              <Input
                id="question"
                placeholder="Enter question"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <label htmlFor="answer">Answer</label>
              <Input
                id="answer"
                placeholder="Enter answer"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
              />
            </div>
            <Button variant="contained" onClick={handleAddQuestion}>
              Add Question
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddLevelForm;
