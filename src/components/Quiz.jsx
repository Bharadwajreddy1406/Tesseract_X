import React, { useState, useEffect } from 'react';
import { Button, FormGroup, Input } from 'reactstrap';
import Confetti from 'react-confetti';
import './QuizApp.css';

const QuizApp = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [score, setScore] = useState(0);

  const fetchQuestions = async () => {
    try {
      const response = await fetch('http://localhost:5000/get_mcq');
      const data = await response.json();
      setQuestions(data);
      setAnswers(Array(data.length).fill(''));
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const handleNext = () => {
    setCurrentQuestion(prev => prev + 1);
    setShowConfetti(false);
  };

  const handleAnswerSelect = (selectedAnswer) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestion] = selectedAnswer;
    setAnswers(updatedAnswers);
  };

  const handleSubmit = async () => {
    setShowResult(true);
    const newScore = answers.reduce((totalScore, selectedAnswer, index) => {
      const correctAnswer = questions[index].key_or_answer.trim(); // Trim to remove any leading/trailing spaces
      if (selectedAnswer === correctAnswer) {
        return totalScore + 1;
      }
      return totalScore;
    }, 0);
    setScore(newScore);
    setShowConfetti(newScore === questions.length);
  };

  return (
    <div className="flex flex-col w-full h-full items-center relative">
      <h1 className="text-2xl font-bold mb-4 mt-3 ">Quiz App</h1>
      {!showResult && questions.length > 0 && (
        <div className="w-full max-w-md">
          <h2 className="text-lg font-bold mb-2">{questions[currentQuestion].question}</h2>
          <FormGroup>
            {questions[currentQuestion].options.map((option, index) => (
              <div key={index} className="mb-2">
                <Input
                  type="radio"
                  name={`question-${currentQuestion}`}
                  value={option}
                  checked={answers[currentQuestion] === option}
                  onChange={() => handleAnswerSelect(option)}
                />
                <label className="ml-2">{option}</label>
              </div>
            ))}
          </FormGroup>
          {currentQuestion < questions.length - 1 && (
            <Button 
              className="w-50 p-5 mx-auto bg-blue-500 rounded-lg"
              color="primary" 
              onClick={() => handleNext()}
            >
              Next
            </Button>
          )}
          {currentQuestion === questions.length - 1 && (
            <Button 
              color="success" 
              onClick={handleSubmit} 
              className="w-50 p-5 mx-auto bg-green-500 rounded-lg"
            >
              Submit
            </Button>
          )}
        </div>
      )}
      {showResult && (
        <div className="200">
          <h2 className="font-bold mb-2 mt-5 text-3xl items-center">Quiz Result</h2>
          <p className="mb-4 font-bold text-lg mt-6 items-center">Score: {score}</p>
          {score === questions.length && (
            <>
              <img src='/greenbadge.png' alt="Confetti" className="h-25 w-25 items-center b mt-9 " />
              <p className="mb-4 font-bold text-lg mt-6 items-center"> Congratulations</p>
              <Confetti className="absolute top-0 left-0 w-full h-full" width={1000} height={1000} />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default QuizApp;
