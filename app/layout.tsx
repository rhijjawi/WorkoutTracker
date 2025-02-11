import type { Metadata } from 'next'
import './globals.css'
import { UserPrefsProvider } from '@/components/providers/UserProviders'
import { Toaster } from '@/components/ui/sonner'
import { WorkoutProvider } from '@/components/providers/DataProvider'
import { UnitProvider } from '@/components/providers/UnitSwitchProvider'

export const metadata: Metadata = {
  title: "Rumi & Ramzi's Fitness Tracker",
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
          <WorkoutProvider>
            <UnitProvider>
              {children}
            </UnitProvider>
            <Toaster />
          </WorkoutProvider>
        </UserPrefsProvider>
      </body>
    </html>
  )
}
