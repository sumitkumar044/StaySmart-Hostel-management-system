// "use client";
// import { useRef, useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { ShieldCheck, Mail, Send, RotateCcw, AlertCircle } from "lucide-react";
// import { api } from "@/lib/api";

// export default function AdminLoginPage() {
//   const router = useRouter();
//   const [email, setEmail] = useState("");
//   const [otpSent, setOtpSent] = useState(false);
//   const [otp, setOtp] = useState(["", "", "", ""]);
//   const [loading, setLoading] = useState(false);
//   const [timer, setTimer] = useState(0);
//   const [error, setError] = useState("");
//   const inputRefs = useRef([]);

//   // resend timer
//   useEffect(() => {
//     let interval;
//     if (timer > 0) {
//       interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
//     }
//     return () => clearInterval(interval);
//   }, [timer]);

//   const handleGetOtp = async () => {
//     setError("");
//     if (!email) {
//       setError("Email is required");
//       return;
//     }
//     setLoading(true);
//     try {
//       await api("/admin/send-otp", "POST", { email });
//       setOtpSent(true);
//       setTimer(30);
//       setOtp(["", "", "", ""]);
//       setTimeout(() => inputRefs.current[0]?.focus(), 100);
//     } catch (err) {
//       setError(err.message || "Failed to send OTP");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleVerifyOtp = async () => {
//     setError("");
//     setLoading(true);
//     try {
//       const data = await api("/admin/verify-otp", "POST", {
//         email,
//         otp: otp.join(""),
//       });
//       localStorage.setItem("token", data.token);
//       localStorage.setItem("user", JSON.stringify({ role: "admin", email }));
//       router.push("/admin/dashboard");
//     } catch (err) {
//       setError(err.message || "Invalid or Expired OTP");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#020617] px-4">
//       <div className="bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 w-full max-w-sm p-8 rounded-3xl shadow-2xl">
//         <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-2 uppercase tracking-tighter">
//           Admin Portal
//         </h2>

//         <div className="space-y-5 mt-8">
//           <div className="relative">
//             <Mail className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
//             <input
//               type="email"
//               placeholder="Admin Email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className={`w-full pl-10 pr-4 py-3.5 rounded-xl border ${
//                 error && !email
//                   ? "border-red-500"
//                   : "border-gray-200 dark:border-white/10"
//               } bg-gray-50 dark:bg-white/5 text-gray-900 dark:text-white outline-none transition-all`}
//             />
//           </div>

//           {error && (
//             <p className="text-red-500 text-xs font-bold flex items-center gap-1 animate-pulse">
//               <AlertCircle size={12} /> {error}
//             </p>
//           )}

//           {!otpSent ? (
//             <button
//               onClick={handleGetOtp}
//               disabled={loading}
//               className="w-full bg-blue-600 cursor-pointer text-white py-4 rounded-xl font-black flex items-center justify-center gap-2 hover:bg-blue-700 transition-all active:scale-95 disabled:opacity-50"
//             >
//               {loading ? "Sending..." : "Get OTP"} <Send size={18} />
//             </button>
//           ) : (
//             <div className="space-y-5">
//               <div className="flex justify-between items-center px-1">
//                 <span className="text-[10px] text-green-500 font-bold uppercase italic">
//                   ● OTP Sent
//                 </span>
//                 {timer > 0 ? (
//                   <span className="text-[10px] text-gray-400 font-bold uppercase">
//                     Resend in {timer}s
//                   </span>
//                 ) : (
//                   <button
//                     onClick={handleGetOtp}
//                     className="text-[10px] text-blue-500 font-bold uppercase cursor-pointer hover:underline flex items-center gap-1"
//                   >
//                     <RotateCcw size={10} /> Resend Now
//                   </button>
//                 )}
//               </div>

