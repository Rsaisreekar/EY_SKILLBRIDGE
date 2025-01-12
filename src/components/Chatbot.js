// import React, { useState, useEffect } from "react";
// import { AiOutlineSend } from "react-icons/ai"; // Icon for the Send button
// import Dashboard from "../components/History";
// import "../css/chatbot.css";

// const Chatbot = () => {
//   const [userMessage, setUserMessage] = useState("");
//   const [chatHistory, setChatHistory] = useState([]);
//   const [chats, setChats] = useState([]); // List of previous chats
//   const [selectedChatId, setSelectedChatId] = useState(null); // ID of the selected chat
//   const [hasStartedConversation, setHasStartedConversation] = useState(false);

//   // Fetch previous chats on component mount
//   useEffect(() => {
//     fetch("/api/previous-chats")
//       .then((response) => response.json())
//       .then((data) => {
//         setChats(data.chats || []); // Update with fetched chat data
//       })
//       .catch((error) => {
//         console.error("Error fetching previous chats:", error);
//       });
//   }, []);

//   // Handle selecting a previous chat
//   const handleChatSelect = (chat) => {
//     setSelectedChatId(chat.id);
//     fetch(`/api/chats/${chat.id}`)
//       .then((response) => response.json())
//       .then((data) => {
//         setChatHistory(data.messages || []);
//         setHasStartedConversation(true);
//       })
//       .catch((error) => {
//         console.error("Error fetching selected chat:", error);
//       });
//   };

//   // Handle starting a new chat
//   const handleStartChat = () => {
//     setHasStartedConversation(true);
//     setSelectedChatId(null);
//     setChatHistory([]);
//   };

//   // Handle message submission
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!userMessage.trim()) return;

//     const messageObject = { sender: "user", message: userMessage };
//     setChatHistory((prev) => [...prev, messageObject]);
//     setUserMessage("");

//     // Send the user message to the server
//     fetch(`/api/chat${selectedChatId ? `/${selectedChatId}` : ""}`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ message: userMessage }),
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         setChatHistory((prev) => [...prev, { sender: "bot", message: data.response }]);
//       })
//       .catch((error) => {
//         console.error("Error sending message:", error);
//         setChatHistory((prev) => [
//           ...prev,
//           { sender: "bot", message: "An error occurred. Please try again later." },
//         ]);
//       });
//   };

//   return (
//     <div className="chatbot-wrapper">
//       {!hasStartedConversation ? (
//         <div className="starter-page">
//           <h1>SkillBridge</h1>
//           <h2 className="starter-title">What can I help with?</h2>
//           <div className="starter-actions">
//             <button className="starter-button" onClick={handleStartChat}>
//               Start a New Chat
//             </button>
//             <button className="starter-button">Summarize Text</button>
//             <button className="starter-button">Code</button>
//             <button className="starter-button">Analyze Images</button>
//             <button className="starter-button">More</button>
//           </div>
//         </div>
//       ) : (
//         <div className="messaging-page">
//           <Dashboard chats={chats} onChatSelect={handleChatSelect} />
//           <div className="messaging-container">
//             <div className="chat-header">
//               <h2>ChatGPT</h2>
//             </div>
//             <div className="chat-history">
//               {chatHistory.map((chat, index) => (
//                 <p
//                   key={index}
//                   className={`chat-message ${
//                     chat.sender === "user" ? "user-message" : "chatbot-message"
//                   }`}
//                 >
//                   {chat.message}
//                 </p>
//               ))}
//             </div>
//             <form className="chat-input-container" onSubmit={handleSubmit}>
//               <input
//                 type="text"
//                 className="chat-input"
//                 placeholder="Message ChatGPT"
//                 value={userMessage}
//                 onChange={(e) => setUserMessage(e.target.value)}
//               />
//               <button type="submit" className="send-button">
//                 <AiOutlineSend />
//               </button>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Chatbot;
import React, { useState, useEffect } from "react";
import { AiOutlineSend, AiFillDatabase,  AiOutlineSolution,AiOutlineAreaChart,AiOutlineContainer,AiOutlineGitlab } from "react-icons/ai"; 
//import { FaBridge, FaChartBar, FaClipboard, FaComments, FaSignInAlt } from 'react-icons/fa';
import Dashboard from "../components/History";
import "../css/chatbot.css";

