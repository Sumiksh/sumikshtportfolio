"use client"
import Image from "next/image"
import { useTheme } from "next-themes"
import { Navbar } from "../components/ui/navbar"
import { useState, useEffect, useRef } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEnvelope, faFileArrowDown } from "@fortawesome/free-solid-svg-icons"

export default function Home() {
  const { theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [chatOpen, setChatOpen] = useState(false)
  const [chatInput, setChatInput] = useState("")
  const [chatMessages, setChatMessages] = useState([])
  const [loading, setLoading] = useState(false)
  const [showEmail, setShowEmail] = useState(false)
  const email = "tsumiksh@gmail.com"
  const [imgVisible, setImgVisible] = useState(false)

  const [vantaEffect, setVantaEffect] = useState(null)
  const vantaRef = useRef(null)

  const [skillsVisible, setSkillsVisible] = useState(false)
  const skillsRef = useRef(null)

  const [statsVisible, setStatsVisible] = useState(false)
  const statsRef = useRef(null)

  const [counters, setCounters] = useState({
    projects: 0,
    experience: 0,
    clients: 0,
    contributions: 0,
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  // UseEffect to initialize and re-initialize on theme change
  useEffect(() => {
    let effect = null

    const initVanta = async () => {
      // 1. Import TRUNK and p5
      const TRUNK = (await import("vanta/dist/vanta.trunk.min")).default
      const p5 = (await import("p5")).default

      if (vantaRef.current) {
        // Clear previous effect to ensure background color updates
        if (vantaEffect) vantaEffect.destroy()

        const isDark = resolvedTheme === "dark"

        try {
          effect = TRUNK({
            el: vantaRef.current,
            p5: p5, // Trunk requires p5
            mouseControls: true,
            touchControls: true,
            minHeight: 200.0,
            minWidth: 200.0,
            scale: 2.0,
            scaleMobile: 1.0,
            // Lighter/Subtle Colors
            color: isDark ? 0x9333ea : 0x4338ca,
            backgroundColor: isDark ? 0x000000 : 0xffffff,
            spacing: 2.0,
            chaos: 3.0, // Reduced chaos for a cleaner look
          })
          setVantaEffect(effect)
        } catch (err) {
          console.error("Vanta Trunk failed:", err)
        }
      }
    }

    if (mounted) {
      initVanta()
    }

    return () => {
      if (effect) effect.destroy()
    }
    // Re-run whenever theme changes to force a fresh canvas
  }, [mounted, resolvedTheme])

  const handleContactClick = () => {
    if (!showEmail) {
      setShowEmail(true)
      return
    }
    setShowEmail(false)
  }

  useEffect(() => {
    const timer = setTimeout(() => setImgVisible(true), 300)
    return () => clearTimeout(timer)
  }, [mounted])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setSkillsVisible(true)
          }
        })
      },
      { threshold: 0.2 },
    )

    if (skillsRef.current) {
      observer.observe(skillsRef.current)
    }

    return () => {
      if (skillsRef.current) {
        observer.unobserve(skillsRef.current)
      }
    }
  }, [mounted])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !statsVisible) {
            setStatsVisible(true)
          }
        })
      },
      { threshold: 0.4 },
    )

    if (statsRef.current) {
      observer.observe(statsRef.current)
    }

    return () => {
      if (statsRef.current) {
        observer.unobserve(statsRef.current)
      }
    }
  }, [mounted, statsVisible])

  useEffect(() => {
    if (!statsVisible) return
    const targets = {
      projects: 10,
      experience: 3,
      clients: 2,
      contributions: 500,
    }
    const duration = 1000
    const steps = 20
    const increment = duration / steps
    let currentStep = 0

    const timer = setInterval(() => {
      currentStep++
      const progress = currentStep / steps
      setCounters({
        projects: Math.floor(targets.projects * progress),
        experience: Math.floor(targets.experience * progress),
        clients: Math.floor(targets.clients * progress),
        contributions: Math.floor(targets.contributions * progress),
      })

      if (currentStep >= steps) {
        setCounters(targets)
        clearInterval(timer)
      }
    }, increment)
    return () => clearInterval(timer)
  }, [statsVisible])

  const sendMessage = async () => {
    if (!chatInput.trim()) return
    setLoading(true)
    setChatMessages((msgs) => [...msgs, { sender: "user", text: chatInput }])
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: chatInput }),
      })
      const data = await res.json()
      setChatMessages((msgs) => [...msgs, { sender: "bot", text: data.reply || "No response" }])
    } catch (err) {
      setChatMessages((msgs) => [...msgs, { sender: "bot", text: "Error sending message." }])
    }
    setChatInput("")
    setLoading(false)
  }

  if (!mounted) return <div className="min-h-screen bg-gray-100" />

  const skills = [
    { name: "React.js", level: 95, category: "Frontend" },
    { name: "Next.js", level: 90, category: "Frontend" },
    { name: "Node.js", level: 85, category: "Backend" },
    { name: "TypeScript", level: 88, category: "Language" },
    { name: "JavaScript", level: 92, category: "Language" },
    { name: "Python", level: 80, category: "Language" },
    { name: "MongoDB", level: 82, category: "Database" },
    { name: "PostgreSQL", level: 78, category: "Database" },
    { name: "Tailwind CSS", level: 93, category: "Frontend" },
    { name: "Git & GitHub", level: 87, category: "Tools" },
    { name: "Docker", level: 75, category: "DevOps" },
    { name: "AWS", level: 72, category: "Cloud" },
  ]

  return (
    <div ref={vantaRef} className="min-h-screen bg-white text-black dark:bg-black dark:text-white">
      <main className="relative z-10 w-full">
        <Navbar />
        <div className="h-20" />
        {/* Chatbot UI */}
        {chatOpen && (
          <div className="fixed bottom-20 right-6 z-[9999] w-80 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg flex flex-col">
            <div className="p-3 border-b border-gray-200 dark:border-gray-700 font-bold">Sumiksh Chatbot</div>

            <div className="flex-1 p-3 overflow-y-auto" style={{ maxHeight: "250px" }}>
              {chatMessages.map((msg, idx) => (
                <div key={idx} className={`mb-6 text-sm ${msg.sender === "user" ? "text-right" : "text-left"}`}>
                  {msg.text.split("\n").map((line, lineIdx) => (
                    <div
                      key={lineIdx}
                      className={`${msg.sender === "user"
                        ? "bg-blue-100 dark:bg-blue-800 text-blue-900 dark:text-blue-100"
                        : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                        } px-4 py-2 rounded mb-2`}
                    >
                      {line}
                    </div>
                  ))}
                </div>
              ))}
            </div>

            <div className="p-3 border-t border-gray-200 dark:border-gray-700 flex flex-col gap-2">
              <label className="font-semibold mb-1">Choose a resume section</label>
              <select
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                className="border rounded px-3 py-2 bg-white dark:bg-gray-800 text-black dark:text-white"
                disabled={loading}
              >
                <option value="">-- Select Section --</option>
                <option value="summary">Summary</option>
                <option value="skills">Skills</option>
                <option value="education">Education</option>
                <option value="experience">Experience</option>
                <option value="projects">Projects</option>
                <option value="certifications">Certifications</option>
              </select>
              <button
                onClick={sendMessage}
                className="px-3 py-1 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700"
                disabled={loading}
              >
                Ask
              </button>
            </div>
          </div>
        )}
        <div className="flex w-full max-w-6xl mx-auto h-[70vh] items-center">
          {/* Left: Animated Profile Image */}
          <div className="w-full md:w-1/2 flex justify-center items-center order-1 md:order-1">
            <div className="relative w-64 h-80 sm:w-80 sm:h-80 lg:w-[450px] lg:h-[450px]">
              <Image
                src="/profile.jpg"
                alt="Profile Art"
                fill
                className={`rounded-2xl object-cover shadow-2xl transition-all duration-1000 ease-out ${imgVisible ? "opacity-100 scale-100 rotate-0" : "opacity-0 scale-75 -rotate-6"}`}
                priority
              />
            </div>
          </div>

          {/* Right: Text */}
          <div className="w-full md:w-1/2 flex flex-col justify-center items-center md:items-start text-center md:text-left order-2">
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold mb-6 leading-[1.1] tracking-tight text-gray-900 dark:text-white">
              Turning{" "}
              <span className="relative inline-block group">
                <span className="inline-block animate-pulse duration-[3000ms] text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-fuchsia-500 to-indigo-500 drop-shadow-[0_0_15px_rgba(168,85,247,0.2)]">
                  Vision
                </span>
                <span className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-purple-600 to-indigo-500 rounded-full opacity-50"></span>
              </span>{" "}
              Into <br className="hidden md:block" />
              Reality With Code.
            </h1>
            <p
              className="
              /* Layout & Spacing: Starts small, grows with screen size */
              mb-4 sm:mb-6 md:mb-8 
              text-base sm:text-lg lg:text-xl 
              font-medium leading-relaxed text-center md:text-left
              
              /* Light Mode: Deep Indigo/Gray with white glow */
              text-slate-800 drop-shadow-[0_2px_2px_rgba(255,255,255,0.8)]
              
              /* Dark Mode: Pure White with black glow */
              dark:text-white dark:drop-shadow-[0_2px_10px_rgba(0,0,0,1)]
            "
            >
              As a skilled full-stack developer, I am dedicated to turning ideas into innovative web applications.
              <br className="hidden md:inline" />
              <span className="block md:inline">
                Explore my latest projects and articles, showcasing my expertise in React.js and web development.
              </span>
            </p>
            <div className="flex gap-4">
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 rounded-full font-bold transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-md flex items-center gap-2 group bg-transparent 
              /* Light Mode Styles */
              text-purple-900 border-2 border-purple-700/50 hover:border-purple-700 hover:bg-purple-50 
              /* Dark Mode Styles */
              dark:text-white dark:border-purple-500/50 dark:hover:border-purple-400 dark:hover:bg-purple-500/10 dark:shadow-[0_0_15px_rgba(168,85,247,0.1)]"
              >
                <FontAwesomeIcon
                  icon={faFileArrowDown}
                  className="text-sm transition-transform group-hover:-translate-y-1"
                />
                <span className="tracking-wide">Resume</span>
                <span className="text-lg transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                  ↗
                </span>
              </a>
              <button
                onClick={handleContactClick}
                className="px-8 py-3 rounded-full font-bold transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg text-white
                /* Light Mode Gradient & Shadow */
                bg-gradient-to-r from-purple-700 to-indigo-600 shadow-purple-900/20 hover:shadow-purple-900/40
                /* Dark Mode Gradient & Shadow */
                dark:from-purple-600 dark:to-fuchsia-500 dark:shadow-purple-500/20 dark:hover:shadow-purple-500/40 dark:border dark:border-purple-400/30"
              >
                <span className="flex items-center gap-2">
                  {!showEmail && <FontAwesomeIcon icon={faEnvelope} className="text-sm" />}
                  {showEmail ? email : "Get In Touch"}
                </span>
              </button>
            </div>
          </div>
        </div>

        <div ref={statsRef} className="w-full max-w-6xl mx-auto py-20 px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Projects Completed */}
            <div
              className={`group relative bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 border border-purple-200 dark:border-purple-800 rounded-xl p-8 transition-all duration-700 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 ${statsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
            >
              <div className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-500 mb-2">
                {counters.projects}+
              </div>
              <div className="text-lg font-semibold text-gray-700 dark:text-gray-300">Projects Done</div>
              <div className="absolute top-4 right-4 text-4xl opacity-20">🚀</div>
            </div>

            {/* Years of Experience */}
            <div
              className={`group relative bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-8 transition-all duration-700 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20 ${statsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
              style={{ transitionDelay: "100ms" }}
            >
              <div className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 mb-2">
                {counters.experience}+
              </div>
              <div className="text-lg font-semibold text-gray-700 dark:text-gray-300">Years Experience</div>
              <div className="absolute top-4 right-4 text-4xl opacity-20">💼</div>
            </div>

            {/* Happy Clients */}
            <div
              className={`group relative bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20 border border-pink-200 dark:border-pink-800 rounded-xl p-8 transition-all duration-700 hover:scale-105 hover:shadow-2xl hover:shadow-pink-500/20 ${statsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
              style={{ transitionDelay: "200ms" }}
            >
              <div className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-rose-500 mb-2">
                {counters.clients}+
              </div>
              <div className="text-lg font-semibold text-gray-700 dark:text-gray-300">Happy Clients</div>
              <div className="absolute top-4 right-4 text-4xl opacity-20">😊</div>
            </div>

            {/* GitHub Contributions */}
            <div
              className={`group relative bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800 rounded-xl p-8 transition-all duration-700 hover:scale-105 hover:shadow-2xl hover:shadow-green-500/20 ${statsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
              style={{ transitionDelay: "300ms" }}
            >
              <div className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500 mb-2">
                {counters.contributions}+
              </div>
              <div className="text-lg font-semibold text-gray-700 dark:text-gray-300">GitHub Contributions</div>
              <div className="absolute top-4 right-4 text-4xl opacity-20">⭐</div>
            </div>
          </div>
        </div>

        <div ref={skillsRef} className="w-full max-w-6xl mx-auto py-20 px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-extrabold mb-4 text-gray-900 dark:text-white">
              Skills &{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-500">
                Technologies
              </span>
            </h2>
            <p className="text-lg font-semibold text-slate-700 dark:text-slate-300">
              My technical proficiency across various domains
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill, index) => (
              <div
                key={skill.name}
                className={`group relative bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:border-purple-500 dark:hover:border-purple-400 ${skillsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                  }`}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                {/* Category Badge */}
                <div className="absolute top-3 right-3 px-2 py-1 text-xs font-semibold rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300">
                  {skill.category}
                </div>

                {/* Skill Name */}
                <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                  {skill.name}
                </h3>

                {/* Progress Bar Container */}
                <div className="relative mb-2">
                  <div className="w-full h-3 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-purple-600 to-indigo-500 rounded-full transition-all duration-1000 ease-out relative overflow-hidden"
                      style={{
                        width: skillsVisible ? `${skill.level}%` : "0%",
                        transitionDelay: `${index * 50 + 200}ms`,
                      }}
                    >
                      {/* Shimmer Effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-shimmer"></div>
                    </div>
                  </div>
                </div>

                {/* Percentage Display */}
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Proficiency</span>
                  <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-500">
                    {skillsVisible ? skill.level : 0}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      {/* Chat button always visible above everything */}
      <button
        onClick={() => setChatOpen((open) => !open)}
        className="fixed bottom-6 right-6 z-[99999] px-4 py-2 rounded-full bg-blue-600 text-white shadow-lg"
        style={{
          position: "fixed",
          bottom: "1.5rem",
          right: "1.5rem",
          zIndex: 99999,
        }}
      >
        {chatOpen ? "Close Chat" : "AI Resume Chat"}
      </button>
    </div>
  )
}
