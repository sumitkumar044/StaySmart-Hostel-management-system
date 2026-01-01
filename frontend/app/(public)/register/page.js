"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, User, Mail, Phone, Lock } from "lucide-react";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [errors, setErrors] = useState({});
  const router = useRouter();

  // Field wise error clearing
  const updateField = (field, val, setter) => {
    setter(val);
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = "Name is required";
    if (!email.trim()) newErrors.email = "Email is required";
    if (!mobile.trim()) newErrors.mobile = "Mobile is required";
    if (password.length < 6) newErrors.password = "Min 6 characters";
    if (password !== confirmPassword) newErrors.confirmPassword = "Passwords don't match";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    
    try {
      // Note: Make sure your backend uses 'mobile' or 'phone' correctly
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, mobile, password }),
      });
      if (res.ok) {
        alert("Registration Successful!");
        router.push("/login");
      } else {
        const data = await res.json();
        alert(data.message || "Registration failed");
      }
    } catch (error) {
      alert("Server error. Make sure backend is running.");
    }
  };

  const inputClass = (error) => `
    w-full pl-10 pr-10 py-2.5 rounded-xl border transition-all duration-200 outline-none
    ${error 
      ? "border-red-500 bg-red-50 dark:bg-red-900/10" 
      : "border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20"}
    text-gray-900 dark:text-white placeholder-gray-400
  `;

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#020617] px-4 py-10 transition-colors">
      <div className="w-full max-w-md bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-3xl shadow-2xl p-8 backdrop-blur-xl">
        <h2 className="text-3xl font-black text-center text-gray-900 dark:text-white tracking-tight">Join StaySmart</h2>
        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2 mb-8 uppercase tracking-widest font-bold">Register Account</p>

        <form onSubmit={handleRegister} className="space-y-4">
          {/* Name */}
          <div className="relative group">
            <User className="absolute left-3 top-3 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
            <input type="text" placeholder="Full Name" value={name} onChange={(e)=>updateField("name", e.target.value, setName)} className={inputClass(errors.name)} />
            {errors.name && <p className="text-[10px] text-red-500 mt-1 font-bold uppercase">{errors.name}</p>}
          </div>

          {/* Email */}
          <div className="relative group">
            <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400 group-focus-within:text-blue-500" />
            <input type="email" placeholder="Email Address" value={email} onChange={(e)=>updateField("email", e.target.value, setEmail)} className={inputClass(errors.email)} />
            {errors.email && <p className="text-[10px] text-red-500 mt-1 font-bold uppercase">{errors.email}</p>}
          </div>

          {/* Mobile */}
          <div className="relative group">
            <Phone className="absolute left-3 top-3 w-5 h-5 text-gray-400 group-focus-within:text-blue-500" />
            <input type="tel" placeholder="Mobile Number" value={mobile} onChange={(e)=>updateField("mobile", e.target.value, setMobile)} className={inputClass(errors.mobile)} />
            {errors.mobile && <p className="text-[10px] text-red-500 mt-1 font-bold uppercase">{errors.mobile}</p>}
          </div>

          {/* Password */}
          <div className="relative group">
            <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400 group-focus-within:text-blue-500" />
            <input type={showPass ? "text" : "password"} placeholder="Password" value={password} onChange={(e)=>updateField("password", e.target.value, setPassword)} className={inputClass(errors.password)} />
            <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-3 text-gray-400">
              {showPass ? <Eye size={18} /> : <EyeOff size={18} />}
            </button>
            {errors.password && <p className="text-[10px] text-red-500 mt-1 font-bold uppercase">{errors.password}</p>}
          </div>

          {/* Confirm Password */}
          <div className="relative group">
            <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400 group-focus-within:text-blue-500" />
            <input type={showConfirmPass ? "text" : "password"} placeholder="Confirm Password" value={confirmPassword} onChange={(e)=>updateField("confirmPassword", e.target.value, setConfirmPassword)} className={inputClass(errors.confirmPassword)} />
            <button type="button" onClick={() => setShowConfirmPass(!showConfirmPass)} className="absolute right-3 top-3 text-gray-400">
              {showConfirmPass ? <Eye size={18} /> : <EyeOff size={18} />}
            </button>
            {errors.confirmPassword && <p className="text-[10px] text-red-500 mt-1 font-bold uppercase">{errors.confirmPassword}</p>}
          </div>

          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-bold transition-all shadow-lg shadow-blue-600/30 transform hover:scale-[1.02] active:scale-95">
            Register Now
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-6">
          Already a member? <Link href="/login" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">Log In</Link>
        </p>
      </div>
    </div>
  );
}