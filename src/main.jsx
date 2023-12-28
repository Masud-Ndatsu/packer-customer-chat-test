import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { SocketProvider } from "./context/SocketProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
     <BrowserRouter>
          <React.StrictMode>
               <SocketProvider>
                    <App />
               </SocketProvider>
          </React.StrictMode>
     </BrowserRouter>
);
