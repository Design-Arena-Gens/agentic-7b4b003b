"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glow?: "cyan" | "purple" | "blue" | "none";
}

export default function GlassCard({
  children,
  className,
  hover = true,
  glow = "none",
}: GlassCardProps) {
  const glowClass = glow !== "none" ? `glow-${glow}` : "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={hover ? { scale: 1.02, y: -5 } : {}}
      className={cn(
        "glass rounded-xl p-6 transition-all duration-300",
        glowClass,
        className
      )}
    >
      {children}
    </motion.div>
  );
}
