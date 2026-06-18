'use client'
import './globals.css'
import { useState, useEffect } from 'react'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [dark, setDark] = useState(true)

  useEffect(() => {
    const saved = localStorage.getItem('theme')
    if (saved === 'light') setDark(false)
    else setDark(true)
  }, [])

  useEffect(() => {
    const root = document.documentElement
    if (dark) {
      root.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      root.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [dark])

  return (
    <html lang="id" className={dark ? 'dark' : ''}>
      <head>
        <title>Rolan Oktafian – Portfolio</title>
        <meta name="description" content="IT Support | Web Developer | Full Stack Developer | Technical Support" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-white dark:bg-[#0A0A0F] text-gray-900 dark:text-gray-100 transition-colors duration-300">
        <div id="__theme_ctx" data-dark={dark ? '1' : '0'} style={{ display: 'none' }} />
        {children}
        <ThemeToggleFloating dark={dark} setDark={setDark} />
      </body>
    </html>
  )
}

function ThemeToggleFloating({ dark, setDark }: { dark: boolean; setDark: (v: boolean) => void }) {
  return (
    <button
      onClick={() => setDark(!dark)}
      aria-label="Toggle theme"
      className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full flex items-center justify-center
        bg-white dark:bg-[#1A1A2E] shadow-lg border border-gray-200 dark:border-[#2A2A4A]
        hover:scale-110 transition-all duration-200 text-xl"
    >
      {dark ? '☀️' : '🌙'}
    </button>
  )
}