const Chatbot = () => {
  const [userMessage, setUserMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [chats, setChats] = useState([]); // List of previous chats
  const [selectedChatId, setSelectedChatId] = useState(null); // ID of the selected chat
  const [hasStartedConversation, setHasStartedConversation] = useState(false);

  // Fetch previous chats on component mount
  useEffect(() => {
    fetch("http://localhost:5000/api/previous-chats")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch previous chats");
        }
        return response.json();
      })
      .then((data) => {
        setChats(data.chats || []); // Update with fetched chat data
      })
      .catch((error) => {
        console.error("Error fetching previous chats:", error);
      });
  }, []);

  // Handle selecting a previous chat
  const handleChatSelect = (chat) => {
    setSelectedChatId(chat.id);
    fetch(`http://localhost:5000/api/chats/${chat.id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch selected chat");
        }
        return response.json();
      })
      .then((data) => {
        setChatHistory(data.messages || []);
        setHasStartedConversation(true);
      })
      .catch((error) => {
        console.error("Error fetching selected chat:", error);
      });
  };

  // Handle starting a new chat
  const handleStartChat = () => {
    setHasStartedConversation(true);
    setSelectedChatId(null);
    setChatHistory([]);
  };

  // Handle message submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userMessage.trim()) return;

    const messageObject = { sender: "user", message: userMessage };
    setChatHistory((prev) => [...prev, messageObject]);
    setUserMessage("");
    const handleGraphClick = () => {
      // Fetch data from the backend server
      fetch("https://your-backend-api.com/graph-data")
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((fetchedData) => {
          setChatHistory((prev) => [
            ...prev,
            {
              sender: "bot",
              message: (
                <div className="graph-message">
                  <LineChart
                    width={250}
                    height={150}
                    data={fetchedData}
                    margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="TopicsCovered" stroke="#82ca9d" />
                  </LineChart>
                </div>
              ),
            },
          ]);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setChatHistory((prev) => [
            ...prev,
            {
              sender: "bot",
              message: <div>Error loading graph data. Please try again later.</div>,
            },
          ]);
        });
    };
    // Send the user message to the server
    fetch("http://localhost:5000/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: userMessage }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to send message");
        }
        return response.json();
      })
      .then((data) => {
        setChatHistory((prev) => [...prev, { sender: "bot", message: data.response }]);
      })
      .catch((error) => {
        console.error("Error sending message:", error);
        setChatHistory((prev) => [
          ...prev,
          { sender: "bot", message: "An error occurred. Please try again later." },
        ]);
      });
  };

  return (
    <div className="chatbot-wrapper">
      {!hasStartedConversation ? (
        <div className="starter-page">
          <h1 className="head-name"><AiOutlineGitlab fontSize="50px"/>SkillBridge </h1>
          <h2 className="starter-title">What can I help with?</h2>
          <div className="search-text">
          <form className="chat-input-container" onsu={handleSubmit} onSubmitCapture={handleStartChat} >
              <input
                type="text"
                className="chat-input"
                placeholder="Message ChatGPT"
                value={userMessage}
                onChange={(e) => setUserMessage(e.target.value)}
              />
            </form>
          </div>
          <div className="starter-actions">
            <button className="starter-button"><AiOutlineAreaChart color="yellow" fontSize='30px'/>Program Tracker</button>
            <button className="starter-button"><AiOutlineContainer color="yellow" fontSize='30px'/>Assesments</button>
            <button className="starter-button"><AiFillDatabase color="yellow" fontSize='30px'/>Pervious Chats </button>
            <button className="starter-button"><AiOutlineSolution color="yellow"fontSize='30px'/>Login </button>
          </div>
          
        </div>
      ) : (
        <div className="messaging-page">
          <Dashboard chats={chats} onChatSelect={handleChatSelect} />
          <div className="messaging-container">
            <div className="chat-header">
            <h1 className="head-name"><AiOutlineGitlab fontSize="50px"/>SkillBridge </h1>
              <div className="header-btn">
                <button className="head-btn"><AiOutlineAreaChart  fontSize='20px' /></button>
                <button className="head-btn"><AiOutlineContainer  fontSize='20px'/></button>
              </div>
            </div>
            <div className="chat-history">
              {chatHistory.map((chat, index) => (
                <div
                  key={index}
                  className={`chat-message-container ${
                    chat.sender === "user" ? "user-message-container" : "chatbot-message-container"
                  }`}
                >
                  <p
                    className={`chat-message ${
                      chat.sender === "user" ? "user-message" : "chatbot-message"
                    }`}
                  >
                    {chat.message}
                  </p>
                </div>
              ))}
            </div>
            <form className="chat-input-container" onSubmit={handleSubmit}>
              <input
                type="text"
                className="chat-input"
                placeholder="Message ChatGPT"
                value={userMessage}
                onChange={(e) => setUserMessage(e.target.value)}
              />
              <button type="submit" className="send-button">
                <AiOutlineSend />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;