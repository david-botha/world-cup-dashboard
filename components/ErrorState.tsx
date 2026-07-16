import { ReactNode } from 'react'

export default function ErrorState({ message, children }: { message: string; children?: ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-3 text-center border border-wc-border bg-wc-surface rounded p-10">
      <span className="text-4xl">⚠️</span>
      <div className="text-lg font-semibold">{message}</div>
      {children}
    </div>
  )
}
