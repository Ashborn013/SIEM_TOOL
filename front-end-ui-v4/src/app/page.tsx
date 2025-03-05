import Link from 'next/link'
import { Shield, BarChart2, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link className="flex items-center justify-center" href="/">
          <Shield className="h-6 w-6" />
          <span className="ml-2 text-2xl font-bold">SIEM Guard</span>
        </Link>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Welcome to SIEM Guard
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Your all-in-one Security Information and Event Management solution. 
                  Monitor, analyze, and respond to security events in real-time.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <Button asChild className="w-full" size="lg">
                  <Link href="/login">
                    Login to Dashboard
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col items-center space-y-4 text-center ">
                <BarChart2 className="h-10 w-10 text-primary" />
                <h2 className="text-2xl font-bold">Real-time Analytics</h2>
                <p className="text-gray-500 dark:text-gray-400">
                  Get instant insights into your security posture with our advanced analytics engine.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <AlertCircle className="h-10 w-10 text-primary" />
                <h2 className="text-2xl font-bold">Threat Detection</h2>
                <p className="text-gray-500 dark:text-gray-400">
                  Identify and respond to potential security threats before they become critical issues.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <Shield className="h-10 w-10 text-primary" />
                <h2 className="text-2xl font-bold">Compliance Management</h2>
                <p className="text-gray-500 dark:text-gray-400">
                  Stay compliant with industry standards and regulations with our comprehensive reporting tools.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2024 SIEM Guard. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}

