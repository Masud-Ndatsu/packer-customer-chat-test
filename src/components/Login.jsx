import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Login = () => {
     const navigate = useNavigate();
     const [email, setEmail] = useState("");
     const [password, setPassword] = useState("");

     const handleEmailChange = (e) => {
          setEmail(e.target.value);
     };
     const handlePasswordChange = (e) => {
          setPassword(e.target.value);
     };
     const handleLogin = async (e) => {
          e.preventDefault();
          const data = { email, password };
          try {
               const request = await fetch(
                    "http://localhost:9000/api/admin/auth/login",
                    {
                         method: "POST",
                         body: JSON.stringify(data),
                         headers: {
                              "Content-Type": "application/json",
                         },
                    }
               );
               const response = await request.json();
               console.log("response: ", response.data);

               if (response.response.status) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                    navigate("/chats");
               }
          } catch (error) {
               console.log({ error });
          }
     };
     return (
          <div className="min-h-screen grid place-items-center">
               <form onSubmit={handleLogin}>
                    <div className="mb-3">
                         <label htmlFor="exampleInputEmail1" className="block">
                              Email address
                         </label>
                         <input
                              type="email"
                              className="border p-1"
                              id="exampleInputEmail1"
                              value={email}
                              onChange={handleEmailChange}
                         />
                    </div>
                    <div className="mb-3">
                         <label
                              htmlFor="exampleInputPassword1"
                              className="block"
                         >
                              Password
                         </label>
                         <input
                              type="password"
                              value={password}
                              className="border p-1"
                              id="exampleInputPassword1"
                              onChange={handlePasswordChange}
                         />
                    </div>
                    <button
                         type="submit"
                         className="py-2 px-6 text-white bg-blue-800"
                    >
                         Submit
                    </button>
               </form>
          </div>
     );
};
