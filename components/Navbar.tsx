'use client'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState('home')

  const navItems = [
    { label: 'Beranda', href: '#home' },
    { label: 'Pengalaman', href: '#experience' },
    { label: 'Proyek', href: '#projects' },
    { label: 'Tentang', href: '#about' },
    { label: 'Kontak', href: '#contact' },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
      const sections = ['home', 'experience', 'projects', 'about', 'contact']
      for (const id of sections.reverse()) {
        const el = document.getElementById(id)
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActive(id)
          break
        }
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNav = (href: string) => {
    setMenuOpen(false)
    const id = href.replace('#', '')
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
      scrolled
        ? 'bg-white/90 dark:bg-[#0A0A0F]/90 backdrop-blur-md shadow-lg shadow-black/10 dark:shadow-black/30 border-b border-gray-200/50 dark:border-[#2A2A4A]/50'
        : 'bg-transparent'
    }`}>
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <button onClick={() => handleNav('#home')} className="font-grotesk font-bold text-xl flex-shrink-0">
          <span className="gradient-text">Rolan </span>
          <span className="text-gray-900 dark:text-white">Oktafian</span>
        </button>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <li key={item.href}>
              <button
                onClick={() => handleNav(item.href)}
                className={`nav-link font-inter text-sm font-medium transition-colors pb-1 ${
                  active === item.href.replace('#', '')
                    ? 'text-[#6C63FF] dark:text-[#6C63FF]'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Mobile menu button */}
        <div className="flex items-center gap-4 md:hidden">
          <button
            className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#1A1A2E]"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {menuOpen && (
        <div className="md:hidden bg-white dark:bg-[#0A0A0F] border-t border-gray-200 dark:border-[#2A2A4A] px-6 py-4 flex flex-col gap-4">
          {navItems.map((item) => (
            <button
              key={item.href}
              onClick={() => handleNav(item.href)}
              className={`text-left text-sm font-medium py-2 border-b border-gray-100 dark:border-[#1A1A2E] ${
                active === item.href.replace('#', '')
                  ? 'text-[#6C63FF]'
                  : 'text-gray-700 dark:text-gray-300'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  )
}
