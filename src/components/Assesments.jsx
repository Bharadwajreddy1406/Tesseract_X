import React, { useState, useEffect } from "react";

const Assesments = () => {
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [evaluationScore, setEvaluationScore] = useState(null);

    // Function to fetch a question from the API
    const fetchQuestion = async () => {
        try {
            // Make a GET request to fetch a question from the API
            const response = await fetch("http://localhost:5000/get_questions");
            const data = await response.json();
            const dataLength = await data.questions.length
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
            const response = await fetch("http://localhost:5000/evaluate_score", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ question: question, content: answer }),
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

    // useEffect hook to fetch a question when the component mounts
    useEffect(() => {
        fetchQuestion();
    }, []);

    return (
        <div className="flex flex-col w-full justify-center">
            <div className="p-10 ">
                <p><strong>Question:</strong> {question}</p>
            </div>
            <div className="p-10">
                <textarea
                    className="bg-slate-100 active:border-l-violet-100 p-2 h-[250px] border-2 rounded-lg px-6 py-5 w-full mr-20"
                    placeholder="Type your answer"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                />
                <div className="flex justify-center">
                <button
                    type="button"
                    onClick={handleSendAnswer}
                    className="p-5 px-9  mt-10 shadow-xl rounded-xl bg-blue-200"
                >
                    Submit
                </button>
                </div>
            </div>
            {evaluationScore !== null && (
                <div className="p-10">
                    <p>Evaluation Score: {evaluationScore}</p>
                </div>
            )}
        </div>
    );
};

export default Assesments;
