import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'SNS HUNT',
  description: 'Created by Dexterr',
  generator: 'dexterr.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
