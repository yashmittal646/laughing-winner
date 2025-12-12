import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#4b0082] via-[#2a003b] to-black text-white">

      {/* HEADER */}
      <header className="w-full py-6 px-10 flex justify-between items-center fixed top-0 left-0 z-50 bg-black/20 backdrop-blur-xl border-b border-white/10">
        
        {/* Logo */}
        <h1 className="text-2xl font-bold tracking-wide">
          <span className="text-white">Cre</span>
          <span className="text-purple-400">AIman</span>
        </h1>

        {/* Navigation */}
        <nav className="flex items-center gap-6 text-lg font-semibold">
          <a href="/" className="hover:text-purple-300 transition">Home</a>
          <a href="/pricing" className="hover:text-purple-300 transition">Pricing</a>

          {/* Modes */}
          <a
            href="/login?mode=general"
            className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 transition text-white text-sm"
          >
            General Mode
          </a>

          <a
            href="/login?mode=manager"
            className="px-4 py-2 rounded-xl bg-pink-600 hover:bg-pink-700 transition text-white text-sm"
          >
            Manager Mode
          </a>
        </nav>
      </header>

      {/* CONTENT */}
      <main className="pt-28 px-6">{children}</main>
    </div>
  );
}
