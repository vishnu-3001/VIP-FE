import classes from "./Chat.module.css";
import icon from "../Util/up-arrow-svgrepo-com.svg"
import { useState,useRef } from "react";

// const resp=[{"question":"helllo",answer:"hi"},{"question":"how are you?",answer:"good"},{"question":"what is this?",answer:"this is a chat"}];
export default function Chat(){
    const [chatHistory, setChatHistory] = useState([]);
    const inputRef=useRef(null);
    async function handleClick() {
        const userInput = inputRef.current?.value;
        const beUrl = process.env.REACT_APP_BE_URL;
        const doc_id = sessionStorage.getItem("fileId");
        const response=await fetch(`${beUrl}api/v1/rag/chat`, {
            method: "POST",
            body: JSON.stringify({question:userInput, file_id: doc_id}),
            headers: {
                "Content-Type": "application/json"
            }
        });
        if(!response.ok){
            console.error("Error:", data);
            return;
        }
        const data=await response.json();
        console.log("Response:", data);
        setChatHistory(prevHistory => [...prevHistory, { question: data.question, answer: data.response[0] }]);
        inputRef.current.value = "";
      }
    return(
        <div>
            <h3>Chat with the document</h3>
            <div className={classes.messageContainer}>
                <textarea className={classes.text} ref={inputRef}></textarea>
                <button onClick={handleClick}><img src={icon} alt="send" className={classes.icon}/></button>
            </div>
            <div>
                {chatHistory.map((entry, i) => (
                <div key={i}>
                    <p><strong>You:</strong> {entry.question}</p>
                    <p><strong>Doc:</strong> {entry.answer}</p>
                </div>
                ))}
      </div>
        </div>
    )
}