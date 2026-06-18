'use client'
import { useEffect, useRef, useState } from 'react'
import { Download, MessageCircle, ChevronDown } from 'lucide-react'

const roles = [
  'IT Support',
  'Web Developer',
  'Full Stack Developer',
  'Technical Support',
]

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [displayText, setDisplayText] = useState('')
  const [roleIndex, setRoleIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)

  // Typewriter effect
  useEffect(() => {
    const current = roles[roleIndex]
    const timeout = setTimeout(() => {
      if (!deleting) {
        if (charIndex < current.length) {
          setDisplayText(current.slice(0, charIndex + 1))
          setCharIndex((c) => c + 1)
        } else {
          setTimeout(() => setDeleting(true), 1800)
        }
      } else {
        if (charIndex > 0) {
          setDisplayText(current.slice(0, charIndex - 1))
          setCharIndex((c) => c - 1)
        } else {
          setDeleting(false)
          setRoleIndex((r) => (r + 1) % roles.length)
        }
      }
    }, deleting ? 50 : 90)
    return () => clearTimeout(timeout)
  }, [charIndex, deleting, roleIndex])

  // Particle animation
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const particles: { x: number; y: number; vx: number; vy: number; size: number; opacity: number }[] = []
    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.1,
      })
    }

    let raf: number
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach((p) => {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(108, 99, 255, ${p.opacity})`
        ctx.fill()
      })
      // Connect nearby particles
      particles.forEach((a, i) => {
        particles.slice(i + 1).forEach((b) => {
          const dist = Math.hypot(a.x - b.x, a.y - b.y)
          if (dist < 100) {
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.strokeStyle = `rgba(108, 99, 255, ${0.12 * (1 - dist / 100)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        })
      })
      raf = requestAnimationFrame(animate)
    }
    animate()
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  const scrollDown = () => {
    document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-purple-50/30 to-cyan-50/20 dark:from-[#0A0A0F] dark:via-[#0D0D1A] dark:to-[#0A0A0F]" />

      {/* Glow blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#6C63FF]/10 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[#00D4FF]/8 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />

      {/* Particles */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-32 flex flex-col lg:flex-row items-center gap-16">
        {/* Text */}
        <div className="flex-1 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#6C63FF]/10 border border-[#6C63FF]/20 text-[#6C63FF] text-sm font-medium mb-6">
            <span className="w-2 h-2 rounded-full bg-[#6C63FF] animate-pulse" />
            Available for work
          </div>

          <h1 className="font-grotesk font-bold text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-tight mb-4">
            <span className="text-gray-900 dark:text-white">Hello, I'm </span>
            <span className="gradient-text">Rolan</span>
            <br />
            <span className="text-gray-900 dark:text-white">Oktafian</span>
          </h1>

          <div className="flex items-center justify-center lg:justify-start gap-2 mb-6 h-10">
            <span className="text-xl sm:text-2xl font-grotesk font-medium text-gray-600 dark:text-gray-300">
              {displayText}
            </span>
            <span className="typewriter-cursor" />
          </div>

          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed">
            An IT Professional with experience in technical support, web development, and full-stack solutions. Focused on building reliable systems and exceptional user experiences.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <a
              href="/cv/CV-Rolan-Oktafian.pdf"
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 px-7 py-4 rounded-xl
                bg-gradient-to-r from-[#6C63FF] to-[#5A52E0] text-white font-semibold text-sm
                hover:shadow-lg hover:shadow-[#6C63FF]/30 hover:-translate-y-1 transition-all duration-200 glow"
            >
              <Download size={18} />
              Download CV
            </a>
            <a
              href="https://wa.me/6285182297311"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 px-7 py-4 rounded-xl
                bg-[#25D366] text-white font-semibold text-sm
                hover:shadow-lg hover:shadow-[#25D366]/30 hover:-translate-y-1 transition-all duration-200"
            >
              <MessageCircle size={18} />
              WhatsApp
            </a>
          </div>
        </div>

        {/* Avatar / Visual */}
        <div className="flex-shrink-0 relative">
          <div className="w-64 h-64 lg:w-80 lg:h-80 rounded-3xl relative animate-float">
            {/* Decorative border */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#6C63FF] to-[#00D4FF] p-0.5">
              <div className="w-full h-full rounded-3xl bg-gray-100 dark:bg-[#1A1A2E] flex items-center justify-center overflow-hidden">
                {/* Placeholder avatar - replace with actual photo */}
                <div className="text-center">
                  <div className="w-28 h-28 rounded-full bg-gradient-to-br from-[#6C63FF] to-[#00D4FF] mx-auto mb-4 flex items-center justify-center text-4xl font-grotesk font-bold text-white">
                    RO
                  </div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Your Photo Here</p>
                  <p className="text-gray-400 dark:text-gray-600 text-xs mt-1">Replace with image tag</p>
                </div>
              </div>
            </div>
            {/* Floating badges */}
            <div className="absolute -top-4 -right-4 bg-white dark:bg-[#1A1A2E] border border-gray-200 dark:border-[#2A2A4A] rounded-xl px-3 py-2 text-xs font-medium shadow-lg">
              <span className="text-[#6C63FF]">⚡</span> Full Stack Dev
            </div>
            <div className="absolute -bottom-4 -left-4 bg-white dark:bg-[#1A1A2E] border border-gray-200 dark:border-[#2A2A4A] rounded-xl px-3 py-2 text-xs font-medium shadow-lg">
              <span className="text-[#25D366]">🛠️</span> IT Support
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={scrollDown}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-400 dark:text-gray-600 hover:text-[#6C63FF] transition-colors"
      >
        <span className="text-xs font-medium">Scroll</span>
        <ChevronDown size={20} className="animate-bounce" />
      </button>
    </section>
  )
}
