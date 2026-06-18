'use client'
import { useEffect, useRef, useState } from 'react'
import { Mail, Phone, MapPin, Send, MessageCircle, CheckCircle } from 'lucide-react'

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal').forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 130)
            })
          }
        })
      },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault()
    // Send via mailto
    const subject = encodeURIComponent(form.subject || 'Pesan dari Portfolio')
    const body = encodeURIComponent(`Nama: ${form.name}\nEmail: ${form.email}\n\n${form.message}`)
    window.location.href = `mailto:rolan.oktafian@email.com?subject=${subject}&body=${body}`
    setSent(true)
    setTimeout(() => setSent(false), 3000)
  }

  const handleWhatsApp = () => {
    const defaultBody = 'Halo Rolan! Saya [nama Anda] ingin menghubungi Anda.'.replace('[nama Anda]', form.name || '[nama Anda]')
    const msg = encodeURIComponent(`${defaultBody}${form.message ? '\n\n' + form.message : ''}`)
    window.open(`https://wa.me/6285182297311?text=${msg}`, '_blank')
  }

  return (
    <section id="contact" ref={sectionRef} className="py-24 bg-white dark:bg-[#0D0D1A]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Heading */}
        <div className="reveal mb-16 text-center">
          <span className="text-[#00D4FF] text-sm font-semibold uppercase tracking-widest">Hubungi Saya</span>
          <h2 className="font-grotesk font-bold text-3xl sm:text-4xl text-gray-900 dark:text-white mt-2">Let's Connect</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-[#6C63FF] to-[#00D4FF] rounded-full mx-auto mt-4" />
          <p className="text-gray-500 dark:text-gray-400 mt-4 max-w-md mx-auto text-sm">
            Punya project atau pertanyaan? Saya siap membantu. Kirim pesan atau hubungi langsung via WhatsApp.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Info */}
          <div className="lg:col-span-2 space-y-6">
            {[
              { icon: <Mail size={18} />, label: 'Email', value: 'rolan.oktafian@email.com', href: 'mailto:rolan.oktafian@email.com' },
              { icon: <Phone size={18} />, label: 'WhatsApp', value: '+62 851-8229-7311', href: 'https://wa.me/6285182297311' },
              { icon: <MapPin size={18} />, label: 'Lokasi', value: 'Jakarta, Indonesia', href: null },
            ].map((info) => (
              <div key={info.label} className="reveal">
                {info.href ? (
                  <a
                    href={info.href}
                    target={info.href.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-5 bg-gray-50 dark:bg-[#1A1A2E] rounded-xl border border-gray-200 dark:border-[#2A2A4A] hover:border-[#6C63FF]/40 transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#6C63FF] to-[#5A52E0] flex items-center justify-center text-white shrink-0">
                      {info.icon}
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{info.label}</p>
                      <p className="text-sm font-medium text-gray-800 dark:text-gray-200 group-hover:text-[#6C63FF] transition-colors">{info.value}</p>
                    </div>
                  </a>
                ) : (
                  <div className="flex items-center gap-4 p-5 bg-gray-50 dark:bg-[#1A1A2E] rounded-xl border border-gray-200 dark:border-[#2A2A4A]">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#6C63FF] to-[#5A52E0] flex items-center justify-center text-white shrink-0">
                      {info.icon}
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{info.label}</p>
                      <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{info.value}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* WhatsApp CTA */}
            <div className="reveal">
              <a
                href="https://wa.me/6285182297311"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 w-full py-4 rounded-xl
                  bg-[#25D366] text-white font-semibold text-sm
                  hover:shadow-lg hover:shadow-[#25D366]/25 hover:-translate-y-1 transition-all duration-200"
              >
                <MessageCircle size={18} />
                Chat di WhatsApp
              </a>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3 reveal">
            <div className="bg-gray-50 dark:bg-[#1A1A2E] rounded-2xl p-8 border border-gray-200 dark:border-[#2A2A4A]">
              <h3 className="font-grotesk font-bold text-lg text-gray-900 dark:text-white mb-6">Kirim Pesan</h3>

              <div className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1.5">Nama Lengkap</label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Nama Anda"
                      className="w-full px-4 py-3 rounded-xl bg-white dark:bg-[#0A0A0F] border border-gray-200 dark:border-[#2A2A4A] text-gray-900 dark:text-white text-sm placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:border-[#6C63FF] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1.5">Email</label>
                    <input
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      type="email"
                      placeholder="email@anda.com"
                      className="w-full px-4 py-3 rounded-xl bg-white dark:bg-[#0A0A0F] border border-gray-200 dark:border-[#2A2A4A] text-gray-900 dark:text-white text-sm placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:border-[#6C63FF] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1.5">Subjek</label>
                  <input
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="Perihal pesan Anda"
                    className="w-full px-4 py-3 rounded-xl bg-white dark:bg-[#0A0A0F] border border-gray-200 dark:border-[#2A2A4A] text-gray-900 dark:text-white text-sm placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:border-[#6C63FF] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1.5">Pesan</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Tulis pesan Anda di sini..."
                    className="w-full px-4 py-3 rounded-xl bg-white dark:bg-[#0A0A0F] border border-gray-200 dark:border-[#2A2A4A] text-gray-900 dark:text-white text-sm placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:border-[#6C63FF] transition-colors resize-none"
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    onClick={handleSubmit}
                    className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl
                      bg-gradient-to-r from-[#6C63FF] to-[#5A52E0] text-white font-semibold text-sm
                      hover:shadow-lg hover:shadow-[#6C63FF]/25 hover:-translate-y-0.5 transition-all duration-200"
                  >
                    {sent ? <><CheckCircle size={16} /> Terkirim!</> : <><Send size={16} /> Kirim Email</>}
                  </button>
                  <button
                    onClick={handleWhatsApp}
                    className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl
                      bg-[#25D366] text-white font-semibold text-sm
                      hover:shadow-lg hover:shadow-[#25D366]/25 hover:-translate-y-0.5 transition-all duration-200"
                  >
                    <MessageCircle size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
