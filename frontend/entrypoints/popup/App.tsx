import { useState, useRef, useEffect } from "react";
import { MdClose, MdOutlineMessage } from "react-icons/md";
import "./App.css";
import axios from "axios";

// https://github.com/zach1502/HumanBenchmarkBot

const App = () => {
  const [msgs, setMsgs] = useState<any>([]);
  const [curInput, setCurInput] = useState("");
  const [showInitialMessage, setShowInitialMessage] = useState(true);
  const [showDownloadButton, setShowDownloadButton] = useState(false);
  const [showPanel, setShowPanel] = useState();

  const [isVisible, setIsVisible] = useState(true); 

  const inputRef = useRef<HTMLInputElement>(null);
  
  // Simulating a bot response after the user sends a message
  // const getBotResponse = (userMsg: string) => {
  //   return new Promise((resolve) => {
  //     setTimeout(() => {
  //       resolve(`Bot: I received your message: "${userMsg}"`);
  //     }, 1000); // Simulate a delay for bot response
  //   });
  // };

  const sendMessage = async () => {
    console.log(window.location.href);
    if (curInput.trim() === "") return;

    setShowInitialMessage(false);

    setShowDownloadButton(/https?:\/\/[^\s]+/.test(curInput)); // check if the message contains a URL
    const userMsg = { text: curInput, sender: 'user' };
    setMsgs((prev:any) => [...prev, userMsg]);  // Add user message immediately

    const botResponse = await interact({ type: "text", payload: curInput });

    console.log(botResponse);
    const botMsg = { text: botResponse, sender: 'bot' };
    setMsgs((prev:any) => [...prev, botMsg]);
    console.log(curInput);

    setCurInput("");

    inputRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // const checkGithubURL = () => {
  //   const regex = /^https:\/\/github\.com\/[a-zA-Z0-9-]+\/[a-zA-Z0-9-]+$/;
  //   if (regex.test(curInput)) {
  //     setValidationMessage("Valid GitHub repository URL.");
  //   } else {
  //     setValidationMessage("Invalid GitHub repository URL.");
  //   }
  // }

  const interact = async (request: any) => {
    let somedata;
    const apiKey = "VF.DM.66e5c1c0380effe3d506deb7.zq9kiS8nAEfLUcYR";
    console.log("Using API Key: ", apiKey);
    // Use the API key in your Axios request
    somedata = axios.post(
      `https://general-runtime.voiceflow.com/state/user/66e57d0592f43d1a82365bbe/interact`,
      { request: request },
      {
        headers: {
          Authorization: apiKey,
          versionID: "66e57d0592f43d1a82365bbf",
          accept: "application/json",
          "content-type": "application/json",
        },
      }
    )
    .then(response => {
      console.log(response.data);
      let data = response.data;
      data = data.filter((x: any) => x.type === "text")[0];
      console.log(data.payload.message);
      return data.payload.message;
    })
    .catch(error => {
      console.error("Error:", error);
    });


  
    return somedata;
  };
  return (
    <div className="chat-container">
      <div className="chat-header">
        <span className="title">Octochat</span>
        <MdClose 
          onClick={() => setIsVisible(false)}
          size={24} 
          className="close-icon" 
        />
      </div>
      <div className="chat-window">
        {showInitialMessage &&
          <div className="header-text">
            <span className="cloud-icon">
              <img src="/icon/48.png" />
            </span>
            <p className="p1">Ask me anything about this repository!</p>
          </div>
        }
        {msgs.map((msg: any, index: number) => (
          <div key={index} className={`message ${msg.sender === 'user' ? 'user' : 'bot'}`}>
            {msg.sender === 'bot' && (
            <span className="message-icon">
                <img src="/icon/48.png" alt="Octo Logo" />
            </span>
            )}
            {msg.text}
          </div>
        ))}
        <div ref={inputRef}></div>
      </div>

      <div className="input-container">
        <input
          value={curInput}
          onChange={(e) => setCurInput(e.target.value)}
          placeholder="Ask a question..."
          className="input-box"
        />
        {showDownloadButton ? (
          <button className="download-button" onClick={() => {
            setShowDownloadButton(false)
            alert('Repo uploaded!')
          }}>
            Validate
          </button>
        ) : (
        <button className="send-button" onClick={sendMessage}>
          Enter
        </button>)}
      </div>
    </div>
  );
};

export default App;
