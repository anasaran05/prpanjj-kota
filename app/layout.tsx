import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Fraunces, Inter, Barlow_Condensed } from 'next/font/google'
import { StripedPattern } from '@/components/ui/striped-pattern'
import './globals.css'

const fraunces = Fraunces({ subsets: ['latin'], variable: '--font-fraunces', display: 'swap' })
const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })
const barlowCondensed = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['600', '700', '800', '900'],
  variable: '--font-hero-display',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Prapanjj Kota — Founder · Diamantaire · Builder',
  description: 'The personal site of Prapanjj Kota, Founder & CEO of Réia Diamonds.',
  icons: {
    icon: '/icon.svg',
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = { colorScheme: 'light', themeColor: '#f5f5f2' }

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable} ${barlowCondensed.variable}`}>
      <body className="antialiased relative min-h-screen">
        <StripedPattern
          className="fixed inset-0 pointer-events-none z-0 text-black/[0.045]"
          width={18}
          height={18}
        />
        <div className="relative z-10">
          {children}
        </div>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}


