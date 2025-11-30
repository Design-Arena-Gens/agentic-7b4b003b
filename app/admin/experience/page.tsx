"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Plus, Edit, Trash2 } from "lucide-react";
import { toast } from "sonner";
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

export default function AdminExperiencePage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    company: "",
    position: "",
    description: "",
    technologies: "",
    startDate: "",
    endDate: "",
    current: false,
  });

  useEffect(() => {
    if (!authLoading && (!user || user.role !== "admin")) {
      router.push("/login");
    } else if (user) {
      fetchExperiences();
    }
  }, [user, authLoading, router]);

  const fetchExperiences = async () => {
    try {
      const res = await fetch("/api/experience");
      const data = await res.json();
      setExperiences(data.experiences || []);
    } catch (error) {
      toast.error("Failed to fetch experiences");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      ...formData,
      technologies: formData.technologies.split(",").map((t) => t.trim()).filter(Boolean),
      endDate: formData.current ? undefined : formData.endDate,
    };

    try {
      const url = editingId ? `/api/experience/${editingId}` : "/api/experience";
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error();

      toast.success(`Experience ${editingId ? "updated" : "created"} successfully`);
      setShowForm(false);
      setEditingId(null);
      resetForm();
      fetchExperiences();
    } catch (error) {
      toast.error(`Failed to ${editingId ? "update" : "create"} experience`);
    }
  };

  const handleEdit = (experience: Experience) => {
    setFormData({
      company: experience.company,
      position: experience.position,
      description: experience.description,
      technologies: experience.technologies.join(", "),
      startDate: experience.startDate.split("T")[0],
      endDate: experience.endDate ? experience.endDate.split("T")[0] : "",
      current: experience.current,
    });
    setEditingId(experience._id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this experience?")) return;

    try {
      const res = await fetch(`/api/experience/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error();

      toast.success("Experience deleted successfully");
      fetchExperiences();
    } catch (error) {
      toast.error("Failed to delete experience");
    }
  };

  const resetForm = () => {
    setFormData({
      company: "",
      position: "",
      description: "",
      technologies: "",
      startDate: "",
      endDate: "",
      current: false,
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
          <h1 className="text-4xl font-bold gradient-text">Manage Experience</h1>
          <button
            onClick={() => {
              setShowForm(!showForm);
              setEditingId(null);
              resetForm();
            }}
            className="flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-[#00fff9] to-[#bf00ff] text-white font-medium hover:opacity-90 transition-opacity"
          >
            <Plus className="w-5 h-5" />
            New Experience
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
                {editingId ? "Edit Experience" : "Create New Experience"}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Company"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  required
                  className="w-full px-4 py-2 glass rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00fff9]"
                />
                <input
                  type="text"
                  placeholder="Position"
                  value={formData.position}
                  onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                  required
                  className="w-full px-4 py-2 glass rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00fff9]"
                />
                <textarea
                  placeholder="Description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                  rows={3}
                  className="w-full px-4 py-2 glass rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00fff9]"
                />
                <input
                  type="text"
                  placeholder="Technologies (comma-separated)"
                  value={formData.technologies}
                  onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                  className="w-full px-4 py-2 glass rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00fff9]"
                />
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Start Date</label>
                    <input
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                      required
                      className="w-full px-4 py-2 glass rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#00fff9]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">End Date</label>
                    <input
                      type="date"
                      value={formData.endDate}
                      onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                      disabled={formData.current}
                      className="w-full px-4 py-2 glass rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#00fff9] disabled:opacity-50"
                    />
                  </div>
                </div>
                <label className="flex items-center gap-2 text-gray-300">
                  <input
                    type="checkbox"
                    checked={formData.current}
                    onChange={(e) => setFormData({ ...formData, current: e.target.checked })}
                    className="w-4 h-4"
                  />
                  Currently working here
                </label>
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

        <div className="space-y-6">
          {experiences.map((experience) => (
            <GlassCard key={experience._id} glow="purple">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white">{experience.position}</h3>
                  <p className="text-lg text-[#00fff9]">{experience.company}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(experience)}
                    className="flex items-center gap-1 px-3 py-1 rounded bg-[#0066ff]/20 text-[#0066ff] hover:bg-[#0066ff]/30 transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(experience._id)}
                    className="flex items-center gap-1 px-3 py-1 rounded bg-[#ff006e]/20 text-[#ff006e] hover:bg-[#ff006e]/30 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              </div>
              <p className="text-gray-400 mb-4">{experience.description}</p>
              <div className="flex flex-wrap gap-2">
                {experience.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 rounded text-xs bg-[#bf00ff]/10 text-[#bf00ff]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </div>
  );
}
