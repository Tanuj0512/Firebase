import React, { useState, useEffect } from "react";
import { db, auth } from "../firbase/firebase";
import {
  collection,
  addDoc,
  where,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";

import "./Chat.css";

export const Chat = ({ room }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesRef = collection(db, "messages");

  useEffect(() => {
    const queryMessages = query(
      messagesRef,
      where("room", "==", room),
      orderBy("createdAt")
    );
    const unsuscribe = onSnapshot(queryMessages, (snapshot) => {
      let messages = [];
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      console.log(messages);
      setMessages(messages);
    });

    return () => unsuscribe();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (newMessage === "") return;
    await addDoc(messagesRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      user: auth.currentUser.displayName,
      room,
    });

    setNewMessage("");
  };

  return (
    <div className="chat-app">
      <div className="header">
        <h1>Welcome to: {room.toUpperCase()}</h1>
      </div>
      <div className="messages">
        {messages.map((message) => (
          <div key={message.id} className="message">
            <span className="user">{message.user}:</span> {message.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="new-message-form">
        <input
          type="text"
          value={newMessage}
          onChange={(event) => setNewMessage(event.target.value)}
          className="new-message-input"
          placeholder="Type your message here..."
        />
        <button type="submit" className="send-button">
          Send
        </button>
      </form>
    </div>
  );
};



// import { useState } from "react";
// import { addDoc, collection, serverTimestamp } from "firebase/firestore";
// import { auth, db } from "../firbase/firebase";
// import "./Chat.css";
// export const Chat = (props) => {
//   const { room } = props;

//   const [newMessage, setNewMessage] = useState("");
//   const messagesRef = collection(db, "messages");
//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     if (newMessage === "") return;
//     await addDoc(messagesRef, {
//       text: newMessage,
//       createdAt: serverTimestamp(),
//       user: auth.currentUser.displayName,
//       room,
//     });

//     setNewMessage("");
//   };

//   return (
//     <div className="chat-app">
//       <form onSubmit={handleSubmit} className="new-message-form">
//         <input
//           onChange={(e) => setNewMessage(e.target.value)}
//           className="new-message-form"
//           placeholder="type"
//           value={newMessage}
//         ></input>
//         <button type="submit" className="send-button">
//           Send
//         </button>
//       </form>
//     </div>
//   );
// };
