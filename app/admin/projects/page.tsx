"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Plus, Edit, Trash2 } from "lucide-react";
import { toast } from "sonner";
import GlassCard from "@/components/GlassCard";

interface Project {
  _id: string;
  title: string;
  description: string;
  technologies: string[];
  images: string[];
  liveUrl?: string;
  githubUrl?: string;
  category: string;
  featured: boolean;
}

export default function AdminProjectsPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    fullDescription: "",
    technologies: "",
    images: "",
    liveUrl: "",
    githubUrl: "",
    category: "",
    featured: false,
    order: 0,
  });

  useEffect(() => {
    if (!authLoading && (!user || user.role !== "admin")) {
      router.push("/login");
    } else if (user) {
      fetchProjects();
    }
  }, [user, authLoading, router]);

  const fetchProjects = async () => {
    try {
      const res = await fetch("/api/projects");
      const data = await res.json();
      setProjects(data.projects || []);
    } catch (error) {
      toast.error("Failed to fetch projects");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      ...formData,
      technologies: formData.technologies.split(",").map((t) => t.trim()).filter(Boolean),
      images: formData.images.split(",").map((t) => t.trim()).filter(Boolean),
    };

    try {
      const url = editingId ? `/api/projects/${editingId}` : "/api/projects";
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error();

      toast.success(`Project ${editingId ? "updated" : "created"} successfully`);
      setShowForm(false);
      setEditingId(null);
      resetForm();
      fetchProjects();
    } catch (error) {
      toast.error(`Failed to ${editingId ? "update" : "create"} project`);
    }
  };

  const handleEdit = (project: Project) => {
    setFormData({
      title: project.title,
      description: project.description,
      fullDescription: "",
      technologies: project.technologies.join(", "),
      images: project.images.join(", "),
      liveUrl: project.liveUrl || "",
      githubUrl: project.githubUrl || "",
      category: project.category,
      featured: project.featured,
      order: 0,
    });
    setEditingId(project._id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    try {
      const res = await fetch(`/api/projects/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error();

      toast.success("Project deleted successfully");
      fetchProjects();
    } catch (error) {
      toast.error("Failed to delete project");
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      fullDescription: "",
      technologies: "",
      images: "",
      liveUrl: "",
      githubUrl: "",
      category: "",
      featured: false,
      order: 0,
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
          <h1 className="text-4xl font-bold gradient-text">Manage Projects</h1>
          <button
            onClick={() => {
              setShowForm(!showForm);
              setEditingId(null);
              resetForm();
            }}
            className="flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-[#00fff9] to-[#bf00ff] text-white font-medium hover:opacity-90 transition-opacity"
          >
            <Plus className="w-5 h-5" />
            New Project
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
                {editingId ? "Edit Project" : "Create New Project"}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
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
                  placeholder="Category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  required
                  className="w-full px-4 py-2 glass rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00fff9]"
                />
                <input
                  type="text"
                  placeholder="Technologies (comma-separated)"
                  value={formData.technologies}
                  onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                  className="w-full px-4 py-2 glass rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00fff9]"
                />
                <input
                  type="text"
                  placeholder="Images URLs (comma-separated)"
                  value={formData.images}
                  onChange={(e) => setFormData({ ...formData, images: e.target.value })}
                  className="w-full px-4 py-2 glass rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00fff9]"
                />
                <input
                  type="url"
                  placeholder="Live URL"
                  value={formData.liveUrl}
                  onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                  className="w-full px-4 py-2 glass rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00fff9]"
                />
                <input
                  type="url"
                  placeholder="GitHub URL"
                  value={formData.githubUrl}
                  onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                  className="w-full px-4 py-2 glass rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00fff9]"
                />
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

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <GlassCard key={project._id} glow="purple">
              <h3 className="text-xl font-bold mb-2 text-white">{project.title}</h3>
              <p className="text-gray-400 mb-4">{project.description}</p>
              <div className="flex gap-2 mb-4">
                {project.technologies.slice(0, 3).map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 rounded text-xs bg-[#00fff9]/10 text-[#00fff9]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(project)}
                  className="flex items-center gap-1 px-3 py-1 rounded bg-[#0066ff]/20 text-[#0066ff] hover:bg-[#0066ff]/30 transition-colors"
                >
                  <Edit className="w-4 h-4" />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(project._id)}
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
