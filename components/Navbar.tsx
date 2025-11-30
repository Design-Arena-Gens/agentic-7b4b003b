"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Menu, X, Zap } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/projects", label: "Projects" },
    { href: "/experience", label: "Experience" },
    { href: "/skills", label: "Skills" },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 glass-strong border-b border-[#00fff9]/20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <Zap className="w-8 h-8 text-[#00fff9] group-hover:text-[#bf00ff] transition-colors" />
              <div className="absolute inset-0 blur-lg bg-[#00fff9]/30 group-hover:bg-[#bf00ff]/30 transition-colors" />
            </div>
            <span className="text-xl font-bold gradient-text hidden sm:block">
              AI Portfolio
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors relative group",
                  isActive(link.href)
                    ? "text-[#00fff9]"
                    : "text-gray-300 hover:text-[#00fff9]"
                )}
              >
                {link.label}
                {isActive(link.href) && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-[#00fff9] to-[#bf00ff]"
                  />
                )}
              </Link>
            ))}
            {user?.role === "admin" && (
              <Link
                href="/admin"
                className={cn(
                  "text-sm font-medium transition-colors",
                  isActive("/admin")
                    ? "text-[#bf00ff]"
                    : "text-gray-300 hover:text-[#bf00ff]"
                )}
              >
                Admin
              </Link>
            )}
            {user ? (
              <button
                onClick={() => logout()}
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#bf00ff] to-[#00fff9] text-white text-sm font-medium hover:opacity-90 transition-opacity"
              >
                Logout
              </button>
            ) : (
              <Link
                href="/login"
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#00fff9] to-[#bf00ff] text-white text-sm font-medium hover:opacity-90 transition-opacity"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-[#00fff9]"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden py-4 space-y-4"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "block text-sm font-medium transition-colors",
                  isActive(link.href)
                    ? "text-[#00fff9]"
                    : "text-gray-300 hover:text-[#00fff9]"
                )}
              >
                {link.label}
              </Link>
            ))}
            {user?.role === "admin" && (
              <Link
                href="/admin"
                onClick={() => setIsOpen(false)}
                className={cn(
                  "block text-sm font-medium transition-colors",
                  isActive("/admin")
                    ? "text-[#bf00ff]"
                    : "text-gray-300 hover:text-[#bf00ff]"
                )}
              >
                Admin
              </Link>
            )}
            {user ? (
              <button
                onClick={() => {
                  logout();
                  setIsOpen(false);
                }}
                className="w-full px-4 py-2 rounded-lg bg-gradient-to-r from-[#bf00ff] to-[#00fff9] text-white text-sm font-medium hover:opacity-90 transition-opacity"
              >
                Logout
              </button>
            ) : (
              <Link
                href="/login"
                onClick={() => setIsOpen(false)}
                className="block px-4 py-2 rounded-lg bg-gradient-to-r from-[#00fff9] to-[#bf00ff] text-white text-sm font-medium hover:opacity-90 transition-opacity text-center"
              >
                Login
              </Link>
            )}
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}
