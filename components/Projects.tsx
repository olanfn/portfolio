'use client'
import { useEffect, useRef, useState } from 'react'
import { ExternalLink, Github, Globe } from 'lucide-react'

type ProjectItem = {
  title: string;
  category: string;
  description: string;
  tech: string[];
  github: string;
  demo: string | null;
  gradient: string;
  icon: string;
  featured: boolean;
};

const categories = ["Semua", "Web App", "Full Stack", "IT Tools", "Mobile"];

const projects: ProjectItem[] = [
  {
    "title": "E-Commerce Platform",
    "category": "Full Stack",
    "description": "Online shop with product management, shopping cart, integrated payments, and a comprehensive admin dashboard.",
    "tech": ["Laravel", "MySQL", "Midtrans", "Tailwind CSS"],
    "github": "https://github.com/olanfn",
    "demo": "https://demo.example.com",
    "gradient": "from-purple-500 to-indigo-600",
    "icon": "🛒",
    "featured": true
  },
  {
    "title": "Axie Infinity Game NFT Monitoring System",
    "category": "Web App",
    "description": "Monitoring dashboard for Axie Infinity game for NFT game asset management and tracking game performance.",
    "tech": ["Codeigniter", "MySQL", "Ranking point system", "Axie Infinity API"],
    "github": "https://github.com/olanfn",
    "demo": null,
    "gradient": "from-cyan-500 to-blue-600",
    "icon": "🖥️",
    "featured": true
  },
  {
    "title": "Human Resource Information System (HRIS) Recruitment Tracking System",
    "category": "Full Stack",
    "description": "Application Recruitment Tracking System for human resource management and employee performance tracking.",
    "tech": ["Laravel", "MySQL", "Jquery", "Ajax"],
    "github": "https://github.com/olanfn",
    "demo": "https://demo.example.com",
    "gradient": "from-green-500 to-teal-600",
    "icon": "💼",
    "featured": true
  },
  {
    "title": "Company Profile Website",
    "category": "Web App",
    "description": "Modern company profile website with scrolling animation, portfolio gallery, and contact form linked to company email.",
    "tech": ["WordPress", "PHP", "Custom Plugin"],
    "github": "https://github.com/olanfn",
    "demo": "https://demo.example.com",
    "gradient": "from-orange-500 to-pink-600",
    "icon": "🏢",
    "featured": false
  },
  {
    "title": "Inventory Management",
    "category": "Full Stack",
    "description": "Inventory management application with barcode scanner, real-time stock reports, and integration with POS systems.",
    "tech": ["React", "Node.js", "PostgreSQL", "Redis"],
    "github": "https://github.com/olanfn",
    "demo": "https://demo.example.com",
    "gradient": "from-violet-500 to-purple-700",
    "icon": "📦",
    "featured": false
  },
  {
    "title": "Network Monitor Dashboard",
    "category": "IT Tools",
    "description": "Real-time network monitoring dashboard to monitor bandwidth, latency, server uptime, and send automatic alerts.",
    "tech": ["Python", "Flask", "React", "InfluxDB", "Grafana"],
    "github": "https://github.com/olanfn",
    "demo": null,
    "gradient": "from-red-500 to-orange-600",
    "icon": "📡",
    "featured": false
  }
];

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [activeFilter, setActiveFilter] = useState(categories[0])
  const [filtered, setFiltered] = useState(projects)

  useEffect(() => {
    if (activeFilter === categories[0]) setFiltered(projects)
    else setFiltered(projects.filter(p => p.category === activeFilter))
  }, [activeFilter])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal').forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 100)
            })
          }
        })
      },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [filtered])

  return (
    <section id="projects" ref={sectionRef} className="py-24 bg-white dark:bg-[#0A0A0F]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Heading */}
        <div className="reveal mb-16 text-center">
          <span className="text-[#00D4FF] text-sm font-semibold uppercase tracking-widest">Project</span>
          <h2 className="font-grotesk font-bold text-3xl sm:text-4xl text-gray-900 dark:text-white mt-2">
            Project I've Made
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-[#00D4FF] to-[#6C63FF] rounded-full mx-auto mt-4" />
        </div>

        {/* Filters */}
        <div className="reveal flex flex-wrap justify-center gap-2 mb-12">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeFilter === cat
                ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900 shadow-md'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-[#1A1A2E] dark:text-gray-400 dark:hover:bg-[#2A2A4A]'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((project, i) => (
            <div key={project.title} className="reveal card-hover group relative bg-white dark:bg-[#1A1A2E] rounded-2xl overflow-hidden border border-gray-200 dark:border-[#2A2A4A] shadow-sm dark:shadow-none flex flex-col h-full">
              {/* Card Header (Gradient + Icon) */}
              <div className={`h-32 bg-gradient-to-br ${project.gradient} p-6 relative overflow-hidden flex items-center justify-center`}>
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                <span className="text-5xl relative z-10 transform group-hover:scale-110 transition-transform duration-300">
                  {project.icon}
                </span>
                {project.featured && (
                  <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md text-white text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1 border border-white/20">
                    <span className="text-yellow-300">★</span> Featured
                  </div>
                )}
              </div>

              {/* Card Content */}
              <div className="p-6 flex-1 flex flex-col">
                <span className="text-[#00D4FF] text-xs font-semibold uppercase tracking-wider mb-2">
                  {project.category}
                </span>
                <h3 className="font-grotesk font-bold text-xl text-gray-900 dark:text-white mb-3">
                  {project.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6 flex-1">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map(t => (
                    <span key={t} className="text-[11px] font-medium px-2.5 py-1 rounded-md bg-gray-100 dark:bg-[#0A0A0F] text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-[#2A2A4A]">
                      {t}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex items-center gap-4 pt-4 border-t border-gray-100 dark:border-[#2A2A4A]">
                  <a
                    href={project.github}
                    target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    <Github size={16} />
                    Source Code
                  </a>
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-sm font-medium text-[#00D4FF] hover:text-[#00B4D8] transition-colors ml-auto"
                    >
                      <Globe size={16} />
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
