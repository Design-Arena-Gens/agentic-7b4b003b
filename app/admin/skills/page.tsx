"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Plus, Edit, Trash2 } from "lucide-react";
import { toast } from "sonner";
import GlassCard from "@/components/GlassCard";

interface Skill {
  _id: string;
  name: string;
  category: string;
  level: number;
}

export default function AdminSkillsPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    level: 50,
  });

  useEffect(() => {
    if (!authLoading && (!user || user.role !== "admin")) {
      router.push("/login");
    } else if (user) {
      fetchSkills();
    }
  }, [user, authLoading, router]);

  const fetchSkills = async () => {
    try {
      const res = await fetch("/api/skills");
      const data = await res.json();
      setSkills(data.skills || []);
    } catch (error) {
      toast.error("Failed to fetch skills");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const url = editingId ? `/api/skills/${editingId}` : "/api/skills";
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error();

      toast.success(`Skill ${editingId ? "updated" : "created"} successfully`);
      setShowForm(false);
      setEditingId(null);
      resetForm();
      fetchSkills();
    } catch (error) {
      toast.error(`Failed to ${editingId ? "update" : "create"} skill`);
    }
  };

  const handleEdit = (skill: Skill) => {
    setFormData({
      name: skill.name,
      category: skill.category,
      level: skill.level,
    });
    setEditingId(skill._id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this skill?")) return;

    try {
      const res = await fetch(`/api/skills/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error();

      toast.success("Skill deleted successfully");
      fetchSkills();
    } catch (error) {
      toast.error("Failed to delete skill");
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      category: "",
      level: 50,
    });
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0a0a0f] via-[#13131a] to-[#0a0a0f] flex items-center justify-center">
        <div className="text-gray-400">Loading...</div>
      </div>
    );
  }

  if (!user || user.role !== "admin") {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a0f] via-[#13131a] to-[#0a0a0f] py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold gradient-text">Manage Skills</h1>
          <button
            onClick={() => {
              setShowForm(!showForm);
              setEditingId(null);
              resetForm();
            }}
            className="flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-[#00fff9] to-[#bf00ff] text-white font-medium hover:opacity-90 transition-opacity"
          >
            <Plus className="w-5 h-5" />
            New Skill
          </button>
        </div>

        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <GlassCard glow="cyan">
              <h2 className="text-2xl font-bold mb-4 text-white">
                {editingId ? "Edit Skill" : "Create New Skill"}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Skill Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full px-4 py-2 glass rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00fff9]"
                />
                <input
                  type="text"
                  placeholder="Category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  required
                  className="w-full px-4 py-2 glass rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00fff9]"
                />
                <div>
                  <label className="block text-sm text-gray-400 mb-2">
                    Proficiency Level: {formData.level}%
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={formData.level}
                    onChange={(e) => setFormData({ ...formData, level: parseInt(e.target.value) })}
                    className="w-full"
                  />
                </div>
                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="px-6 py-2 rounded-lg bg-gradient-to-r from-[#00fff9] to-[#bf00ff] text-white font-medium hover:opacity-90 transition-opacity"
                  >
                    {editingId ? "Update" : "Create"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false);
                      setEditingId(null);
                      resetForm();
                    }}
                    className="px-6 py-2 rounded-lg glass text-gray-300 hover:text-white transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </GlassCard>
          </motion.div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill) => (
            <GlassCard key={skill._id} glow="purple">
              <h3 className="text-xl font-bold mb-2 text-white">{skill.name}</h3>
              <p className="text-sm text-gray-400 mb-3">{skill.category}</p>
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-400">Level</span>
                  <span className="text-[#00fff9] font-bold">{skill.level}%</span>
                </div>
                <div className="w-full bg-[#13131a] rounded-full h-2 overflow-hidden">
                  <div
                    style={{ width: `${skill.level}%` }}
                    className="h-full bg-gradient-to-r from-[#00fff9] to-[#bf00ff] rounded-full"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(skill)}
                  className="flex items-center gap-1 px-3 py-1 rounded bg-[#0066ff]/20 text-[#0066ff] hover:bg-[#0066ff]/30 transition-colors"
                >
                  <Edit className="w-4 h-4" />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(skill._id)}
                  className="flex items-center gap-1 px-3 py-1 rounded bg-[#ff006e]/20 text-[#ff006e] hover:bg-[#ff006e]/30 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </div>
  );
}
