import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Layout from "@/components/Layout";

export default function Login() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const mode = params.get("mode") || "general";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (res.ok) {
      alert("Login Successful!");

      navigate(mode === "manager" ? "/manager" : "/general");
    } else {
      alert(data.message);
    }
  };

  return (
    <Layout>
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="bg-black/40 backdrop-blur-xl p-10 rounded-2xl max-w-md w-full border border-purple-500/20 shadow-xl">

          <h1 className="text-center text-4xl font-bold mb-8">
            {mode === "manager" ? "Manager Login" : "General Login"}
          </h1>

          <input
            className="w-full p-3 mb-4 bg-white/10 border border-white/20 rounded-lg text-white"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="w-full p-3 mb-6 bg-white/10 border border-white/20 rounded-lg text-white"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={handleLogin}
            className="w-full py-3 rounded-lg bg-purple-600 hover:bg-purple-700 transition text-white font-semibold"
          >
            Login
          </button>
        </div>
      </div>
    </Layout>
  );
}
