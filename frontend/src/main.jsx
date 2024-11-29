import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import 'stream-chat-react/dist/css/v2/index.css'
import ChatApp from "./components/ChatApp";
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChatApp />
  </React.StrictMode>,
)