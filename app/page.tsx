import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Experience from '@/components/Experience'
import Projects from '@/components/Projects'
import About from '@/components/About'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL('https://portfolio-olanfn.vercel.app/'),
  title: 'Rolan Oktafian – Portfolio',
  description: 'IT Support | Web Developer | Full Stack Developer | Technical Support',
  icons: {
    icon: '/photos/icon.png', // Memastikan favicon portfolio Anda muncul
  },
  openGraph: {
    title: 'Rolan Oktafian – Portfolio',
    description: 'IT Support | Web Developer | Full Stack Developer | Technical Support',
    url: 'https://portfolio-olanfn.vercel.app/',
    siteName: 'Rolan Oktafian – Portfolio',
    images: [
      {
        url: 'http://raw.githubusercontent.com/olanfn/portfolio/refs/heads/main/public/photos/icon-portfolio.png', // Gambar OG yang menarik untuk media sosial
        width: 1200,
        height: 630,
      }
    ],
    locale: 'id_ID',
    type: 'website'
  }
};

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Experience />
        <Projects />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
