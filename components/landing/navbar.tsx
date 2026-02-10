"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Navbar() {
  // Scroll Progress Logic
  const { scrollYProgress, scrollY } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Glassmorphism Logic
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    return scrollY.on("change", (latest) => {
      setIsScrolled(latest > 50);
    });
  }, [scrollY]);

  const navBackground = useTransform(
    scrollY,
    [0, 100],
    ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.8)"]
  );

  const navBackdrop = useTransform(
    scrollY,
    [0, 100],
    ["blur(0px)", "blur(12px)"]
  );

  const navBorder = useTransform(
    scrollY,
    [0, 100],
    ["rgba(229, 231, 235, 0)", "rgba(229, 231, 235, 0.5)"]
  );

  return (
    <>
      {/* Reading Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 origin-left z-50"
        style={{ scaleX }}
      />

      <motion.nav
        style={{
          backgroundColor: navBackground,
          backdropFilter: navBackdrop,
          borderBottom: "1px solid",
          borderColor: navBorder,
        }}
        className="fixed top-0 left-0 right-0 z-40 transition-colors duration-200"
      >
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative size-8 transition-transform duration-300 group-hover:rotate-12">
              <Image
                src="/icons/icon-48.png"
                alt="Logo"
                width={32}
                height={32}
                className="w-full h-full rounded-lg"
              />
            </div>
            <span className="font-bold text-lg tracking-tight text-neutral-900">
              Send to <span className="text-indigo-600">NotebookLM</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link
              href="#features"
              className="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors"
            >
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors"
            >
              How it works
            </Link>
            <Link
              href="#pricing"
              className="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors"
            >
              Pricing
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <Button
              variant="default"
              className="rounded-full bg-neutral-900 text-white hover:bg-neutral-800 shadow-lg shadow-indigo-500/20 transition-all hover:scale-105"
              asChild
            >
              <Link href="https://chromewebstore.google.com/detail/YOUR_REAL_EXTENSION_ID" target="_blank">
                Add to Chrome
              </Link>
            </Button>
          </div>
        </div>
      </motion.nav>
    </>
  );
}