//               {/* OTP BOXES WITH PROPER BACKSPACE HANDLING */}
//               <div className="flex justify-between gap-2">
//                 {otp.map((d, i) => (
//                   <input
//                     key={i}
//                     ref={(el) => (inputRefs.current[i] = el)}
//                     maxLength={1}
//                     value={d}
//                     onChange={(e) => {
//                       const val = e.target.value;
//                       if (!/^[0-9]?$/.test(val)) return;

//                       const newOtp = [...otp];
//                       newOtp[i] = val;
//                       setOtp(newOtp);

//                       if (val && i < otp.length - 1) {
//                         inputRefs.current[i + 1]?.focus();
//                       }
//                     }}
//                     onKeyDown={(e) => {
//                       if (e.key === "Backspace") {
//                         e.preventDefault();

//                         // current box me value hai -> sirf ise clear
//                         if (otp[i]) {
//                           const newOtp = [...otp];
//                           newOtp[i] = "";
//                           setOtp(newOtp);
//                           return;
//                         }

//                         // current already empty -> previous clear + focus
//                         if (i > 0) {
//                           const newOtp = [...otp];
//                           newOtp[i - 1] = "";
//                           setOtp(newOtp);
//                           inputRefs.current[i - 1]?.focus();
//                         }
//                       }
//                     }}
//                     className={`w-14 h-16 text-center text-2xl font-black border ${
//                       error
//                         ? "border-red-500 bg-red-50 dark:bg-red-500/10"
//                         : "border-gray-200 dark:border-white/10"
//                     } bg-gray-50 dark:bg-white/5 text-gray-900 dark:text-white rounded-xl outline-none transition-all`}
//                   />
//                 ))}
//               </div>

//               <button
//                 onClick={handleVerifyOtp}
//                 disabled={loading || otp.includes("")}
//                 className="w-full bg-blue-600 cursor-pointer text-white py-4 rounded-xl font-black flex items-center justify-center gap-2 shadow-lg shadow-blue-500/30 hover:bg-blue-700 transition-all active:scale-95"
//               >
//                 <ShieldCheck size={18} />{" "}
//                 {loading ? "Verifying..." : "Verify & Login"}
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }



"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShieldCheck, Mail, AlertCircle } from "lucide-react";
import { api } from "@/lib/api";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); // NEW
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");

    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    setLoading(true);
    try {
      const data = await api("/admin/login", "POST", {
        email,
        password,
      });

      localStorage.setItem("token", data.token);
      localStorage.setItem(
        "user",
        JSON.stringify({ role: "admin", email })
      );
      router.push("/admin/dashboard");
    } catch (err) {
      setError(err.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#020617] px-4">
      <div className="bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 w-full max-w-sm p-8 rounded-3xl shadow-2xl">
        <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-2 uppercase tracking-tighter">
          Admin Portal
        </h2>

        <div className="space-y-5 mt-8">
          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
            <input
              type="email"
              placeholder="Admin Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full pl-10 pr-4 py-3.5 rounded-xl border ${
                error && !email
                  ? "border-red-500"
                  : "border-gray-200 dark:border-white/10"
              } bg-gray-50 dark:bg-white/5 text-gray-900 dark:text-white outline-none transition-all`}
            />
          </div>

          {/* Password */}
          <div>
            <input
              type="password"
              placeholder="Admin Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full px-4 py-3.5 rounded-xl border ${
                error && !password
                  ? "border-red-500"
                  : "border-gray-200 dark:border-white/10"
              } bg-gray-50 dark:bg-white/5 text-gray-900 dark:text-white outline-none transition-all`}
            />
          </div>

          {error && (
            <p className="text-red-500 text-xs font-bold flex items-center gap-1 animate-pulse">
              <AlertCircle size={12} /> {error}
            </p>
          )}

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-blue-600 cursor-pointer text-white py-4 rounded-xl font-black flex items-center justify-center gap-2 hover:bg-blue-700 transition-all active:scale-95 disabled:opacity-50"
          >
            <ShieldCheck size={18} />
            {loading ? "Logging in..." : "Login as Admin"}
          </button>
        </div>
      </div>
    </div>
  );
}
