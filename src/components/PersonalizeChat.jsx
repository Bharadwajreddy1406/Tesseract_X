// import React, { useState } from "react";
// import axios from "axios"; // Import Axios for making HTTP requests

// const PersonalizeChat = () => {
//     const [conversations, setConversations] = useState([]);
//     const [message, setMessage] = useState("");

//     const handleSendMessage = async () => {
//         if (message.trim() === "") {
//             // If the question is empty, do nothing
//             return;
//         }

//         try {
//             // Make a POST request to send the message to the API
//             const response = await axios.post("http://localhost:5000/send_message", {
//                 source_id: "src_A7K8asUajrvouj6mD5nlI", // Replace with your source ID
//                 content: message
//             });
            
//             // Log the response for demonstration purposes
//             console.log("API Response:", response.data);

//             // Update the conversations object with the new question and answer
//             setConversations((prevConversations) => [
//                 ...prevConversations,
//                 { question: message, answer: response.data.response } // Assuming the response contains the answer
//             ]);

//             // Clear the input field after sending the message
//             setMessage("");
//         } catch (error) {
//             console.error("Error sending message:", error);
//         }
//     };

//     return (
//         <div className=" flex flex-col-reverse">
//             <div className="p-10">
//                 {conversations.map((conversation, index) => (
//                     <div className='mb-4' key={index}>
//                         <p className="pb-3">Question: {conversation.question}</p>
//                         <p>Answer: {conversation.answer}</p>
//                     </div>
//                 ))}
//             </div>
//             <div className="p-10">
//                 <input
//                     className=" bg-slate-100 active:border-l-violet-100 p-2 border-2 rounded-lg px-6 w-5/6 mr-20"
//                     type="text"
//                     placeholder="Type your question"
//                     value={message}
//                     onChange={(e) => setMessage(e.target.value)}
//                 />
//                 <button
//                     type="button"
//                     onClick={handleSendMessage}
//                     className="p-2 px-2 rounded-xl bg-slate-300"
//                 >
//                     Send
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default PersonalizeChat;

//   Speech   /////

// import React, { useState } from "react";

// const PersonalizeChat = () => {
//     const [conversations, setConversations] = useState([]);
//     const [message, setMessage] = useState("");
    
//     // Function to handle speech synthesis
//     const speakAnswer = (answer) => {
//         const speechSynthesis = window.speechSynthesis;
//         const speechText = new SpeechSynthesisUtterance(answer);
//         speechSynthesis.speak(speechText);
//     };

//     const handleSendMessage = async () => {
//         if (message.trim() === "") {
//             // If the question is empty, do nothing
//             return;
//         }

//         try {
//             // Make a POST request to send the message to the API
//             const response = await fetch("http://localhost:5000/send_message", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json"
//                 },
//                 body: JSON.stringify({
//                     source_id: "src_A7K8asUajrvouj6mD5nlI", // Replace with your source ID
//                     content: message
//                 })
//             });

//             if (!response.ok) {
//                 throw new Error("Failed to send message");
//             }

//             const responseData = await response.json();

//             // Update the conversations object with the new question and answer
//             setConversations((prevConversations) => [
//                 ...prevConversations,
//                 { question: message, answer: responseData.response } // Assuming the response contains the answer
//             ]);

//             // Clear the input field after sending the message
//             setMessage("");
//         } catch (error) {
//             console.error("Error sending message:", error);
//         }
//     };

//     return (
//         <div className=" flex flex-col-reverse">
//             <div className="p-10">
//                 {conversations.map((conversation, index) => (
//                     <div className='mb-4' key={index}>
//                         <p className="pb-3">Question: {conversation.question}</p>
//                         <p>Answer: {conversation.answer}</p>
//                         <button 
//                             onClick={() => speakAnswer(conversation.answer)} // Call speakAnswer function with the answer
//                             className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//                         >
//                             Speak Answer
//                         </button>
//                     </div>
//                 ))}
//             </div>
//             <div className="p-10">
//                 <input
//                     className=" bg-slate-100 active:border-l-violet-100 p-2 border-2 rounded-lg px-6 w-5/6 mr-20"
//                     type="text"
//                     placeholder="Type your question"
//                     value={message}
//                     onChange={(e) => setMessage(e.target.value)}
//                 />
//                 <button
//                     type="button"
//                     onClick={handleSendMessage}
//                     className="p-2 px-2 rounded-xl bg-slate-300"
//                 >
//                     Send
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default PersonalizeChat;



// import React, { useState, useRef } from "react";
// import useSpeechToText from 'react-hook-speech-to-text';

// const PersonalizeChat = () => {
//     const [conversations, setConversations] = useState([]);
//     const [message, setMessage] = useState("");
//     const [speakingAnswerIndex, setSpeakingAnswerIndex] = useState(null);
//     const recognition = useRef(null);
    
