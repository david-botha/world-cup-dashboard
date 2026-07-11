'use client'

import { useState } from 'react'
import Link from 'next/link'

const NAV_LINKS = [
  { href: '/', label: 'Matches' },
  { href: '/results', label: 'Results' },
  { href: '/standings', label: 'Standings' },
  { href: '/scorers', label: 'Top Scorers' },
  { href: '/knockouts', label: 'Knockouts' },
]

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-wc-surface text-white px-6 py-4 border-b border-wc-border">
      <nav className="flex md:grid md:grid-cols-[1fr_auto_1fr] items-center justify-between">
        <span className="font-black text-xl tracking-tight">
          FIFA <span className="text-yellow-400">World Cup</span> 2026
        </span>

        <div className="hidden md:flex gap-8 justify-self-center">
          {NAV_LINKS.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium tracking-widest uppercase hover:text-yellow-400 transition-colors duration-300"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden cursor-pointer"
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          {/* Hamburger icon: three horizontal bars via a raw SVG */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      </nav>

      {isMenuOpen && (
        <div className="md:hidden flex flex-col gap-4 mt-4">
          {NAV_LINKS.map(link => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className="text-sm font-medium tracking-widest uppercase hover:text-yellow-400 transition-colors duration-300"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  )
}
