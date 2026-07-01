import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-wc-surface text-white px-6 py-4 border-b border-wc-border">
      <nav className="grid grid-cols-3 items-center">
        <span className="font-black text-xl tracking-tight">
          FIFA <span className="text-yellow-400">World Cup</span> 2026
        </span>
        <div className="flex gap-8 justify-center">
          <Link
            href="/"
            className="text-sm font-medium tracking-widest uppercase hover:text-yellow-400 transition-colors duration-300"
          >
            Matches
          </Link>
          <Link
            href="/results"
            className="text-sm font-medium tracking-widest uppercase hover:text-yellow-400 transition-colors duration-300"
          >
            Results
          </Link>
          <Link
            href="/standings"
            className="text-sm font-medium tracking-widest uppercase hover:text-yellow-400 transition-colors duration-300"
          >
            Standings
          </Link>
        </div>
      </nav>
    </header>
  )
}
