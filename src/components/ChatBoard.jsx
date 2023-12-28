import React, { useCallback, useEffect, useState } from "react";
import { useSocket } from "../context/SocketProvider";

export const ChatBoard = () => {
     const user = JSON.parse(localStorage.getItem("user"));
     const { socket } = useSocket();
     const [message, setMessage] = useState("");
     const [messages, setMessages] = useState([]);
     const [chats, setChats] = useState([]);

     useEffect(() => {
          if (!socket) return;

          socket.on("connect", () => {
               try {
                    console.log("Connected to server ", socket.connected);
                    console.log({ socket });
               } catch (error) {
                    console.log({
                         error,
                    });
               }
          });
          socket.on("CUSTOMER_SUPPORT_CHAT", (data) => {
               console.log({
                    data,
               });
          });
          socket.on("CUSTOMER_SUPPORT_MSG", (data) => {
               console.log({
                    data,
               });
          });
          socket.on("welcome", (data) => {
               console.log("Hello ", data);
          });
     }, [socket]);

     const fetchChats = useCallback(async function () {
          try {
               const req = await fetch(
                    "http://127.0.0.1:9000/api/admin/chats",
                    {
                         method: "GET",
                         headers: {
                              ["Content-Type"]: "application/json",
                              ["auth-packam-admin"]: user.token,
                         },
                    }
               );
               const res = await req.json();
               console.log("chats :", res.data);
               setChats(res.data);
          } catch (error) {
               console.log({ error });
          }
     }, []);

     const fetchMessagesByChatID = async function (chat_id) {
          try {
               const req = await fetch(
                    "http://127.0.0.1:9000/api/admin/chats/thread/" + chat_id,
                    {
                         method: "GET",
                         headers: {
                              ["Content-Type"]: "application/json",
                              ["auth-packam-admin"]: user.token,
                         },
                    }
               );
               const res = await req.json();
               console.log("messages :", res.data);
               setMessages(res.data);
          } catch (error) {
               console.log({ error });
          }
     };

     useEffect(() => {
          fetchChats();
     }, [fetchChats]);

     return (
          <main className="p-4 min-h-screen bg-green-400">
               <h1 className="text-xl py-2">ChatBoard</h1>
               <div className="">
                    <div className="flex">
                         <div className="flex-1 p-1 bg-gray-500">
                              <div>
                                   {chats.map((chat) => {
                                        return (
                                             <div
                                                  key={chat._id}
                                                  className="py-2 text-sm text-white bg-blue-700 px-1"
                                                  onClick={() => {
                                                       console.log(
                                                            "Load chat thread..."
                                                       );
                                                       fetchMessagesByChatID(
                                                            chat._id
                                                       );
                                                  }}
                                             >
                                                  <p>
                                                       from:{" "}
                                                       {
                                                            chat.order
                                                                 .origin_address
                                                       }
                                                  </p>
                                                  <p>
                                                       to:
                                                       {
                                                            chat.order
                                                                 .destination_address
                                                       }
                                                  </p>
                                             </div>
                                        );
                                   })}
                              </div>
                         </div>
                         <div className="flex-[3]">
                              <div className="min-h-[560px] w-full bg-white"></div>
                              <form
                                   onSubmit={(e) => {
                                        e.preventDefault();
                                   }}
                              >
                                   <div className="py-1 flex">
                                        <input
                                             type="text"
                                             className="border p-1 w-full"
                                             value={message}
                                             onChange={(e) =>
                                                  setMessage(e.target.value)
                                             }
                                        />
                                        <button
                                             type="submit"
                                             className="bg-blue-700 py-2 px-6"
                                        >
                                             Send
                                        </button>
                                   </div>
                              </form>
                         </div>
                    </div>
               </div>
          </main>
     );
};