//     const {
//         error: speechError,
//         interimResult,
//         isRecording,
//         results,
//         startSpeechToText,
//         stopSpeechToText,
//     } = useSpeechToText({
//         continuous: false,
//         useLegacyResults: false
//     });

//     // Function to handle speech synthesis
//     const speakAnswer = (index, answer) => {
//         const speechSynthesis = window.speechSynthesis;

//         // If speech is already being spoken for the same answer, stop speaking
//         if (index === speakingAnswerIndex) {
//             speechSynthesis.cancel();
//             setSpeakingAnswerIndex(null);
//         } else {
//             // Otherwise, start speaking the answer
//             const speechText = new SpeechSynthesisUtterance(answer);
//             speechSynthesis.speak(speechText);
//             setSpeakingAnswerIndex(index);
//         }
//     };

//     // Function to handle sending the message
//     const handleSendMessage = async () => {
//         if (message.trim() === "") {
//             // If the message is empty, do nothing
//             return;
//         }

//         try {
//             // Make a POST request to send the message to the API
//             const response = await fetch("http://localhost:5000/send_message", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json"
//                 },
//                 body: JSON.stringify({
//                     source_id: "src_A7K8asUajrvouj6mD5nlI", 
//                     content: message
//                 })
//             });

//             if (!response.ok) {
//                 throw new Error("Failed to send message");
//             }

//             const responseData = await response.json();

//             // Update the conversations object with the new question and answer
//             setConversations((prevConversations) => [
//                 ...prevConversations,
//                 { question: message, answer: responseData.response } // Assuming the response contains the answer
//             ]);

//             // Clear the input field after sending the message
//             setMessage("");
//         } catch (error) {
//             console.error("Error sending message:", error);
//         }
//     };

//     return (
//         <div className="flex flex-col-reverse">
//             <div className="p-10">
//                 {conversations.map((conversation, index) => (
//                     <div className='mb-4' key={index}>
//                         <p className="pb-3">Question: {conversation.question}</p>
//                         <p>Answer: {conversation.answer}</p>
//                         <button 
//                             onClick={() => speakAnswer(index, conversation.answer)} // Call speakAnswer function with the answer and index
//                             className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//                         >
//                             {speakingAnswerIndex === index ? "Stop Speech" : "Speak Answer"}
//                         </button>
//                     </div>
//                 ))}
//             </div>
//             <div className="p-10 relative">
//                 <input
//                     className="bg-slate-100 active:border-l-violet-100 p-2 border-2 rounded-lg px-6 w-4/6 mr-20"
//                     type="text"
//                     placeholder="Type your question"
//                     value={message}
//                     onChange={(e) => setMessage(e.target.value)}
//                 />
//                 <button
//                     type="button"
//                     onClick={startSpeechToText} // Start speech recognition when the button is clicked
//                     className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 px-2 rounded-xl bg-slate-300"
//                 >
//                     Start Recording
//                 </button>
//                 <button
//                     type="button"
//                     onClick={stopSpeechToText} // Stop speech recognition when the button is clicked
//                     className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 px-2 rounded-xl bg-slate-300"
//                 >
//                     Stop Recording
//                 </button>
//                 <button
//                     type="button"
//                     onClick={handleSendMessage}
//                     className="p-2 px-2 rounded-xl bg-slate-300"
//                 >
//                     Send
//                 </button>
//             </div>
//             {speechError && <p>Error: {speechError}</p>}
//             <div>
//                 <h1>Recording: {isRecording.toString()}</h1>
//                 <ul>
//                     {results.map((result, index) => (
//                         <li key={index}>{result.transcript}</li>
//                     ))}
//                     {interimResult && <li>{interimResult}</li>}
//                 </ul>
//             </div>
//         </div>
//     );
// };

// export default PersonalizeChat;




// working speak and stop

import React, { useState } from "react";

