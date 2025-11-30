import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const Layout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A0215] via-black to-[#0A0215] text-white overflow-x-hidden">

      {/* Navbar */}
      <Navbar />

      {/* Main Page Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn">
        <Outlet />
      </main>

    </div>
  );
};

export default Layout;
