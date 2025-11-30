"use client";

import { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { Briefcase, Code, FolderKanban, Settings } from "lucide-react";
import GlassCard from "@/components/GlassCard";

export default function AdminPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || user.role !== "admin")) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0a0a0f] via-[#13131a] to-[#0a0a0f] flex items-center justify-center">
        <div className="text-gray-400">Loading...</div>
      </div>
    );
  }

  if (!user || user.role !== "admin") {
    return null;
  }

  const adminSections = [
    {
      title: "Projects",
      description: "Manage your portfolio projects",
      icon: <FolderKanban className="w-12 h-12 text-[#00fff9]" />,
      href: "/admin/projects",
      glow: "cyan" as const,
    },
    {
      title: "Experience",
      description: "Manage work experience entries",
      icon: <Briefcase className="w-12 h-12 text-[#bf00ff]" />,
      href: "/admin/experience",
      glow: "purple" as const,
    },
    {
      title: "Skills",
      description: "Manage your skills and proficiency",
      icon: <Code className="w-12 h-12 text-[#0066ff]" />,
      href: "/admin/skills",
      glow: "blue" as const,
    },
    {
      title: "Settings",
      description: "Configure site settings",
      icon: <Settings className="w-12 h-12 text-[#00fff9]" />,
      href: "/admin/settings",
      glow: "cyan" as const,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a0f] via-[#13131a] to-[#0a0a0f] py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h1 className="text-5xl font-bold mb-4 gradient-text">
            Admin Dashboard
          </h1>
          <p className="text-gray-400 text-lg">
            Welcome back, {user.email}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {adminSections.map((section, i) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <Link href={section.href}>
                <GlassCard glow={section.glow} hover>
                  <div className="mb-4">{section.icon}</div>
                  <h3 className="text-2xl font-bold mb-2 text-white">
                    {section.title}
                  </h3>
                  <p className="text-gray-400">{section.description}</p>
                </GlassCard>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
