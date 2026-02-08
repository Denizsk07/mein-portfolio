"use client";
import React, { useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { Link as ScrollLink } from "react-scroll";
import { cn } from "../utils/cn";

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: JSX.Element;
  }[];
  className?: string;
}) => {
  const { scrollYProgress } = useScroll();

  // set true for the initial state so that nav bar is visible in the hero section
  const [visible, setVisible] = useState(true);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    // Check if current is not undefined and is a number
    if (typeof current === "number") {
      let direction = current! - scrollYProgress.getPrevious()!;

      if (scrollYProgress.get() < 0.05) {
        // also set true for the initial state
        setVisible(true);
      } else {
        if (direction < 0) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      }
    }
  });

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 1,
          y: -100,
        }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: 0.2,
        }}
        className={cn(
          "flex max-w-fit md:min-w-[70vw] lg:min-w-fit fixed z-[5000] top-10 inset-x-0 mx-auto px-10 py-5 rounded-2xl border border-white/20 shadow-2xl items-center justify-center space-x-6",
          className
        )}
        style={{
          backdropFilter: "blur(20px) saturate(180%)",
          backgroundColor: "rgba(15, 23, 42, 0.8)",
          borderRadius: "16px",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1)",
        }}
      >
        {navItems.map((navItem: any, idx: number) => (
          <ScrollLink
            key={`link=${idx}`}
            to={navItem.link.replace("#", "")}
            smooth={true}
            duration={500}
            className={cn(
              "relative text-white items-center flex space-x-1 hover:text-orange-400 transition-colors duration-300 !cursor-pointer font-medium"
            )}
          >
            <span className="block sm:hidden">{navItem.icon}</span>
            {/* add !cursor-pointer */}
            {/* remove hidden sm:block for the mobile responsive */}
            <span className=" text-sm">{navItem.name}</span>
          </ScrollLink>
        ))}
        <ScrollLink to="contact" smooth={true} duration={500}>
          <button className="border text-sm font-medium relative border-white/30 text-white px-6 py-3 rounded-full bg-gradient-to-r from-orange-500/20 to-blue-500/20 hover:from-orange-500/30 hover:to-blue-500/30 transition-all duration-300 backdrop-blur-sm">
            <span>Contact</span>
            <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-orange-400 to-transparent h-px" />
          </button>
        </ScrollLink>
      </motion.div>
    </AnimatePresence>
  );
};
