"use client"

import React from "react"

import { useState, useEffect, useRef } from "react"
import { motion, useScroll, useTransform, useInView, AnimatePresence, useSpring } from "framer-motion"
import { ChevronRight, Menu, Ruler, ArrowUp, Star, Sparkles, Award } from 'lucide-react'

export default function AthleteShowcase() {
  const [days, setDays] = useState(3)
  const [hours, setHours] = useState(12)
  const [minutes, setMinutes] = useState(40)
  const [scrolled, setScrolled] = useState(false)
  const [activeTimelineItem, setActiveTimelineItem] = useState("anthropometric")
  const [showScrollTop, setShowScrollTop] = useState(false)

  const sectionRefs = {
    hero: useRef(null),
    featured: useRef(null),
    about: useRef(null),
    activities: useRef(null),
    timeline: useRef(null),
    location: useRef(null),
    partners: useRef(null),
    cta: useRef(null),
    events: useRef(null),
  }

  const inViewStates = {
    hero: useInView(sectionRefs.hero, { once: false, amount: 0.3 }),
    featured: useInView(sectionRefs.featured, { once: false, amount: 0.3 }),
    about: useInView(sectionRefs.about, { once: false, amount: 0.3 }),
    activities: useInView(sectionRefs.activities, { once: false, amount: 0.3 }),
    timeline: useInView(sectionRefs.timeline, { once: false, amount: 0.3 }),
    location: useInView(sectionRefs.location, { once: false, amount: 0.3 }),
    partners: useInView(sectionRefs.partners, { once: false, amount: 0.3 }),
    cta: useInView(sectionRefs.cta, { once: false, amount: 0.3 }),
    events: useInView(sectionRefs.events, { once: false, amount: 0.3 }),
  }

  const { scrollYProgress } = useScroll()
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -100])
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50
      const showButton = window.scrollY > 500
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled)
      }
      setShowScrollTop(showButton)
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [scrolled])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  useEffect(() => {
    const timer = setInterval(() => {
      if (minutes > 0) {
        setMinutes(minutes - 1)
      } else {
        setMinutes(59)
        if (hours > 0) {
          setHours(hours - 1)
        } else {
          setHours(23)
          if (days > 0) {
            setDays(days - 1)
          } else {
            clearInterval(timer)
          }
        }
      }
    }, 60000)

    return () => clearInterval(timer)
  }, [days, hours, minutes])

  const animations = {
    fadeIn: {
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.6,
          ease: "easeOut",
        },
      },
    },
    staggerContainer: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.1,
        },
      },
    },
    slideIn: {
      hidden: { x: -60, opacity: 0 },
      visible: {
        x: 0,
        opacity: 1,
        transition: {
          type: "spring",
          stiffness: 100,
          damping: 15,
        },
      },
    },
    slideInRight: {
      hidden: { x: 60, opacity: 0 },
      visible: {
        x: 0,
        opacity: 1,
        transition: {
          type: "spring",
          stiffness: 100,
          damping: 15,
        },
      },
    },
    scaleUp: {
      hidden: { scale: 0.8, opacity: 0 },
      visible: {
        scale: 1,
        opacity: 1,
        transition: {
          duration: 0.5,
          ease: "easeOut",
        },
      },
    },
    rotateIn: {
      hidden: { rotate: -10, opacity: 0, scale: 0.9 },
      visible: {
        rotate: 0,
        opacity: 1,
        scale: 1,
        transition: {
          type: "spring",
          stiffness: 200,
          damping: 20,
        },
      },
    },
    flipIn: {
      hidden: { rotateX: 90, opacity: 0 },
      visible: {
        rotateX: 0,
        opacity: 1,
        transition: {
          type: "spring",
          stiffness: 100,
          damping: 20,
        },
      },
    },
    popIn: {
      hidden: { scale: 0, opacity: 0 },
      visible: {
        scale: 1,
        opacity: 1,
        transition: {
          type: "spring",
          stiffness: 300,
          damping: 15,
        },
      },
    },
  }

  // Fix the generateParticles function by adding type annotation for count
  const generateParticles = (count: number) => {
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 20 + 10,
    }))
  }

  const particles = generateParticles(50)

  // Fix the renderTimelineContent function by using type assertion or proper typing
  const renderTimelineContent = () => {
    const contents = {
      anthropometric: {
        title: "Anthropometric Measurements",
        tests: ["Height, Weight", "Hand Size", "Wingspan", "Body Composition"],
      },
      performance: {
        title: "Performance Measures",
        tests: ["40-Yard Dash", "Vertical Jump", "Bench Press", "Agility Drill"],
      },
      science: {
        title: "Sports Science Assessments",
        tests: ["Biomechanical Analysis", "VO2 Max Testing", "Cognitive Assessment", "Recovery Profile"],
      },
      drills: {
        title: "Position-Specific Drills",
        tests: ["Route Running", "Ball Skills", "Footwork", "Game Scenarios"],
      },
    }

    // Use type assertion to fix the indexing issue
    const content = contents[activeTimelineItem as keyof typeof contents]

    return (
      <motion.div
        key={activeTimelineItem}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row gap-8 items-center"
      >
        <div className="md:w-1/4">
          <div className="flex flex-col items-start">
            <motion.div
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.8 }}
              className="w-16 h-16 rounded-full bg-[#c4e53e] flex items-center justify-center mb-6 pulse-animation"
            >
              <Ruler className="text-black" size={24} />
            </motion.div>
            <motion.h3
              className="text-5xl font-display uppercase leading-tight"
              animate={{
                textShadow: [
                  "0 0 0px rgba(196, 229, 62, 0)",
                  "0 0 5px rgba(196, 229, 62, 0.5)",
                  "0 0 0px rgba(196, 229, 62, 0)",
                ],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            >
              {content.title}
            </motion.h3>
          </div>
        </div>

        <div className="md:w-2/5">
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="relative rounded-3xl overflow-hidden border-4 border-white shadow-xl perspective-container"
          >
            <motion.img
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.5 }}
              src={`https://athleteshowcase.com/img/timeline/${
                activeTimelineItem === "anthropometric"
                  ? "1"
                  : activeTimelineItem === "performance"
                    ? "2"
                    : activeTimelineItem === "science"
                      ? "3"
                      : "4"
              }.png`}
              alt="Timeline activity"
              className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 pointer-events-none">
              <svg width="100%" height="100%" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                {[100, 200, 300].map((y, i) => (
                  <motion.path
                    key={`h-${i}`}
                    d={`M0 ${y} H400`}
                    stroke="white"
                    strokeWidth="1"
                    opacity="0.5"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, delay: i * 0.2 }}
                  />
                ))}
                {[100, 200, 300].map((x, i) => (
                  <motion.path
                    key={`v-${i}`}
                    d={`M${x} 0 V400`}
                    stroke="white"
                    strokeWidth="1"
                    opacity="0.5"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, delay: 0.6 + i * 0.2 }}
                  />
                ))}
              </svg>
            </div>
          </motion.div>
        </div>

        <div className="md:w-1/3">
          <motion.div
            whileHover={{
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
            }}
            className="bg-white rounded-2xl p-6 shadow-lg"
          >
            <h4 className="text-2xl font-bold mb-6 flex items-center">
              <Award className="text-[#c4e53e] mr-2" size={24} />
              Tests
            </h4>
            <motion.div
              initial={animations.staggerContainer.hidden}
              animate={animations.staggerContainer.visible}
              className="space-y-4"
            >
              {content.tests.map((test: string) => (
                <motion.div
                  key={test}
                  variants={animations.scaleUp}
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: "#c4e53e",
                    color: "black",
                    boxShadow: "0 0 15px rgba(196, 229, 62, 0.5)",
                  }}
                  className="bg-gray-100 rounded-full py-3 px-6 text-center transition-all hover:shadow-md transform cursor-pointer"
                >
                  {test}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    )
  }

  // Fix the renderAthleteCard function by adding type annotations
  const renderAthleteCard = (index: number, image: string) => (
    <motion.div
      key={`athlete-${index}`}
      whileHover={{
        y: -15,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
      className="flex-shrink-0 w-[280px] h-[420px] bg-[#0f0f1a] rounded-xl overflow-hidden relative perspective-container"
    >
      <motion.div
        whileHover={{ scale: 1.1 }}
        className="absolute top-2 right-2 bg-[#c4e53e] text-xs px-3 py-1 rounded-full z-10"
      >
        Redacted
      </motion.div>

      <motion.div className="h-full flex flex-col justify-between tilt-effect" whileHover={{ rotateY: 5, rotateX: 5 }}>
        <img
          src={image || "/placeholder.svg"}
          alt={`Athlete ${index}`}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="flex-1"></div>
        <motion.div
          whileHover={{ rotate: 0 }}
          className="relative py-8 w-full transform -rotate-6 bg-[#c4e53e] flex items-center justify-center"
        />
      </motion.div>

      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-[#0f0f1a] to-transparent opacity-60"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 0.6 }}
      />
    </motion.div>
  )

  return (
    <>
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Anton&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap");

        html,
        body {
          font-family: "Inter", sans-serif;
          scroll-behavior: smooth;
          overflow-x: hidden;
        }

        h1,
        h2,
        h3,
        h4,
        h5,
        h6,
        .font-display {
          font-family: "Anton", sans-serif;
          font-weight: 400 !important;
          letter-spacing: 0.02em;
        }

        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        .transition-all {
          transition-property: all;
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
          transition-duration: 150ms;
        }

        .gradient-bg {
          background: linear-gradient(
            135deg,
            rgba(196, 229, 62, 0.1) 0%,
            rgba(30, 30, 42, 0.1) 100%
          );
        }

        .text-gradient {
          background: linear-gradient(90deg, #1e1e2a 0%, #c4e53e 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          color: transparent;
        }

        .text-gradient-animated {
          background: linear-gradient(90deg, #1e1e2a, #c4e53e, #1e1e2a);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          color: transparent;
          animation: textGradient 5s linear infinite;
        }

        @keyframes textGradient {
          0% {
            background-position: 0% center;
          }
          100% {
            background-position: 200% center;
          }
        }

        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
          100% {
            transform: translateY(0px);
          }
        }

        .float-animation {
          animation: float 4s ease-in-out infinite;
        }

        .float-animation-slow {
          animation: float 6s ease-in-out infinite;
        }

        .float-animation-fast {
          animation: float 3s ease-in-out infinite;
        }

        @keyframes pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(196, 229, 62, 0.4);
          }
          70% {
            box-shadow: 0 0 0 10px rgba(196, 229, 62, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(196, 229, 62, 0);
          }
        }

        .pulse-animation {
          animation: pulse 2s infinite;
        }

        .pulse-animation-slow {
          animation: pulse 4s infinite;
        }

        .pulse-animation-fast {
          animation: pulse 1.5s infinite;
        }

        @keyframes gradientBg {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .gradient-animation {
          background: linear-gradient(270deg, #1e1e2a, #c4e53e, #1e1e2a);
          background-size: 200% 200%;
          animation: gradientBg 8s ease infinite;
        }

        @keyframes rotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .rotate-animation {
          animation: rotate 20s linear infinite;
        }

        .rotate-animation-reverse {
          animation: rotate 20s linear infinite reverse;
        }

        @keyframes bounce {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        .bounce-animation {
          animation: bounce 2s ease-in-out infinite;
        }

        @keyframes shine {
          0% {
            background-position: -100% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }

        .shine-effect {
          position: relative;
          overflow: hidden;
        }

        .shine-effect::after {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.2) 50%,
            rgba(255, 255, 255, 0) 100%
          );
          background-size: 200% 100%;
          animation: shine 3s infinite;
        }

        .glow-effect {
          box-shadow: 0 0 15px rgba(196, 229, 62, 0.5);
          transition: box-shadow 0.3s ease;
        }

        .glow-effect:hover {
          box-shadow: 0 0 30px rgba(196, 229, 62, 0.8);
        }

        .perspective-container {
          perspective: 1000px;
        }

        .tilt-effect {
          transform-style: preserve-3d;
          transition: transform 0.5s ease;
        }

        .tilt-effect:hover {
          transform: rotateX(5deg) rotateY(5deg);
        }

        @keyframes particle {
          0% {
            transform: translate(0, 0);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translate(var(--tx), var(--ty));
            opacity: 0;
          }
        }

        .particle {
          position: absolute;
          background-color: rgba(196, 229, 62, 0.6);
          border-radius: 50%;
          pointer-events: none;
          --tx: 0;
          --ty: 0;
          animation: particle var(--duration) ease-out forwards;
        }

        .text-outline {
          -webkit-text-stroke: 2px #1e1e2a;
          color: transparent;
        }

        .text-outline-white {
          -webkit-text-stroke: 1px white;
          color: transparent;
        }

        .clip-path-slant {
          clip-path: polygon(0 0, 100% 0, 100% 85%, 0 100%);
        }

        .clip-path-circle {
          clip-path: circle(75% at 50% 50%);
        }

        @keyframes typewriter {
          from {
            width: 0;
          }
          to {
            width: 100%;
          }
        }

        .typewriter {
          overflow: hidden;
          white-space: nowrap;
          border-right: 3px solid #c4e53e;
          animation: typewriter 3s steps(40) 1s forwards,
            blink 0.75s step-end infinite;
        }

        @keyframes blink {
          from,
          to {
            border-color: transparent;
          }
          50% {
            border-color: #c4e53e;
          }
        }

        .progress-bar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 5px;
          background: #c4e53e;
          transform-origin: 0%;
          z-index: 1000;
        }

        .blur-bg {
          backdrop-filter: blur(8px);
        }

        .glass-effect {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .noise-bg {
          position: relative;
        }

        .noise-bg::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
          opacity: 0.05;
          pointer-events: none;
        }
      `}</style>

      <motion.div className="progress-bar" style={{ scaleX: smoothProgress }} />

      <div className="font-sans bg-white">
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className={`w-full py-4 fixed z-[100] transition-all duration-500 ${
            scrolled ? "bg-[#1e1e2a] shadow-lg" : "bg-transparent"
          }`}
        >
          <div className="container mx-auto px-6 flex justify-between items-center">
            <motion.div
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.5 }}
              className="bg-white p-3 rounded-full glow-effect"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L4 7L12 12L20 7L12 2Z" fill="#1e1e2a" />
                <path d="M4 12L12 17L20 12" fill="#1e1e2a" />
              </svg>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="bg-opacity-40 backdrop-blur-md rounded-full px-8 py-3 glass-effect"
            >
              <div className="flex items-center space-x-8">
                {["Featured Athletes", "About", "Activities", "Timeline", "Location"].map((item, index) => (
                  <motion.a
                    key={item}
                    whileHover={{ scale: 1.1, color: "#c4e53e" }}
                    href={`#${item.toLowerCase()}`}
                    className={`font-medium ${index === 0 ? "text-[#c4e53e]" : "text-white"}`}
                  >
                    {item}
                  </motion.a>
                ))}
              </div>
            </motion.div>

            <div className="flex items-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-black px-6 py-3 rounded-full text-sm font-medium flex items-center shine-effect"
              >
                Watch Live Stream
                <motion.div
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  className="ml-4 bg-white p-1 rounded-full shadow-md"
                >
                  <ChevronRight size={16} className="text-black" />
                </motion.div>
              </motion.button>
              <motion.div
                whileHover={{ scale: 1.1, rotate: 180 }}
                transition={{ duration: 0.3 }}
                className="md:hidden ml-4 text-white cursor-pointer"
              >
                <Menu />
              </motion.div>
            </div>
          </div>
        </motion.nav>

        <section ref={sectionRefs.hero} className="relative h-screen bg-black text-white overflow-hidden">
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute rounded-full bg-[#c4e53e]"
              initial={{
                x: `${particle.x}vw`,
                y: `${particle.y}vh`,
                opacity: 0,
                scale: 0,
              }}
              animate={{
                opacity: [0, 0.5, 0],
                scale: [0, particle.size, 0],
                x: `${particle.x + (Math.random() * 20 - 10)}vw`,
                y: `${particle.y + (Math.random() * 20 - 10)}vh`,
              }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                duration: particle.duration,
                delay: Math.random() * 5,
              }}
              style={{
                width: `${particle.size * 5}px`,
                height: `${particle.size * 5}px`,
              }}
            />
          ))}

          <motion.div style={{ y: heroY }} className="absolute inset-0 overflow-hidden">
            <video
              className="absolute w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              style={{ filter: "brightness(0.6)" }}
              ref={(el) => {
                if (el) {
                  el.muted = true
                  setTimeout(() => {
                    el.play().catch((error) => {
                      console.log("Autoplay was prevented:", error)
                      const playButton = document.createElement("button")
                      playButton.innerHTML = "Play Video"
                      playButton.className =
                        "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white text-black px-4 py-2 rounded-full z-20"
                      playButton.onclick = () => {
                        el.play()
                        playButton.remove()
                      }
                      el.parentNode?.appendChild(playButton)
                    })
                  }, 1000)
                }
              }}
            >
              <source src="https://athleteshowcase.com/video/athlete-1.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </motion.div>

          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
          />

          <div className="relative z-10 container mx-auto px-6 pt-40 pb-20 h-full flex flex-col justify-center">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inViewStates.hero ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-sm uppercase tracking-widest mb-2 font-medium"
            >
              Transfer Portal
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={inViewStates.hero ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-7xl uppercase mb-6 leading-none font-display"
            >
              ATHLETE
              <br />
              <motion.span
                className="text-gradient-animated"
                animate={{
                  textShadow: [
                    "0 0 5px rgba(196, 229, 62, 0)",
                    "0 0 20px rgba(196, 229, 62, 0.5)",
                    "0 0 5px rgba(196, 229, 62, 0)",
                  ],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
              >
                SHOWCASE
              </motion.span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={inViewStates.hero ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-auto"
            >
              <motion.div
                whileHover={{
                  scale: 1.03,
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                }}
                className="bg-opacity-90 backdrop-blur-sm rounded-xl p-6 flex items-center border border-black glass-effect"
              >
                <div className="flex-1">
                  <h3 className="text-xl mb-1 font-display">JOIN THE LIVE STREAM</h3>
                  <p className="text-sm text-gray-300">Be Part of the Transfer Portal</p>
                </div>
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white rounded-full p-2"
                >
                  <ChevronRight size={20} className="text-black" />
                </motion.div>
              </motion.div>

              <div className="flex items-center">
                <div className="max-w-md">
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={inViewStates.hero ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 1, delay: 0.8 }}
                    className="text-lg typewriter"
                  >
                    Watch the top football transfer portal athletes perform live!
                  </motion.p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={inViewStates.hero ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="absolute bottom-8 right-8 bg-opacity-60 backdrop-blur-sm rounded-xl p-4 flex items-center border border-black glass-effect"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="bg-[#c4e53e] rounded-full p-3 mr-4 pulse-animation"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
                    fill="#1e1e2a"
                  />
                </svg>
              </motion.div>
              <div className="bg-opacity-60 backdrop-blur-sm">
                <h3 className="font-display">JANUARY 5TH, 2025</h3>
                <p className="text-sm text-gray-300">Dragon Stadium in Southlake Texas</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={inViewStates.hero ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="absolute bottom-8 left-8 bg-opacity-60 backdrop-blur-sm rounded-xl p-4 glass-effect"
            >
              <div className="flex space-x-4">
                {[
                  { value: days, label: "DAYS", delay: 0 },
                  { value: hours, label: "HOURS", delay: 0.3 },
                  { value: minutes, label: "MINUTES", delay: 0.6 },
                ].map((item) => (
                  <motion.div
                    key={item.label}
                    className="flex flex-col items-center"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{
                      duration: 1,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "reverse",
                      delay: item.delay,
                    }}
                  >
                    <span className="text-4xl font-bold">{item.value}</span>
                    <span className="text-xs text-gray-300">{item.label}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="absolute bottom-0 left-0 w-full overflow-hidden">
            <svg className="w-full h-auto" viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
              <motion.path
                d="M0 120L48 110C96 100 192 80 288 75C384 70 480 80 576 85C672 90 768 90 864 85C960 80 1056 70 1152 65C1248 60 1344 60 1392 60L1440 60V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0V120Z"
                fill="white"
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
              <motion.path
                d="M0 120L48 115C96 110 192 100 288 95C384 90 480 90 576 95C672 100 768 110 864 110C960 110 1056 100 1152 95C1248 90 1344 90 1392 90L1440 90V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0V120Z"
                fill="#c4e53e"
                fillOpacity="0.3"
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                transition={{ duration: 1.2, ease: "easeOut", delay: 0.1 }}
              />
            </svg>
          </div>
        </section>

        <div className="relative bg-white">
          <div className="absolute -top-16 left-0 right-0 h-16 overflow-hidden">
            <div className="absolute inset-0 bg-white rounded-t-[50%] transform translate-y-1/2"></div>
            <motion.p
              animate={{ y: [0, 5, 0] }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
              className="absolute top-0 left-1/2 transform -translate-x-1/2 text-gray-500 text-sm"
            >
              scroll down
            </motion.p>
          </div>
        </div>

        <section ref={sectionRefs.featured} id="featured" className="py-16 px-6 bg-white">
          <div className="container mx-auto">
            <motion.h2
              initial={animations.fadeIn.hidden}
              animate={inViewStates.featured ? animations.fadeIn.visible : animations.fadeIn.hidden}
              className="text-6xl uppercase text-center mb-8 font-display"
            >
              <motion.span
                animate={{
                  x: [0, 5, 0, -5, 0],
                  rotate: [0, 2, 0, -2, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                }}
                className="inline-block"
              >
                FEATURED
              </motion.span>{" "}
              <motion.span
                animate={{
                  y: [0, -5, 0, 5, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                  delay: 0.5,
                }}
                className="inline-block text-gradient-animated"
              >
                ATHLETES
              </motion.span>
            </motion.h2>
            <motion.p
              initial={animations.fadeIn.hidden}
              animate={inViewStates.featured ? animations.fadeIn.visible : animations.fadeIn.hidden}
              transition={{ delay: 0.2 }}
              className="text-center text-gray-600 max-w-3xl mx-auto mb-16 text-lg"
            >
              Meet some of the top athletes entering the Transfer Portal. These players represent the future of college
              sports, each with the talent, skill, and drive to excel on and off the field.
            </motion.p>

            <div className="relative w-full overflow-hidden">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={inViewStates.featured ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="flex overflow-x-auto pb-8 space-x-4 scrollbar-hide"
              >
                {[
                  "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1936&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                  "https://images.unsplash.com/photo-1580692475446-c2fabbbbf835?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                  "https://images.unsplash.com/photo-1519766304817-4f37bda74a26?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                  "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?q=80&w=1949&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                  "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                  "https://images.unsplash.com/photo-1608245449230-4ac19066d2d0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXRobGV0ZXxlbnwwfHwwfHx8MA%3D%3D",
                  "https://images.unsplash.com/photo-1622979857654-9363bb0a1243?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YXRobGV0ZXxlbnwwfHwwfHx8MA%3D%3D",
                ].map((image, index) => (
                  <React.Fragment key={`athlete-card-${index}`}>
                    {renderAthleteCard(index + 1, image)}
                  </React.Fragment>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={inViewStates.featured ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: 0.8 }}
                className="flex justify-center mt-4 space-x-2"
              >
                {[0, 0.5, 1].map((delay, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.5 }}
                    animate={{
                      scale: [1, i === 0 ? 1.5 : 1.2, 1],
                      backgroundColor: [i === 0 ? "#c4e53e" : "#d1d5db", "#c4e53e", i === 0 ? "#c4e53e" : "#d1d5db"],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "reverse",
                      delay,
                    }}
                    className={`w-2 h-2 rounded-full ${i === 0 ? "bg-[#c4e53e]" : "bg-gray-300"}`}
                  />
                ))}
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inViewStates.featured ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: 0.6 }}
              className="mt-12 text-center"
            >
              <p className="text-sm text-gray-500 mb-6">Powered by</p>
              <div className="flex justify-center items-center space-x-8">
                {[
                  { name: "exos", content: <span className="text-3xl font-medium tracking-tight">exos</span> },
                  {
                    name: "nocap",
                    content: (
                      <div className="flex flex-col items-center">
                        <span className="text-3xl font-bold text-[#003366]">NOCAP</span>
                        <span className="text-xs tracking-widest text-[#003366]">SPORTS</span>
                      </div>
                    ),
                  },
                ].map((sponsor) => (
                  <motion.div
                    key={sponsor.name}
                    whileHover={{
                      scale: 1.1,
                      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                      backgroundColor: "#f9f9f9",
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    className={`px-${sponsor.name === "exos" ? "16" : "12"} py-8 border border-gray-200 rounded-full bg-white cursor-pointer shine-effect`}
                  >
                    {sponsor.content}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <section ref={sectionRefs.about} id="about" className="py-20 px-6 bg-white">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row gap-10">
              <motion.div
                initial={animations.slideIn.hidden}
                animate={inViewStates.about ? animations.slideIn.visible : animations.slideIn.hidden}
                className="md:w-1/4"
              >
                <motion.h2
                  className="text-6xl uppercase font-display"
                  animate={{
                    textShadow: [
                      "0 0 0px rgba(196, 229, 62, 0)",
                      "0 0 10px rgba(196, 229, 62, 0.5)",
                      "0 0 0px rgba(196, 229, 62, 0)",
                    ],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                  }}
                >
                  ABOUT
                </motion.h2>

                <motion.div
                  className="mt-6 inline-block"
                  animate={{
                    rotate: [0, 10, 0, -10, 0],
                    scale: [1, 1.1, 1, 1.1, 1],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "loop",
                  }}
                >
                  <div className="bg-[#c4e53e] p-4 rounded-full">
                    <Star className="text-[#1e1e2a]" size={32} />
                  </div>
                </motion.div>
              </motion.div>
              <div className="md:w-3/4">
                <motion.h3
                  initial={animations.fadeIn.hidden}
                  animate={inViewStates.about ? animations.fadeIn.visible : animations.fadeIn.hidden}
                  transition={{ delay: 0.2 }}
                  className="text-3xl uppercase mb-10 leading-tight font-display max-w-3xl"
                >
                  ATHLETE SHOWCASE IS THE PREMIER EVENT FOR TOP TRANSFER PORTAL PROSPECTS, DIRECTLY CONNECTING ELITE
                  PLAYERS TO GREATER NIL EARNING OPPORTUNITIES.
                </motion.h3>

                <motion.div
                  initial={animations.staggerContainer.hidden}
                  animate={
                    inViewStates.about ? animations.staggerContainer.visible : animations.staggerContainer.hidden
                  }
                  className="grid md:grid-cols-2 gap-10"
                >
                  <motion.div
                    variants={animations.fadeIn}
                    whileHover={{
                      scale: 1.02,
                      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                    }}
                    className="p-6 rounded-xl"
                  >
                    <p className="text-gray-600 mb-4">
                      Athlete Showcase is by invite-only for the top transfer portal prospects in college football. Fans
                      can tune in live to watch elite talent take to the field and increase their NIL earning potential.
                      Athlete Showcase will set the stage for NIL growth and career-defining connections.
                    </p>
                  </motion.div>
                  <motion.div
                    variants={animations.fadeIn}
                    whileHover={{
                      scale: 1.02,
                      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                    }}
                    className="p-6 rounded-xl"
                  >
                    <h4 className="font-bold text-xl mb-4 flex items-center">
                      <Sparkles className="text-[#c4e53e] mr-2" size={20} />
                      What to Expect
                    </h4>
                    <p className="text-gray-600">
                      Witness exclusive workouts, college athlete interviews and NIL data – all in one thrilling
                      live-streamed event.
                    </p>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        <section ref={sectionRefs.activities} id="activities" className="px-6 md:px-12 lg:px-24 bg-white">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inViewStates.activities ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8 }}
            className="relative rounded-xl overflow-hidden mx-6"
          >
            <div className="relative h-[700px] overflow-hidden">
              <video
                className="absolute w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                style={{ filter: "brightness(0.6)" }}
                ref={(el) => {
                  if (el) {
                    el.muted = true
                    setTimeout(() => {
                      el.play().catch((error) => {
                        console.log("Autoplay was prevented:", error)
                        const playButton = document.createElement("button")
                        playButton.innerHTML = "Play Video"
                        playButton.className =
                          "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white text-black px-4 py-2 rounded-full z-20"
                        playButton.onclick = () => {
                          el.play()
                          playButton.remove()
                        }
                        el.parentNode?.appendChild(playButton)
                      })
                    }, 1000)
                  }
                }}
              >
                <source src="https://athleteshowcase.com/video/athlete-2.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>

              <div className="relative z-10 h-full flex flex-col md:flex-row">
                <div className="p-10 md:p-16 flex flex-col justify-center md:w-2/3">
                  <motion.h2
                    initial={{ opacity: 0, x: -50 }}
                    animate={inViewStates.activities ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-5xl md:text-7xl uppercase text-white font-display leading-tight mb-auto"
                  >
                    {["PREMIER", "EVENT FOR", "COLLEGE", "SPORTS"].map((text, i) => (
                      <motion.span
                        key={text}
                        animate={{
                          textShadow: [
                            "0 0 0px rgba(255, 255, 255, 0)",
                            "0 0 10px rgba(255, 255, 255, 0.8)",
                            "0 0 0px rgba(255, 255, 255, 0)",
                          ],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Number.POSITIVE_INFINITY,
                          repeatType: "reverse",
                          delay: i * 0.5,
                        }}
                        className={`block ${i === 3 ? "text-gradient-animated" : ""}`}
                      >
                        {text}
                      </motion.span>
                    ))}
                  </motion.h2>

                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={inViewStates.activities ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="mt-auto"
                  >
                    <p className="text-white mb-6">Signup to watch the livestream for free</p>
                    <motion.button
                      whileHover={{
                        scale: 1.05,
                        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                      }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-white text-black px-6 py-3 rounded-full text-sm flex items-center shine-effect"
                    >
                      Watch Live Stream
                      <motion.div
                        whileHover={{ x: 5 }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 10,
                        }}
                        className="ml-2 bg-white p-1 rounded-full"
                      >
                        <ChevronRight size={16} className="text-black" />
                      </motion.div>
                    </motion.button>
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={inViewStates.activities ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="bg-[#CAF07E] flex flex-col rounded-3xl h-[600px] w-[400px] justify-center items-center mt-10 float-animation"
                >
                  <div className="py-12 px-8 flex flex-col space-y-10">
                    {[
                      { value: "03", label: "Days", delay: 0 },
                      { value: "15", label: "Speakers", delay: 0.5 },
                      { value: "12", label: "Brands", delay: 1 },
                    ].map((item, i) => (
                      <React.Fragment key={item.label}>
                        {i > 0 && <div className="border-t border-gray-600/20 w-full"></div>}
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          className="text-center"
                          animate={{
                            y: [0, -10, 0],
                            scale: [1, 1.05, 1],
                          }}
                          transition={{
                            duration: 3,
                            repeat: Number.POSITIVE_INFINITY,
                            repeatType: "reverse",
                            delay: item.delay,
                          }}
                        >
                          <div className="text-8xl font-display text-black">{item.value}</div>
                          <div className="text-lg text-gray-700 mt-1">{item.label}</div>
                        </motion.div>
                      </React.Fragment>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </section>

        <section ref={sectionRefs.events} id="events" className="py-16 px-6 bg-white">
          <div className="container mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inViewStates.events ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8 }}
              className="text-8xl uppercase mb-16 font-display text-center"
            >
              <motion.span
                animate={{
                  textShadow: [
                    "0 0 0px rgba(196, 229, 62, 0)",
                    "0 0 10px rgba(196, 229, 62, 0.5)",
                    "0 0 0px rgba(196, 229, 62, 0)",
                  ],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
              >
                Event Activities
              </motion.span>
            </motion.h2>
            <div className="flex flex-col md:flex-row gap-8 h-auto">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={inViewStates.events ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                whileHover={{ scale: 1.02 }}
                className="md:w-1/2 rounded-3xl overflow-hidden relative bg-[#0f0f1a] perspective-container"
              >
                <div className="relative h-[500px] tilt-effect">
                  <div className="absolute inset-0 w-full h-full">
                    <img
                      src="https://athleteshowcase.com/img/events/1.png"
                      alt="Basketball player with ball"
                      className="w-full h-full object-cover"
                    />
                    <svg
                      className="absolute inset-0 w-full h-full"
                      viewBox="0 0 400 500"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <motion.path
                        d="M0 100 C100 50, 300 150, 400 100"
                        stroke="white"
                        strokeWidth="2"
                        opacity="0.5"
                        initial={{ pathLength: 0 }}
                        animate={inViewStates.events ? { pathLength: 1 } : { pathLength: 0 }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                      />
                      <motion.path
                        d="M0 0 L100 150"
                        stroke="white"
                        strokeWidth="2"
                        opacity="0.5"
                        initial={{ pathLength: 0 }}
                        animate={inViewStates.events ? { pathLength: 1 } : { pathLength: 0 }}
                        transition={{ duration: 1.5, delay: 0.7 }}
                      />
                      <motion.path
                        d="M400 0 L300 150"
                        stroke="white"
                        strokeWidth="2"
                        opacity="0.5"
                        initial={{ pathLength: 0 }}
                        animate={inViewStates.events ? { pathLength: 1 } : { pathLength: 0 }}
                        transition={{ duration: 1.5, delay: 0.7 }}
                      />
                      <motion.path
                        d="M400 0 L300 150"
                        stroke="white"
                        strokeWidth="2"
                        opacity="0.5"
                        initial={{ pathLength: 0 }}
                        animate={inViewStates.events ? { pathLength: 1 } : { pathLength: 0 }}
                        transition={{ duration: 1.5, delay: 0.9 }}
                      />
                    </svg>
                  </div>
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={inViewStates.events ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="absolute left-8 top-1/2 transform -translate-y-1/2 w-[50%] bg-[#caf07e] p-8 rounded-xl shadow-xl z-10 glow-effect"
                  >
                    <motion.h3
                      className="text-4xl font-display mb-6 text-[#0f0f1a]"
                      animate={{
                        textShadow: [
                          "0 0 0px rgba(30, 30, 42, 0)",
                          "0 0 5px rgba(30, 30, 42, 0.5)",
                          "0 0 0px rgba(30, 30, 42, 0)",
                        ],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "reverse",
                      }}
                    >
                      BRANDED PHOTOSHOOT
                    </motion.h3>
                    <p className="text-[#0f0f1a]">
                      Professional photoshoot with personalized props and symbols of the educational institution.
                      Athletes will receive high-quality photos that can be used on social networks and for sponsorship
                      offers.
                    </p>
                  </motion.div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={inViewStates.events ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                whileHover={{ scale: 1.02 }}
                className="md:w-1/2 rounded-3xl overflow-hidden relative bg-[#0f0f1a] perspective-container"
              >
                <div className="relative h-[500px] tilt-effect">
                  <div className="absolute inset-0 w-full h-full">
                    <img
                      src="https://athleteshowcase.com/img/events/2.png"
                      alt="Football player in green jersey"
                      className="w-full h-full object-cover"
                    />
                    <svg
                      className="absolute inset-0 w-full h-full"
                      viewBox="0 0 400 500"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <motion.path
                        d="M0 100 C100 50, 300 150, 400 100"
                        stroke="white"
                        strokeWidth="2"
                        opacity="0.5"
                        initial={{ pathLength: 0 }}
                        animate={inViewStates.events ? { pathLength: 1 } : { pathLength: 0 }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                      />
                      <motion.path
                        d="M0 0 L100 150"
                        stroke="white"
                        strokeWidth="2"
                        opacity="0.5"
                        initial={{ pathLength: 0 }}
                        animate={inViewStates.events ? { pathLength: 1 } : { pathLength: 0 }}
                        transition={{ duration: 1.5, delay: 0.7 }}
                      />
                      <motion.path
                        d="M400 0 L300 150"
                        stroke="white"
                        strokeWidth="2"
                        opacity="0.5"
                        initial={{ pathLength: 0 }}
                        animate={inViewStates.events ? { pathLength: 1 } : { pathLength: 0 }}
                        transition={{ duration: 1.5, delay: 0.9 }}
                      />
                    </svg>
                  </div>
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={inViewStates.events ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 w-[55%] bg-[#caf07e] p-8 rounded-l-xl shadow-xl z-10 glow-effect"
                  >
                    <motion.h3
                      className="text-4xl font-display mb-6 text-[#0f0f1a]"
                      animate={{
                        textShadow: [
                          "0 0 0px rgba(30, 30, 42, 0)",
                          "0 0 5px rgba(30, 30, 42, 0.5)",
                          "0 0 0px rgba(30, 30, 42, 0)",
                        ],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "reverse",
                      }}
                    >
                      CREATING A PERSONAL BRAND
                    </motion.h3>
                    <p className="text-[#0f0f1a]">
                      Athletes will explore cutting-edge strategies to elevate their personal brands and maximize their
                      NIL potential. They&aposll engage with coaches, collectives, brands, agents and industry experts,
                      building connections that drive future commercial success.
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section ref={sectionRefs.timeline} id="timeline" className="py-20 px-6 bg-white">
          <div className="container mx-auto">
            <motion.h2
              initial={animations.fadeIn.hidden}
              animate={inViewStates.timeline ? animations.fadeIn.visible : animations.fadeIn.hidden}
              className="text-8xl uppercase mb-16 font-display text-center text-gradient-animated"
            >
              TIMELINE
            </motion.h2>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={inViewStates.timeline ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative mb-16"
            >
              <div className="border-t-2 border-gray-200 w-full absolute top-1/2 -translate-y-1/2 rounded-full"></div>
              <motion.div
                className="border-2 border-gray-200 w-[95%] mx-auto h-16 rounded-full relative overflow-hidden"
                whileHover={{ borderColor: "#c4e53e" }}
              >
                <motion.div
                  className="absolute inset-y-0 left-0 bg-[#c4e53e] opacity-20"
                  initial={{ width: "0%" }}
                  animate={inViewStates.timeline ? { width: "100%" } : { width: "0%" }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                />
              </motion.div>
            </motion.div>

            <motion.div
              initial={animations.staggerContainer.hidden}
              animate={inViewStates.timeline ? animations.staggerContainer.visible : animations.staggerContainer.hidden}
              className="grid grid-cols-4 gap-4 mb-8"
            >
              {["anthropometric", "performance", "science", "drills"].map((item) => (
                <motion.button
                  key={item}
                  variants={animations.scaleUp}
                  onClick={() => setActiveTimelineItem(item)}
                  className={`py-4 px-6 rounded-full text-center transition-all hover:shadow-lg hover:scale-105 transform ${
                    activeTimelineItem === item
                      ? "bg-[#c4e53e] text-black"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                  whileHover={{
                    boxShadow: "0 0 15px rgba(196, 229, 62, 0.5)",
                  }}
                >
                  {item === "anthropometric" && "Anthropometric Measurements"}
                  {item === "performance" && "Performance Measures"}
                  {item === "science" && "Sports Science Assessments"}
                  {item === "drills" && "Position-Specific Drills"}
                </motion.button>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={inViewStates.timeline ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-4 gap-4 mb-16 text-center text-gray-600"
            >
              <motion.div whileHover={{ scale: 1.05, color: "#c4e53e" }}>11:30 PM - 1:00 AM</motion.div>
              <motion.div whileHover={{ scale: 1.05, color: "#c4e53e" }}>1:00 AM - 2:00 AM</motion.div>
              <motion.div whileHover={{ scale: 1.05, color: "#c4e53e" }}>2:00 AM - 4:00 AM</motion.div>
              <motion.div whileHover={{ scale: 1.05, color: "#c4e53e" }}>4:00 AM - 6:00 AM</motion.div>
            </motion.div>

            <AnimatePresence mode="wait">{renderTimelineContent()}</AnimatePresence>
          </div>
        </section>

        <section ref={sectionRefs.location} id="location" className="py-16 px-6 text-white">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={inViewStates.location ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8 }}
              className="bg-[#1a1a2e] rounded-3xl overflow-hidden p-8 md:p-12 noise-bg"
            >
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/3 flex flex-col justify-center mb-8 md:mb-0">
                  <motion.h2
                    initial={animations.fadeIn.hidden}
                    animate={inViewStates.location ? animations.fadeIn.visible : animations.fadeIn.hidden}
                    className="text-6xl uppercase mb-12 font-display text-gradient-animated"
                  >
                    LOCATION
                  </motion.h2>

                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.8 }}
                    className="bg-[#c4e53e] w-16 h-16 rounded-2xl flex items-center justify-center mb-6 pulse-animation"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
                        fill="#1a1a2e"
                      />
                    </svg>
                  </motion.div>

                  <motion.div
                    initial={animations.staggerContainer.hidden}
                    animate={
                      inViewStates.location ? animations.staggerContainer.visible : animations.staggerContainer.hidden
                    }
                    transition={{ delayChildren: 0.4, staggerChildren: 0.1 }}
                  >
                    <motion.h3 variants={animations.fadeIn} className="text-2xl font-medium mb-2">
                      January 5th, 2025
                    </motion.h3>
                    <motion.p variants={animations.fadeIn} className="text-gray-400 mb-2">
                      Dragon Stadium in Southlake Texas
                    </motion.p>
                    <motion.p variants={animations.fadeIn} className="text-gray-400 mb-8">
                      1085 S Kimball Ave Southlake, TX 76092
                    </motion.p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inViewStates.location ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ delay: 0.8 }}
                    className="flex space-x-3"
                  >
                    <motion.button
                      whileHover={{
                        scale: 1.05,
                        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                      }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-white text-black px-6 py-3 rounded-full text-sm font-medium hover:bg-opacity-90 transition-all shine-effect"
                    >
                      Open Map
                    </motion.button>
                    <motion.button
                      whileHover={{
                        scale: 1.1,
                        backgroundColor: "rgba(255, 255, 255, 0.2)",
                      }}
                      className="bg-white bg-opacity-10 p-3 rounded-full hover:bg-opacity-20 transition-all"
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
                          fill="white"
                        />
                      </svg>
                    </motion.button>
                  </motion.div>
                </div>

                <div className="md:w-2/3 md:pl-8 relative">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={inViewStates.location ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    whileHover={{ scale: 1.02 }}
                    className="rounded-2xl overflow-hidden h-[400px] perspective-container"
                  >
                    <motion.img
                      whileHover={{ scale: 1.1, rotate: 1 }}
                      transition={{ duration: 0.5 }}
                      src="https://images.unsplash.com/photo-1587368062478-e804f5e2a55a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fFN0YWRpdW18ZW58MHx8MHx8fDI%3D"
                      alt="Dragon Stadium at sunset"
                      className="w-full h-full object-cover"
                    />

                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-[#1a1a2e] to-transparent opacity-60"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 0.6 }}
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={inViewStates.location ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ delay: 0.8 }}
                    className="absolute bottom-4 right-4 flex space-x-2"
                  >
                    <motion.button
                      whileHover={{
                        scale: 1.2,
                        backgroundColor: "rgba(255, 255, 255, 0.9)",
                      }}
                      whileTap={{ scale: 0.9 }}
                      className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-opacity-90 transition-all"
                    >
                      <ChevronRight size={20} className="text-black transform rotate-180" />
                    </motion.button>
                    <motion.button
                      whileHover={{
                        scale: 1.2,
                        backgroundColor: "rgba(255, 255, 255, 0.9)",
                      }}
                      whileTap={{ scale: 0.9 }}
                      className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-opacity-90 transition-all"
                    >
                      <ChevronRight size={20} className="text-black" />
                    </motion.button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section ref={sectionRefs.partners} id="partners" className="py-20 px-6 bg-white">
          <div className="container mx-auto">
            <motion.h2
              initial={animations.fadeIn.hidden}
              animate={inViewStates.partners ? animations.fadeIn.visible : animations.fadeIn.hidden}
              className="text-7xl uppercase mb-16 font-display text-center"
            >
              <motion.span
                animate={{
                  textShadow: [
                    "0 0 0px rgba(196, 229, 62, 0)",
                    "0 0 10px rgba(196, 229, 62, 0.5)",
                    "0 0 0px rgba(196, 229, 62, 0)",
                  ],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
              >
                OUR PARTNERS
              </motion.span>
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inViewStates.partners ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex justify-center items-center space-x-8"
            >
              {[
                { name: "exos", content: <span className="text-3xl font-medium tracking-tight">exos</span> },
                {
                  name: "nocap",
                  content: (
                    <div className="flex flex-col items-center">
                      <span className="text-3xl font-bold text-[#003366]">NOCAP</span>
                      <span className="text-xs tracking-widest text-[#003366]">SPORTS</span>
                    </div>
                  ),
                },
              ].map((partner) => (
                <motion.div
                  key={partner.name}
                  whileHover={{
                    scale: 1.1,
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                    backgroundColor: "#f9f9f9",
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  className={`px-${partner.name === "exos" ? "16" : "12"} py-8 border border-gray-200 rounded-full bg-white cursor-pointer shine-effect`}
                >
                  {partner.content}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <section ref={sectionRefs.cta} id="cta" className="py-16 px-6 bg-white">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={inViewStates.cta ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col md:flex-row gap-6 h-[600px]"
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                className="md:w-1/2 bg-[#1a1a2e] text-white p-12 rounded-3xl flex flex-col items-center justify-center noise-bg"
              >
                <motion.h2
                  initial={animations.fadeIn.hidden}
                  animate={inViewStates.cta ? animations.fadeIn.visible : animations.fadeIn.hidden}
                  className="text-5xl md:text-6xl uppercase mb-8 font-display text-center leading-tight"
                >
                  {["DO YOU WANT TO", "WATCH TOP PROSPECTS", "IN THE TRANSFER", "PORTAL?"].map((text, i) => (
                    <motion.span
                      key={text}
                      animate={{
                        textShadow: [
                          "0 0 0px rgba(255, 255, 255, 0)",
                          "0 0 10px rgba(255, 255, 255, 0.8)",
                          "0 0 0px rgba(255, 255, 255, 0)",
                        ],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "reverse",
                      }}
                      className={`block ${i === 3 ? "text-gradient-animated" : ""}`}
                    >
                      {text}
                    </motion.span>
                  ))}
                </motion.h2>
                <motion.p
                  initial={animations.fadeIn.hidden}
                  animate={inViewStates.cta ? animations.fadeIn.visible : animations.fadeIn.hidden}
                  transition={{ delay: 0.3 }}
                  className="text-gray-400 text-center max-w-md mb-10"
                >
                  Join the list of college sports fans who are rooting for their team to land the nation&aposs best
                  prospects.
                </motion.p>
                <motion.div
                  initial={animations.fadeIn.hidden}
                  animate={inViewStates.cta ? animations.fadeIn.visible : animations.fadeIn.hidden}
                  transition={{ delay: 0.5 }}
                >
                  <motion.button
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-[#c4e53e] text-black px-8 py-4 rounded-full text-sm font-medium hover:bg-opacity-90 transition-all shine-effect"
                  >
                    Watch Live Stream
                  </motion.button>
                </motion.div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                className="md:w-1/2 bg-[#caf07e] p-12 rounded-3xl flex flex-col items-center justify-center"
              >
                <motion.h2
                  initial={animations.fadeIn.hidden}
                  animate={inViewStates.cta ? animations.fadeIn.visible : animations.fadeIn.hidden}
                  className="text-5xl md:text-6xl uppercase mb-8 font-display text-center leading-tight text-[#1a1a2e]"
                >
                  {["ARE YOU AN", "ATHLETE LOOKING", "TO INCREASE YOUR", "NIL?"].map((text) => (
                    <motion.span
                      key={text}
                      animate={{
                        textShadow: [
                          "0 0 0px rgba(30, 30, 42, 0)",
                          "0 0 10px rgba(30, 30, 42, 0.5)",
                          "0 0 0px rgba(30, 30, 42, 0)",
                        ],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "reverse",
                      }}
                      className="block"
                    >
                      {text}
                    </motion.span>
                  ))}
                </motion.h2>
                <motion.p
                  initial={animations.fadeIn.hidden}
                  animate={inViewStates.cta ? animations.fadeIn.visible : animations.fadeIn.hidden}
                  transition={{ delay: 0.3 }}
                  className="text-[#1a1a2e] text-center max-w-md mb-10"
                >
                  Athlete Showcase is by invite-only for the top transfer portal prospects in college football.
                </motion.p>
                <motion.div
                  initial={animations.fadeIn.hidden}
                  animate={inViewStates.cta ? animations.fadeIn.visible : animations.fadeIn.hidden}
                  transition={{ delay: 0.5 }}
                >
                  <motion.button
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-[#1a1a2e] text-[#c4e53e] px-8 py-4 rounded-full text-sm font-medium hover:bg-opacity-90 transition-all shine-effect"
                  >
                    Apply Now
                  </motion.button>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <footer className="py-12 px-6 bg-[#1a1a2e] text-white">
          <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-sm text-gray-400">
                &copy; {new Date().getFullYear()} Athlete Showcase. All rights reserved.
              </p>
            </div>
            <div className="flex space-x-6">
              <motion.a
                whileHover={{ scale: 1.1, color: "#c4e53e" }}
                href="#"
                className="text-sm text-gray-400 hover:text-[#c4e53e] transition-colors duration-300"
              >
                Terms of Service
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1, color: "#c4e53e" }}
                href="#"
                className="text-sm text-gray-400 hover:text-[#c4e53e] transition-colors duration-300"
              >
                Privacy Policy
              </motion.a>
            </div>
          </div>
        </footer>

        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              onClick={scrollToTop}
              className="fixed bottom-8 right-8 bg-[#c4e53e] text-black w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:bg-opacity-90 transition-all z-[999]"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.3 }}
            >
              <ArrowUp size={24} />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}
