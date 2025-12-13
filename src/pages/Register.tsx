import { useState } from "react";
import {Navigate} from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    const res = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    });

    const data = await res.json();
    if (data["message"] == 'User registered'){
        return <Navigate to="/general" replace/>
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl mb-4">Register</h1>

      <input
        className="border p-2 w-full mb-2"
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        className="border p-2 w-full mb-2"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        className="border p-2 w-full mb-4"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        onClick={handleRegister}
        className="bg-purple-600 text-white px-4 py-2 rounded"
      >
        Register
      </button>
    </div>
  );
};

export default Register;