const PersonalizeChat = () => {
    const [conversations, setConversations] = useState([]);
    const [message, setMessage] = useState("");
    const [speakingAnswerIndex, setSpeakingAnswerIndex] = useState(null);

    // Function to handle speech synthesis
    const speakAnswer = (index, answer) => {
        const speechSynthesis = window.speechSynthesis;

        // If speech is already being spoken for the same answer, stop speaking
        if (index === speakingAnswerIndex) {
            speechSynthesis.cancel();
            setSpeakingAnswerIndex(null);
        } else {
            // Otherwise, start speaking the answer
            const speechText = new SpeechSynthesisUtterance(answer);
            speechSynthesis.speak(speechText);
            setSpeakingAnswerIndex(index);
        }
    };

    const handleSendMessage = async () => {
        if (message.trim() === "") {
            // If the question is empty, do nothing
            return;
        }

        try {
            // Make a POST request to send the message to the API
            const response = await fetch("http://localhost:5000/send_message", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    source_id: "src_A7K8asUajrvouj6mD5nlI", // Replace with your source ID
                    content: message
                })
            });

            if (!response.ok) {
                throw new Error("Failed to send message");
            }

            const responseData = await response.json();

            // Update the conversations object with the new question and answer
            setConversations((prevConversations) => [
                ...prevConversations,
                { question: message, answer: responseData.response } // Assuming the response contains the answer
            ]);

            // Clear the input field after sending the message
            setMessage("");
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    return (
        <div className=" flex flex-col-reverse">
            <div className="p-10">
                {conversations.map((conversation, index) => (
                    <div className='mb-4' key={index}>
                        <p className="pb-3">Question: {conversation.question}</p>
                        <p>Answer: {conversation.answer}</p>
                        <button 
                            onClick={() => speakAnswer(index, conversation.answer)} // Call speakAnswer function with the answer and index
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                            {speakingAnswerIndex === index ? "Stop Speech" : "Speak Answer"}
                        </button>
                    </div>
                ))}
            </div>
            <div className="p-10">
                <input
                    className=" bg-slate-100 active:border-l-violet-100 p-2 border-2 rounded-lg px-6 w-5/6 mr-20"
                    type="text"
                    placeholder="Type your question"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button
                    type="button"
                    onClick={handleSendMessage}
                    className="p-2 px-2 rounded-xl bg-slate-300"
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default PersonalizeChat;


// Not working 
// import React, { useState, useRef } from "react";

// const PersonalizeChat = () => {
//     const [conversations, setConversations] = useState([]);
//     const [message, setMessage] = useState("");
//     const [speakingAnswerIndex, setSpeakingAnswerIndex] = useState(null);
//     const recognition = useRef(null);

//     // Function to handle speech synthesis
//     const speakAnswer = (index, answer) => {
//         const speechSynthesis = window.speechSynthesis;

//         // If speech is already being spoken for the same answer, stop speaking
//         if (index === speakingAnswerIndex) {
//             speechSynthesis.cancel();
//             setSpeakingAnswerIndex(null);
//         } else {
//             // Otherwise, start speaking the answer
//             const speechText = new SpeechSynthesisUtterance(answer);
//             speechSynthesis.speak(speechText);
//             setSpeakingAnswerIndex(index);
//         }
//     };

//     // Function to start speech recognition
//     const startListening = () => {
//         recognition.current = new window.webkitSpeechRecognition(); // Create a new instance of speech recognition
//         recognition.current.lang = "en-US"; // Set the language to English
//         recognition.current.interimResults = false; // Disable interim results
//         recognition.current.continuous = false; // Disable continuous listening
        
//         recognition.current.onresult = (event) => {
//             const transcript = event.results[0][0].transcript; // Get the transcript of the speech
//             setMessage(transcript); // Set the message state to the transcript
//             recognition.current.stop(); // Stop speech recognition
//         };

//         recognition.current.start(); // Start speech recognition
//     };

//     const handleSendMessage = async () => {
//         if (message.trim() === "") {
//             // If the question is empty, do nothing
//             return;
//         }

//         try {
//             // Make a POST request to send the message to the API
//             const response = await fetch("http://localhost:5000/send_message", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json"
//                 },
//                 body: JSON.stringify({
//                     source_id: "src_A7K8asUajrvouj6mD5nlI", // Replace with your source ID
//                     content: message
//                 })
//             });

//             if (!response.ok) {
//                 throw new Error("Failed to send message");
//             }

//             const responseData = await response.json();

//             // Update the conversations object with the new question and answer
//             setConversations((prevConversations) => [
//                 ...prevConversations,
//                 { question: message, answer: responseData.response } // Assuming the response contains the answer
//             ]);

//             // Clear the input field after sending the message
//             setMessage("");
//         } catch (error) {
//             console.error("Error sending message:", error);
//         }
//     };

//     return (
//         <div className=" flex flex-col-reverse">
//             <div className="p-10">
//                 {conversations.map((conversation, index) => (
//                     <div className='mb-4' key={index}>
//                         <p className="pb-3">Question: {conversation.question}</p>
//                         <p>Answer: {conversation.answer}</p>
//                         <button 
//                             onClick={() => speakAnswer(index, conversation.answer)} // Call speakAnswer function with the answer and index
//                             className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//                         >
//                             {speakingAnswerIndex === index ? "Stop Speech" : "Speak Answer"}
//                         </button>
//                     </div>
//                 ))}
//             </div>
//             <div className="p-10 relative">
//                 <input
//                     className=" bg-slate-100 active:border-l-violet-100 p-2 border-2 rounded-lg px-6 w-4/6 mr-20"
//                     type="text"
//                     placeholder="Type your question"
//                     value={message}
//                     onChange={(e) => setMessage(e.target.value)}
//                 />
//                 <button
//                     type="button"
//                     onClick={startListening}
//                     className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 px-2 rounded-xl bg-slate-300"
//                 >
//                     Listen
//                 </button>
//                 <button
//                     type="button"
//                     onClick={handleSendMessage}
//                     className="p-2 px-2 rounded-xl bg-slate-300"
//                 >
//                     Send
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default PersonalizeChat;

