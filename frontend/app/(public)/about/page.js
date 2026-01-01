"use client";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, Users, Zap, Bell, CreditCard, LayoutDashboard } from "lucide-react";

export default function LearnMore() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white transition-colors duration-500">
      
      {/* Header Navigation */}
      <nav className="p-6">
        {/* <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:gap-3 transition-all">
          <ArrowLeft size={18} /> Back
        </Link> */}
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Hero Section */}
        
        <header className="mb-20">
          <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter mb-6">
            PROJECT <span className="text-blue-600">INSIGHTS</span>
          </h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-3xl leading-relaxed font-medium">
            StaySmart  is a premium Hostel Management ecosystem designed to bridge the gap between administrators and students. Built with a focus on speed, security, and a superior user experience.
          </p>
        </header>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
          <FeatureCard 
            icon={<Zap className="text-orange-500" />} 
            title="Real-time Updates" 
            desc="Instant notifications for fee payments and room approvals." 
          />
          <FeatureCard 
            icon={<ShieldCheck className="text-green-500" />} 
            title="Secure Data" 
            desc="Role-based access control ensuring data privacy for everyone." 
          />
          <FeatureCard 
            icon={<LayoutDashboard className="text-blue-500" />} 
            title="Elite UI" 
            desc="Modern dashboard design supporting both Dark and Light modes." 
          />
        </div>

        {/* Roles Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Admin Capabilities */}
          <div className="bg-gray-50 dark:bg-white/5 p-8 rounded-[2.5rem] border border-gray-100 dark:border-white/5">
            <h2 className="text-2xl font-black mb-6 uppercase italic tracking-tighter flex items-center gap-3">
              <span className="p-2 bg-blue-600 rounded-xl text-white"><ShieldCheck size={20}/></span>
              Admin <span className="text-blue-600 text-sm tracking-widest ml-2">Control</span>
            </h2>
            <ul className="space-y-4">
              <li className="flex gap-3 text-sm font-bold text-gray-600 dark:text-gray-400">
                <span className="text-blue-600">●</span> Complete Room & Occupancy Management.
              </li>
              <li className="flex gap-3 text-sm font-bold text-gray-600 dark:text-gray-400">
                <span className="text-blue-600">●</span> Approve/Reject Student Room Requests.
              </li>
              <li className="flex gap-3 text-sm font-bold text-gray-600 dark:text-gray-400">
                <span className="text-blue-600">●</span> Fee Tracking and Automated Status Updates.
              </li>
              <li className="flex gap-3 text-sm font-bold text-gray-600 dark:text-gray-400">
                <span className="text-blue-600">●</span> Complaint Management System.
              </li>
            </ul>
          </div>

          {/* Student Capabilities */}
          <div className="bg-gray-50 dark:bg-white/5 p-8 rounded-[2.5rem] border border-gray-100 dark:border-white/5">
            <h2 className="text-2xl font-black mb-6 uppercase italic tracking-tighter flex items-center gap-3">
              <span className="p-2 bg-purple-600 rounded-xl text-white"><Users size={20}/></span>
              Student <span className="text-purple-600 text-sm tracking-widest ml-2">Experience</span>
            </h2>
            <ul className="space-y-4">
              <li className="flex gap-3 text-sm font-bold text-gray-600 dark:text-gray-400">
                <span className="text-purple-600">●</span> Real-time Room Availability Browsing.
              </li>
              <li className="flex gap-3 text-sm font-bold text-gray-600 dark:text-gray-400">
                <span className="text-purple-600">●</span> Personalized Dashboard with "My Room" details.
              </li>
              <li className="flex gap-3 text-sm font-bold text-gray-600 dark:text-gray-400">
                <span className="text-purple-600">●</span> Transparent Fee History and Payments.
              </li>
              <li className="flex gap-3 text-sm font-bold text-gray-600 dark:text-gray-400">
                <span className="text-purple-600">●</span> Direct Complaint Registration Portal.
              </li>
            </ul>
          </div>

        </div>

        {/* Footer CTA */}
        <footer className="mt-24 text-center">
            <Link href="/login" className="px-10 py-5 bg-blue-600 text-white rounded-3xl font-black uppercase tracking-[0.2em] shadow-2xl shadow-blue-500/40 hover:scale-105 transition-all inline-block">
              Explore More
            </Link>
        </footer>
      </div>
    </div>
  );
}

// Reusable Feature Card Component
function FeatureCard({ icon, title, desc }) {
  return (
    <div className="p-8 rounded-[2rem] border border-gray-100 dark:border-white/5 bg-white dark:bg-[#0f0f0f] shadow-xl shadow-gray-200/50 dark:shadow-none transition-all hover:-translate-y-2">
      <div className="mb-4 text-2xl p-4 bg-gray-50 dark:bg-white/5 w-fit rounded-2xl">{icon}</div>
      <h3 className="text-lg font-black dark:text-white mb-2 uppercase italic tracking-tighter">{title}</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 font-medium leading-relaxed">{desc}</p>
    </div>
  );
}