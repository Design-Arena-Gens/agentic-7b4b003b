"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import GlassCard from "@/components/GlassCard";

interface Experience {
  _id: string;
  company: string;
  position: string;
  description: string;
  technologies: string[];
  startDate: string;
  endDate?: string;
  current: boolean;
}

export default function ExperiencePage() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    try {
      const res = await fetch("/api/experience");
      const data = await res.json();
      setExperiences(data.experiences || []);
    } catch (error) {
      console.error("Failed to fetch experiences:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a0f] via-[#13131a] to-[#0a0a0f] py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold mb-4 gradient-text">Experience</h1>
          <p className="text-gray-400 text-lg">
            My professional journey and achievements
          </p>
        </motion.div>

        {loading ? (
          <div className="text-center text-gray-400">Loading experiences...</div>
        ) : experiences.length === 0 ? (
          <div className="text-center text-gray-400">
            No experiences found. Check back soon!
          </div>
        ) : (
          <div className="space-y-8">
            {experiences.map((exp, i) => (
              <motion.div
                key={exp._id}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
              >
                <GlassCard glow={i % 2 === 0 ? "cyan" : "purple"}>
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-1">
                        {exp.position}
                      </h3>
                      <h4 className="text-xl text-[#00fff9] mb-2">
                        {exp.company}
                      </h4>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">
                        {formatDate(exp.startDate)} -{" "}
                        {exp.current ? "Present" : formatDate(exp.endDate!)}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-300 mb-4">{exp.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 rounded-full text-xs bg-[#bf00ff]/10 text-[#bf00ff] border border-[#bf00ff]/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
