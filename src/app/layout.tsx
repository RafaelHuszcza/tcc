import '@/styles/globals.css'

import type { Metadata } from 'next'
import { Inter as FontSans } from 'next/font/google'

import { cn } from '@/lib/utils'
import { Providers } from '@/providers'

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: 'Abrigos RG',
  description:
    'Sistema de Gerenciamento de abrigos temporários para População da Cidade de Rio Grande.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-br">
      <body
        className={cn('bg-background font-sans antialiased', fontSans.variable)}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
