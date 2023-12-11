import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [selectedChat, setSelectedChat] = useState();
  const [user, setUser] = useState();
  const [notification, setNotification] = useState([]);
  const [chats, setChats] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUser = async () =>{
        const userInfo = await fetch('/api/user/getUser');
        if(userInfo.ok)
          setUser(await userInfo.json());
        else
          navigate("/")
    }
    fetchUser()
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ChatContext.Provider
      value={{
        selectedChat,
        setSelectedChat,
        user,
        setUser,
        notification,
        setNotification,
        chats,
        setChats,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;