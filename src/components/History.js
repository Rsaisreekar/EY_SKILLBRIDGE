import React from "react";
import "../css/dashboard.css";
import { AiOutlineSend, AiFillDatabase, AiOutlineRight} from "react-icons/ai"; 


const Dashboard = ({ chats, onChatSelect }) => {
  // Placeholder chats if no previous chats are available
  const mockChats = [
    { title: "Discuss AI Trends", id: 1 },
    { title: "Python Bug Fixing", id: 2 },
    { title: "Designing Chatbots", id: 3 },
    { title: "Web Development Tips", id: 4 },
  ];

  const displayedChats = chats.length > 0 ? chats : mockChats;

  return (
    <div className="dashboard">
      <h2 className="dashboard-title"><AiFillDatabase  fontSize='20px'/>Previous Chats</h2>
      <ul className="chat-list">
        {displayedChats.map((chat, index) => (
          <li
            key={index}
            className="chat-item"
            onClick={() => onChatSelect(chat)}
          >
            <div className="chat-details">
              <p className="chat-title"><AiOutlineRight color="yellow"/>  {chat.title}</p>
              <p className="chat-subtitle">Last accessed: Just now</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;