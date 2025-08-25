'use client'

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import Link from "next/link"
import { 
  LayoutDashboard, 
  Calendar, 
  Users, 
  Settings,
  Menu
} from "lucide-react"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className={cn(
        "bg-white h-screen px-4 pt-8 pb-4 border-r relative flex flex-col",
        collapsed ? "w-20" : "w-60"
      )}>
        <Button 
          variant="ghost" 
          className="absolute right-2 top-2 p-2"
          onClick={() => setCollapsed(!collapsed)}
        >
          <Menu className="h-6 w-6" />
        </Button>

        <div className="flex-1 py-8">
          <nav className="space-y-2">
            <Link href="/admin">
              <Button variant="ghost" className="w-full justify-start">
                <LayoutDashboard className="mr-2 h-5 w-5"/>
                {!collapsed && <span>Dashboard</span>}
              </Button>
            </Link>
            <Link href="/admin/events">
              <Button variant="ghost" className="w-full justify-start">
                <Calendar className="mr-2 h-5 w-5"/>
                {!collapsed && <span>Events</span>}
              </Button>
            </Link>
            <Link href="/admin/users">
              <Button variant="ghost" className="w-full justify-start">
                <Users className="mr-2 h-5 w-5"/>
                {!collapsed && <span>Users</span>}
              </Button>
            </Link>
            <Link href="/admin/settings">
              <Button variant="ghost" className="w-full justify-start">
                <Settings className="mr-2 h-5 w-5"/>
                {!collapsed && <span>Settings</span>}
              </Button>
            </Link>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {children}
      </div>
    </div>
  )
}