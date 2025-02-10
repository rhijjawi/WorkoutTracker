import type { Metadata } from 'next'
import './globals.css'
import { UserPrefsProvider } from '@/components/providers/UserProviders'
import { Toaster } from '@/components/ui/sonner'

export const metadata: Metadata = {
  title: 'v0 App',
  description: 'Created with v0',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <UserPrefsProvider>
          {children}
          <Toaster />
        </UserPrefsProvider>
      </body>
    </html>
  )
}
