'use client'
import { useEffect, useRef } from 'react'
import { Briefcase, Calendar, MapPin } from 'lucide-react'

type ExperienceItem = {
  company: string;
  role: string;
  period: string;
  location: string;
  type: string;
  description: string[] | string;
  skills: string[];
  color: string;
};

const experiences: ExperienceItem[] = [
  {
    "company": "PT. Bisakulak",
    "role": "IT Support & Technical Support",
    "period": "2026",
    "location": "Surabaya, Indonesia",
    "type": "Full time",
    "description": [
      "Performing IT equipment installation, configuration, and deployment (PC, laptop, printer, CCTV)",
      "Handling hardware & software troubleshooting and user incidents",
      "Conducting routine maintenance to improve system stability and reduce operational disruptions",
      "Documenting IT support activities and technical reports"
    ],
    "skills": ["Hardware", "Networking", "CCTV", "Help Desk", "Troubleshooting"],
    "color": "#6C63FF"
  },
  {
    "company": "PT. Bangun Indopralon Sukses",
    "role": "IT Staff & Web Developer",
    "period": "2021 – 2023",
    "location": "Surabaya, Indonesia",
    "type": "Full time",
    "description": [
      "Providing technical support to 20+ users for IT equipment",
      "Developing internal web applications for HR Recruitment needs",
      "Performing website development for SEO optimization, content and image updates",
      "Installing and configuring operating systems and application software",
      "Conducting preventive maintenance and device repair",
      "Supporting LAN/WAN network operations"
    ],
    "skills": ["Troubleshooting", "WordPress/Shopify", "Laravel", "Hardware", "Help Desk"],
    "color": "#00D4FF"
  },
  {
    "company": "PT. Narumonda Sitio Tio",
    "role": "IT Staff & Fullstack Developer",
    "period": "2019 – 2021",
    "location": "Surabaya, Indonesia",
    "type": "Full time",
    "description": [
      "Developing internal web applications for employee data management",
      "Implementing barcode systems for operational needs",
      "Performing debugging, testing, and application maintenance",
      "Handling IT troubleshooting (hardware, software, network)",
      "Coordinating with vendors/ISPs for network setup and troubleshooting"
    ],
    "skills": ["Troubleshooting", "Hardware", "Fullstack Development", "Software", "Networking", "Help Desk"],
    "color": "#F59E0B"
  },
  {
    "company": "CV. Concealindo Brankas | Game-Axie Infinity | PT. Mahkota Kargo",
    "role": "Web Developer",
    "period": "2017 – 2022",
    "location": "Remote",
    "type": "Freelance",
    "description": [
      "Creating PHP & WordPress-based websites and applications",
      "Performing SEO optimization (On-Page & Off-Page) to increase traffic",
      "Integrating APIs for monitoring system needs",
      "Maintaining and troubleshooting websites"
    ],
    "skills": ["Fullstack Development", "WordPress", "API Integration", "Optimize SEO", "PHP", "JavaScript"],
    "color": "#F59E0B"
  }
];

export default function Experience() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal').forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 150)
            })
          }
        })
      },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="experience" ref={sectionRef} className="py-24 bg-gray-50/50 dark:bg-[#0A0A0F]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Heading */}
        <div className="reveal mb-16 text-center">
          <span className="text-[#6C63FF] text-sm font-semibold uppercase tracking-widest">Experience</span>
          <h2 className="font-grotesk font-bold text-3xl sm:text-4xl text-gray-900 dark:text-white mt-2">
            Experience
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-[#6C63FF] to-[#00D4FF] rounded-full mx-auto mt-4" />
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#6C63FF] via-[#00D4FF] to-transparent" />

          <div className="flex flex-col gap-12">
            {experiences.map((exp, i) => (
              <div
                key={i}
                className={`reveal relative flex flex-col md:flex-row gap-8 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
              >
                {/* Dot */}
                <div
                  className="absolute left-4 md:left-1/2 md:-translate-x-1/2 w-4 h-4 rounded-full border-2 border-white dark:border-[#0A0A0F] top-6"
                  style={{ backgroundColor: exp.color }}
                />

                {/* Empty side (desktop) */}
                <div className="hidden md:block flex-1" />

                {/* Card */}
                <div className="flex-1 ml-10 md:ml-0">
                  <div className="card-hover bg-white dark:bg-[#1A1A2E] rounded-2xl p-6 border border-gray-200 dark:border-[#2A2A4A] shadow-sm dark:shadow-none">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-grotesk font-bold text-lg text-gray-900 dark:text-white">{exp.role}</h3>
                        <p className="text-[#6C63FF] font-semibold text-sm mt-0.5">{exp.company}</p>
                      </div>
                      <span
                        className="text-xs font-medium px-2.5 py-1 rounded-full shrink-0 ml-3"
                        style={{ backgroundColor: `${exp.color}20`, color: exp.color }}
                      >
                        {exp.type}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-500 dark:text-gray-400">
                      <span className="flex items-center gap-1.5">
                        <Calendar size={13} />
                        {exp.period}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin size={13} />
                        {exp.location}
                      </span>
                    </div>

                    <div className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">
                      {Array.isArray(exp.description) ? (
                        <ul className="list-disc list-inside space-y-1">
                          {exp.description.map((item, idx) => (
                            <li key={idx}>{item}</li>
                          ))}
                        </ul>
                      ) : (
                        exp.description
                      )}
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {exp.skills.map((skill) => (
                        <span
                          key={skill}
                          className="text-xs px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-[#0A0A0F] text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-[#2A2A4A]"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
