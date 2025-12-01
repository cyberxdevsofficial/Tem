import { useState } from "react";
import "../styles/globals.css";

export default function Home() {
  const [email, setEmail] = useState("");
  const [messages, setMessages] = useState([]);

  const generateEmail = async () => {
    const res = await fetch("/api/generate");
    const data = await res.json();
    setEmail(data.email);
    setMessages([]);
  };

  const fetchInbox = async () => {
    if (!email) return;
    const res = await fetch(`/api/inbox?email=${email}`);
    const data = await res.json();
    setMessages(data.messages);
  };

  return (
    <div className="container">
      <h1>ANUWH-MAIL</h1>
      <button className="btn" onClick={generateEmail}>Generate Temp Email</button>
      {email && (
        <div>
          <h2>Your Email: <span className="email">{email}</span></h2>
          <button className="btn" onClick={fetchInbox}>Check Inbox</button>
          <ul className="inbox">
            {messages.map(msg => (
              <li key={msg.id}>
                <strong>{msg.from}</strong>: {msg.subject}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
