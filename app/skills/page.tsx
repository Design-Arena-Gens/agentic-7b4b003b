"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import GlassCard from "@/components/GlassCard";

interface Skill {
  _id: string;
  name: string;
  category: string;
  level: number;
}

export default function SkillsPage() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const res = await fetch("/api/skills");
      const data = await res.json();
      setSkills(data.skills || []);
    } catch (error) {
      console.error("Failed to fetch skills:", error);
    } finally {
      setLoading(false);
    }
  };

  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a0f] via-[#13131a] to-[#0a0a0f] py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold mb-4 gradient-text">Skills</h1>
          <p className="text-gray-400 text-lg">
            Technologies and tools I work with
          </p>
        </motion.div>

        {loading ? (
          <div className="text-center text-gray-400">Loading skills...</div>
        ) : Object.keys(groupedSkills).length === 0 ? (
          <div className="text-center text-gray-400">
            No skills found. Check back soon!
          </div>
        ) : (
          <div className="space-y-12">
            {Object.entries(groupedSkills).map(([category, categorySkills], i) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
              >
                <h2 className="text-2xl font-bold mb-6 text-[#00fff9]">
                  {category}
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {categorySkills.map((skill, j) => (
                    <GlassCard key={skill._id} glow="purple">
                      <div className="flex justify-between items-center mb-3">
                        <h3 className="text-lg font-semibold text-white">
                          {skill.name}
                        </h3>
                        <span className="text-[#00fff9] font-bold">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="w-full bg-[#13131a] rounded-full h-2 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.level}%` }}
                          transition={{ duration: 1, delay: i * 0.2 + j * 0.1 }}
                          className="h-full bg-gradient-to-r from-[#00fff9] to-[#bf00ff] rounded-full"
                        />
                      </div>
                    </GlassCard>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
