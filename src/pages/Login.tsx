import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("token", data.token);
      alert("Login successful");
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="flex flex-col gap-4 max-w-sm mx-auto mt-20">
      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        className="p-2 rounded"
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        className="p-2 rounded"
      />
      <button
        onClick={handleLogin}
        className="bg-purple-600 text-white p-2 rounded"
      >
        Sign In
      </button>
    </div>
  );
}
