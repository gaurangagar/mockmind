'use client'

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Header() {
  const path = usePathname()

  return (
    <header className="flex items-center justify-between px-6 py-4 border-b bg-[#0f0f1a] text-white">

      {/* Left */}
      <div className="flex items-center gap-8">
        <h1 className="text-xl font-bold">MockMind</h1>

        <ul className="flex items-center gap-6">
          <li>
            <Link
              href="/dashboard"
              className={`transition ${
                path === "/dashboard"
                  ? "font-semibold text-white"
                  : "text-white/60 hover:text-white"
              }`}
            >
              Dashboard
            </Link>
          </li>

          <li>
            <Link
              href="/dashboard/previous-interviews"
              className={`transition ${
                path === "/dashboard/previous-interviews"
                  ? "font-semibold text-white"
                  : "text-white/60 hover:text-white"
              }`}
            >
              Previous Interviews
            </Link>
          </li>
        </ul>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        <Button className="bg-blue-600 hover:bg-blue-700">
          Logout
        </Button>
      </div>

    </header>
  )
}