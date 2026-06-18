export default function Footer() {
  return (
    <footer className="py-8 bg-gray-50 dark:bg-[#0A0A0F] border-t border-gray-200 dark:border-[#1A1A2E]">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500 dark:text-gray-500">
        <div>
          <span className="font-grotesk font-semibold gradient-text">Rolan Oktafian</span>
          <span className="ml-2">· IT Support | Web Developer | Full Stack Developer | Networking</span>
        </div>
        <div>© {new Date().getFullYear()} Copyright, All rights reserved by <span className="font-grotesk font-semibold gradient-text">OlanFN</span>.</div>
      </div>
    </footer>
  )
}
