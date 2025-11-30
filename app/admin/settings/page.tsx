"use client";

import { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import GlassCard from "@/components/GlassCard";

export default function AdminSettingsPage() {
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a0f] via-[#13131a] to-[#0a0a0f] py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold gradient-text mb-8">Settings</h1>

        <GlassCard glow="cyan">
          <h2 className="text-2xl font-bold mb-4 text-white">Configuration</h2>
          <div className="space-y-4 text-gray-300">
            <div>
              <h3 className="font-semibold mb-2">Environment Variables</h3>
              <p className="text-sm text-gray-400">
                Configure your environment variables in the .env.local file:
              </p>
              <ul className="list-disc list-inside text-sm text-gray-400 mt-2 space-y-1">
                <li>MONGODB_URI - MongoDB connection string</li>
                <li>JWT_SECRET - Secret key for JWT tokens</li>
                <li>EMAIL_HOST, EMAIL_USER, EMAIL_PASS - Email configuration for OTP</li>
                <li>CLOUDINARY_* - Cloudinary credentials for media uploads</li>
                <li>ADMIN_EMAIL - Email address for admin user</li>
              </ul>
            </div>
            <div className="pt-4 border-t border-gray-700">
              <h3 className="font-semibold mb-2">Account</h3>
              <p className="text-sm text-gray-400">Logged in as: {user.email}</p>
              <p className="text-sm text-gray-400">Role: {user.role}</p>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
