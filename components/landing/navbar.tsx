"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { CHROME_EXTENSION_URL } from "@/lib/extension-config";

export function Navbar() {
  // Scroll Progress Logic
  const { scrollYProgress, scrollY } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Glassmorphism Logic
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    return scrollY.on("change", (latest) => {
      setIsScrolled(latest > 20);
    });
  }, [scrollY]);

  return (
    <>
      {/* Reading Progress Bar - Fixed at very top */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 origin-left z-[60]"
        style={{ scaleX }}
      />

      {/* Floating Navbar Container */}
      <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={`pointer-events-auto flex items-center justify-between px-6 py-3 rounded-full transition-all duration-300 ${
            isScrolled
              ? "bg-white/80 backdrop-blur-xl border border-neutral-200/50 shadow-lg shadow-black/5 w-full max-w-5xl"
              : "bg-transparent w-full max-w-7xl border border-transparent"
          }`}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative size-8 transition-transform duration-300 group-hover:rotate-12">
              <Image
                src="/icons/icon-48.png"
                alt="Logo"
                width={32}
                height={32}
                className="w-full h-full rounded-lg shadow-sm"
              />
            </div>
            <span
              className={`font-bold text-lg tracking-tight transition-colors ${isScrolled ? "text-neutral-900" : "text-neutral-900"}`}
            >
              Send to <span className="text-indigo-600">NotebookLM</span>
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            <NavLink href="#features" label="Features" />
            <NavLink href="#how-it-works" label="How it works" />
            <NavLink href="#pricing" label="Pricing" />
          </div>

          {/* CTA */}
          <div className="flex items-center gap-4">
            <Button
              variant="default"
              size="sm"
              className="rounded-full bg-neutral-900 text-white hover:bg-neutral-800 shadow-lg shadow-indigo-500/20 transition-all hover:scale-105 h-9 px-5 font-medium"
              asChild
            >
              <Link href={CHROME_EXTENSION_URL} target="_blank">
                Add to Chrome
              </Link>
            </Button>
          </div>
        </motion.nav>
      </div>
    </>
  );
}

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="text-sm font-medium text-neutral-600 hover:text-indigo-600 transition-colors relative group"
    >
      {label}
      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 transition-all duration-300 group-hover:w-full" />
    </Link>
  );
}
