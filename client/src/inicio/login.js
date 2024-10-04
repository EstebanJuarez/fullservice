import React, { useState, useEffect } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";



const CompLogin = () => {

    const [email, setEmailUser] = useState("");
    const [password, setPassword] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleSubmit = async (e) => {

        console.log("email " + email);

        e.preventDefault();
        try {

            const response = await axios.post("https://www.fullserviceyb.com/login", {
                email: email,
                password,
            });
            console.log(response);
            if (response.status === 200) {
                setIsLoggedIn(true);
                localStorage.setItem("token", response.data.token);

                const mitoken = localStorage.getItem("token")
                console.log("este es mi conso" + mitoken)
            }

        } catch (error) {

            console.error(error);
        }
    };

    return isLoggedIn ? (

        <Navigate to="/admin" />

    ) : (

<div className="bg-[#0A1B30] min-h-screen flex items-center justify-center p-4">
  <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
    <h1 className="text-3xl text-gray-900 font-bold mb-6 text-center">Iniciar sesión</h1>

    <div className="mb-4">
      <input
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
        id="login-name"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmailUser(e.target.value)}
      />
    </div>

    <div className="mb-6">
      <input
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
        id="login-pass"
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
    </div>

    <button type="submit" className="w-full py-2 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 transition-colors">
      Ingresar
    </button>
  </form>
</div>



    );
};

export default CompLogin;
