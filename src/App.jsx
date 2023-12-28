import { Route, Routes } from "react-router-dom";
import { Login } from "./components/Login";
import RouteProtector from "./components/Protected";
import { ChatBoard } from "./components/ChatBoard";

function App() {
     return (
          <>
               <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/" element={<RouteProtector />}>
                         <Route path="/chats" element={<ChatBoard />} />
                    </Route>
               </Routes>
          </>
     );
}

export default App;
