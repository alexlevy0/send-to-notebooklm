"use client";

import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { History, Lock, Sparkles, Zap } from "lucide-react";
import { useRef } from "react";

const features = [
  {
    id: "instant-capture",
    title: "Instant Capture",
    description:
      "One click to save any article, PDF, or YouTube video to your notebook.",
    icon: Zap,
    className: "md:col-span-2",
  },
  {
    id: "secure-private",
    title: "Secure & Private",
    description:
      "Your data goes directly to Google. We don't store your content.",
    icon: Lock,
    className: "md:col-span-1",
  },
  {
    id: "direct-integration",
    title: "Direct Integration",
    description:
      "Your browsing history meets your second brain. Send content directly to specific notebooks without copy-pasting.",
    icon: History,
    className: "md:col-span-2",
  },
  {
    id: "visual-context",
    title: "Visual Context",
    description:
      "Preserves the link to the original source, allowing NotebookLM to process the content with full context.",
    icon: Sparkles,
    className: "md:col-span-1",
  },
];

export function Features() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.8, 1, 1, 0.8],
  );

  // Header Animation
  const headerY = useTransform(scrollYProgress, [0.2, 0.3], [-50, 0]);
  const headerOpacity = useTransform(scrollYProgress, [0.2, 0.3], [0, 1]);

  return (
    <section
      ref={containerRef}
      id="features"
      className="h-[250vh] bg-white relative"
    >
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center py-20">
        {/* Ambient Background */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-40">
          <div className="absolute top-[-20%] left-[-10%] w-[1000px] h-[1000px] bg-indigo-50/50 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[800px] h-[800px] bg-purple-50/50 rounded-full blur-[100px]" />
        </div>

        <motion.div style={{ opacity, scale }} className="max-w-6xl mx-auto w-full px-6 relative z-10">
          <motion.div
            style={{ y: headerY, opacity: headerOpacity }}
            className="text-center space-y-6 mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-neutral-900">
              Built for the modern <br />{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                Knowledge Worker
              </span>
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto leading-relaxed">
              Simplify your information diet. Stop drowning in bookmarks and
              start building your second brain with precision.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <ScatteredBentoCard
                key={feature.id}
                feature={feature}
                index={index}
                progress={scrollYProgress}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ScatteredBentoCard({
  feature,
  index,
  progress,
}: {
  feature: any;
  index: number;
  progress: any;
}) {
  // Determine random start positions based on index
  const xStart = index % 2 === 0 ? -200 : 200;
  const yStart = index < 2 ? -200 : 200;
  const rotateStart = index % 2 === 0 ? -15 : 15;

  const x = useTransform(progress, [0.1, 0.6], [xStart, 0]);
  const y = useTransform(progress, [0.1, 0.6], [yStart, 0]);
  const rotate = useTransform(progress, [0.1, 0.6], [rotateStart, 0]);
  const opacity = useTransform(progress, [0.1, 0.4], [0, 1]);

  return (
    <motion.div style={{ x, y, rotate, opacity }} className={feature.className}>
      <BentoCard {...feature} />
    </motion.div>
  );
}

function BentoCard({ title, description, icon: Icon }: any) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
  const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

  function onMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    x.set(clientX - left - width / 2);
    y.set(clientY - top - height / 2);
  }

  function onMouseLeave() {
    x.set(0);
    y.set(0);
  }

  const rotateX = useTransform(mouseY, [-300, 300], [5, -5]);
  const rotateY = useTransform(mouseX, [-300, 300], [-5, 5]);

  return (
    <div
      className="h-full perspective-1000"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="h-full rounded-[2rem] border border-neutral-200/60 bg-white/50 backdrop-blur-sm shadow-sm hover:shadow-xl transition-shadow duration-300 overflow-hidden group relative"
      >
        {/* Depth Glint */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-20" />

        <div className="p-10 h-full flex flex-col items-start gap-6 relative z-10 transform-style-3d">
          <div
            className="size-14 rounded-2xl bg-indigo-50/80 border border-indigo-100/50 flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-inner"
            style={{ transform: "translateZ(20px)" }}
          >
            <Icon className="size-7 text-indigo-600 transition-colors group-hover:text-indigo-700" />
          </div>

          <div
            className="space-y-3 relative z-10"
            style={{ transform: "translateZ(10px)" }}
          >
            <h3 className="text-2xl font-bold text-neutral-900 tracking-tight group-hover:text-indigo-700 transition-colors duration-300">
              {title}
            </h3>
            <p className="text-neutral-500 text-base leading-relaxed">
              {description}
            </p>
          </div>

          {/* Decorative Pattern in Card - More subtle */}
          <div
            className="absolute -bottom-6 -right-6 p-6 opacity-[0.03] pointer-events-none group-hover:opacity-[0.08] transition-opacity duration-500"
            style={{ transform: "translateZ(-10px)" }}
          >
            <Icon className="size-40 -rotate-12" />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
