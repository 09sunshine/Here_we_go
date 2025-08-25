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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex">
      {/* Sidebar */}
      <div className={cn(
        "bg-gradient-to-b from-slate-800 to-slate-900 h-screen px-4 pt-8 pb-4 border-r border-slate-700 relative flex flex-col shadow-2xl transition-all duration-300 ease-in-out backdrop-blur-lg",
        collapsed ? "w-20" : "w-64"
      )}>
        <div className="flex items-center justify-between mb-8">
          {!collapsed && (
            <span className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Admin Panel</span>
          )}
          <Button 
            variant="ghost" 
            className={cn(
              "p-2 hover:bg-slate-700/50 transition-all duration-200 rounded-xl border border-slate-600/30",
              collapsed ? "mx-auto" : "ml-auto"
            )}
            onClick={() => setCollapsed(!collapsed)}
          >
            <Menu className="h-5 w-5 text-slate-300" />
          </Button>
        </div>

        <div className="flex-1">
          <nav className="space-y-2">
            <Link href="/admin">
              <Button 
                variant="ghost" 
                className="w-full justify-start hover:bg-gradient-to-r hover:from-indigo-600/20 hover:to-purple-600/20 transition-all duration-200 rounded-xl border border-transparent hover:border-indigo-500/30 text-slate-300 hover:text-white"
              >
                <LayoutDashboard className={cn(
                  "h-5 w-5",
                  collapsed ? "mx-auto" : "mr-3"
                )}/>
                {!collapsed && <span>Dashboard</span>}
              </Button>
            </Link>
            <Link href="/admin/events">
              <Button 
                variant="ghost" 
                className="w-full justify-start hover:bg-gradient-to-r hover:from-indigo-600/20 hover:to-purple-600/20 transition-all duration-200 rounded-xl border border-transparent hover:border-indigo-500/30 text-slate-300 hover:text-white"
              >
                <Calendar className={cn(
                  "h-5 w-5",
                  collapsed ? "mx-auto" : "mr-3"
                )}/>
                {!collapsed && <span>Events</span>}
              </Button>
            </Link>
            <Link href="/admin/users">
              <Button 
                variant="ghost" 
                className="w-full justify-start hover:bg-gradient-to-r hover:from-indigo-600/20 hover:to-purple-600/20 transition-all duration-200 rounded-xl border border-transparent hover:border-indigo-500/30 text-slate-300 hover:text-white"
              >
                <Users className={cn(
                  "h-5 w-5",
                  collapsed ? "mx-auto" : "mr-3"
                )}/>
                {!collapsed && <span>Users</span>}
              </Button>
            </Link>
            <Link href="/admin/settings">
              <Button 
                variant="ghost" 
                className="w-full justify-start hover:bg-gradient-to-r hover:from-indigo-600/20 hover:to-purple-600/20 transition-all duration-200 rounded-xl border border-transparent hover:border-indigo-500/30 text-slate-300 hover:text-white"
              >
                <Settings className={cn(
                  "h-5 w-5",
                  collapsed ? "mx-auto" : "mr-3"
                )}/>
                {!collapsed && <span>Settings</span>}
              </Button>
            </Link>
          </nav>
        </div>

        <div className="pt-4 border-t border-slate-700">
          <div className="flex items-center p-3 rounded-xl hover:bg-slate-700/30 transition-all duration-200 border border-slate-600/30">
            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg">
              <Users className="h-5 w-5 text-white" />
            </div>
            {!collapsed && (
              <div className="ml-3">
                <p className="text-sm font-medium text-slate-200">Admin User</p>
                <p className="text-xs text-slate-400">admin@example.com</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="p-8">
          {children}
        </div>
      </div>
    </div>
  )
}