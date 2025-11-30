"use client";

import { motion } from "framer-motion";
import { ArrowRight, Code, Zap, Terminal } from "lucide-react";
import Link from "next/link";
import GlassCard from "@/components/GlassCard";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a0f] via-[#13131a] to-[#0a0a0f]">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4">
        {/* Animated background grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,249,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,249,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_110%)]" />

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8">
              <Zap className="w-4 h-4 text-[#00fff9]" />
              <span className="text-sm text-gray-300">Welcome to the future</span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6">
              <span className="gradient-text">AI-Powered</span>
              <br />
              Portfolio Experience
            </h1>

            <p className="text-lg sm:text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
              Cutting-edge web development with a cyberpunk aesthetic.
              Showcasing innovation through immersive design.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-gradient-to-r from-[#00fff9] to-[#bf00ff] text-white font-medium hover:opacity-90 transition-opacity group"
              >
                View Projects
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/experience"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-lg glass text-gray-300 font-medium hover:text-[#00fff9] transition-colors"
              >
                <Terminal className="w-5 h-5" />
                Experience
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Floating orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00fff9] rounded-full blur-[120px] opacity-10 animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#bf00ff] rounded-full blur-[120px] opacity-10 animate-pulse" style={{ animationDelay: "1s" }} />
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">
              <span className="gradient-text">Core Technologies</span>
            </h2>
            <p className="text-gray-400 text-lg">
              Built with modern tools and frameworks
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Code className="w-12 h-12 text-[#00fff9]" />,
                title: "Next.js 14",
                description: "Leveraging App Router and Server Components for optimal performance",
                glow: "cyan" as const,
              },
              {
                icon: <Zap className="w-12 h-12 text-[#bf00ff]" />,
                title: "Framer Motion",
                description: "Smooth animations and transitions for an immersive experience",
                glow: "purple" as const,
              },
              {
                icon: <Terminal className="w-12 h-12 text-[#0066ff]" />,
                title: "TypeScript",
                description: "Type-safe development with strict mode enabled",
                glow: "blue" as const,
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
              >
                <GlassCard glow={feature.glow}>
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold mb-2 text-white">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400">{feature.description}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <GlassCard className="text-center p-12" glow="cyan">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold mb-6 gradient-text">
                Ready to Explore?
              </h2>
              <p className="text-gray-400 text-lg mb-8">
                Discover my projects, skills, and professional journey
              </p>
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-gradient-to-r from-[#00fff9] to-[#bf00ff] text-white font-medium hover:opacity-90 transition-opacity group"
              >
                Get Started
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </GlassCard>
        </div>
      </section>
    </div>
  );
}
