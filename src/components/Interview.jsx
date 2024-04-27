import React, { useState, useEffect, useRef } from "react";

const Interview = () => {
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [evaluationScore, setEvaluationScore] = useState(null);
    const useEffectHasRun = useRef(false); // Ref to track whether useEffect has run

    // Function to fetch a question from the API
    const fetchQuestion = async () => {
        try {
            // Make a GET request to fetch a question from the API
            const response = await fetch("http://localhost:5000/get_in_questions");
            const data = await response.json();
            const dataLength = data.questions.length;
            if (dataLength === 0) {
                return;
            }
            const randomIndex = Math.floor(Math.random() * dataLength);
            setQuestion(data.questions[randomIndex]);
        } catch (error) {
            console.error("Error fetching question:", error);
        }
    };

    // Function to submit the answer to the API
    const submitAnswer = async () => {
        try {
            // Make a POST request to submit the answer to the API
            const response = await fetch("http://localhost:5000/evaluate_in_score", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ question: question, answer: answer }),
            });
            const data = await response.json();
            setEvaluationScore(data.response);
        } catch (error) {
            console.error("Error submitting answer:", error);
        }
    };

    // Function to handle sending the answer
    const handleSendAnswer = () => {
        if (answer === "") {
            return; // Do nothing if the answer is a null string
        }
        submitAnswer();
    };

    // Function to fetch a new question
    const QuestionRender = () => {
        console.log("rendering")
        fetchQuestion(); // Fetch a new question
        setAnswer(""); // Clear the answer
        setEvaluationScore(null); // Clear the evaluation score
    };

    // useEffect hook to fetch a question when the component mounts
    useEffect(() => {
        if (!useEffectHasRun.current) {
            fetchQuestion();
            useEffectHasRun.current = true; // Update ref to indicate useEffect has run
        }
    }, []); // Empty dependency array to run only once when component mounts

    return (
        <div className="flex flex-col justify-center">
            <div className="p-10">
                <p><strong>Question:</strong> {question}</p>
            </div>
            <div className="p-10">
                <textarea
                    className="bg-slate-100 active:border-l-violet-100 p-2 h-[250px] border-2 rounded-lg px-6 py-5 w-full mr-20"
                    placeholder="Type your answer"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                />
                <div className="flex justify-center gap-10 w-200">
                    <button
                        type="button"
                        onClick={handleSendAnswer}
                        className="p-5 px-9 mt-10 shadow-xl rounded-xl bg-blue-200"
                    >
                        Submit
                    </button>
                    <button
                        type="button"
                        onClick={QuestionRender}
                        className="p-5 px-9 mt-10 shadow-xl rounded-xl bg-blue-200"
                    >
                        Next
                    </button>
                </div>
            </div>
            {evaluationScore !== null && (
                <div className="p-10">
                    <p>Feedback : {evaluationScore}</p>
                </div>
            )}
        </div>
    );
};

export default Interview;
