"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, LogIn, ShieldAlert, Eye, EyeOff, AlertCircle } from "lucide-react";
import { api } from "@/lib/api";

export default function StudentLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await api("/auth/login", "POST", { email, password });
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      router.push("/student/dashboard");
    } catch (err) {
      setError(err.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = (val) => `w-full pl-10 pr-12 py-3 rounded-xl border ${error && !val ? 'border-red-500' : 'border-gray-200 dark:border-white/10'} bg-gray-50 dark:bg-white/5 text-gray-900 dark:text-white outline-none focus:border-blue-500 transition-all`;

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#020617] px-4 transition-colors">
      <div className="bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 w-full max-w-sm p-8 rounded-3xl shadow-2xl">
        <h2 className="text-2xl font-black text-center text-gray-900 dark:text-white uppercase tracking-tighter">Student Login</h2>

        <form onSubmit={handleLogin} className="space-y-4 mt-8">
          <div className="relative group">
            <Mail className="absolute left-3 top-3.5 w-5 h-5 text-gray-400 group-focus-within:text-blue-500" />
            <input type="email" placeholder="Email Address" value={email} onChange={(e)=>setEmail(e.target.value)} className={inputStyle(email)} />
          </div>

          <div className="relative group">
            <Lock className="absolute left-3 top-3.5 w-5 h-5 text-gray-400 group-focus-within:text-blue-500" />
            <input type={showPass ? "text" : "password"} placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} className={inputStyle(password)} />
            <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-3.5 text-gray-400 cursor-pointer hover:text-blue-500">
              {showPass ? <Eye size={18} /> : <EyeOff size={18} />}
            </button>
          </div>

          {error && <p className="text-red-500 text-xs font-bold flex items-center gap-1 animate-bounce"><AlertCircle size={12}/> {error}</p>}

          <button disabled={loading} className="w-full bg-blue-600 cursor-pointer text-white py-3.5 rounded-xl font-black shadow-lg shadow-blue-500/30 hover:bg-blue-700 transition-all active:scale-95 disabled:opacity-50">
            {loading ? "Verifying..." : "Login Now"}
          </button>

          <Link href="/admin-login" className="flex items-center justify-center gap-2 w-full border border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-300 py-3 rounded-xl font-bold cursor-pointer hover:bg-gray-50 dark:hover:bg-white/5 transition-all text-sm mt-4">
            <ShieldAlert className="w-4 h-4 text-orange-500" /> Admin Access
          </Link>
        </form>
        <p className="text-center text-gray-500 font-bold mt-6">
          Don't have an account?{" "}
          <Link href="/register" className="text-blue-600 hover:underline underline-offset-4">
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
}