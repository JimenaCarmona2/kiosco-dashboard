"use client"

import type React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Activity,
  TrendingUp,
  ChevronDown,
  Bell,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

const navigation = [
  { name: "Overview", href: "/", icon: LayoutDashboard },
  { name: "Engagement", href: "/engagement", icon: Activity },
  { name: "Conversion", href: "/conversion", icon: TrendingUp },
]

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="h-14 border-b border-border bg-card px-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-primary-foreground" fill="currentColor">
                <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="1.5" />
                <path d="M12 2 C12 2 8 6 8 12 C8 18 12 22 12 22" fill="none" stroke="currentColor" strokeWidth="1.2" />
                <path d="M12 2 C12 2 16 6 16 12 C16 18 12 22 12 22" fill="none" stroke="currentColor" strokeWidth="1.2" />
                <line x1="2" y1="12" x2="22" y2="12" stroke="currentColor" strokeWidth="1.2" />
                <path d="M3.5 7.5 C3.5 7.5 8 9 12 9 C16 9 20.5 7.5 20.5 7.5" fill="none" stroke="currentColor" strokeWidth="1" />
                <path d="M3.5 16.5 C3.5 16.5 8 15 12 15 C16 15 20.5 16.5 20.5 16.5" fill="none" stroke="currentColor" strokeWidth="1" />
              </svg>
            </div>
            <div>
              <span className="font-semibold text-foreground text-sm">Kiosko Mundial 2026</span>
              <span className="text-muted-foreground text-xs ml-2">Nuevo Leon</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Badge variant="outline" className="border-primary/30 text-primary bg-primary/10 text-xs">
            En vivo
          </Badge>
          <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-foreground">
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-destructive rounded-full"></span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-foreground">
                <Avatar className="w-7 h-7">
                  <AvatarFallback className="bg-secondary text-secondary-foreground text-xs">KM</AvatarFallback>
                </Avatar>
                <ChevronDown className="w-3 h-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel className="text-foreground">Kiosko Admin</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Configuracion</DropdownMenuItem>
              <DropdownMenuItem>Exportar datos</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Cerrar sesion</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-56 border-r border-border bg-card h-[calc(100vh-3.5rem)] overflow-y-auto">
          <div className="p-4">
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-3 px-3 font-medium">Vistas</p>
            <nav className="flex flex-col gap-1">
              {navigation.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-primary/15 text-primary"
                        : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                    }`}
                  >
                    <item.icon className="w-4 h-4 mr-3" />
                    {item.name}
                  </Link>
                )
              })}
            </nav>

            <div className="mt-8 px-3">
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-3 font-medium">Estado del kiosko</p>
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Sensores</span>
                  <span className="w-2 h-2 rounded-full bg-chart-5"></span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Avatar IA</span>
                  <span className="w-2 h-2 rounded-full bg-chart-5"></span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Pantalla</span>
                  <span className="w-2 h-2 rounded-full bg-chart-5"></span>
                </div>
              </div>
            </div>

            <div className="mt-8 px-3">
              <div className="rounded-lg bg-secondary/50 border border-border p-3">
                <p className="text-xs font-medium text-foreground">FIFA World Cup 2026</p>
                <p className="text-[10px] text-muted-foreground mt-1">Estadio BBVA - Monterrey, NL</p>
                <div className="flex items-center gap-1.5 mt-2">
                  <div className="w-4 h-3 rounded-sm bg-chart-5"></div>
                  <div className="w-4 h-3 rounded-sm bg-foreground"></div>
                  <div className="w-4 h-3 rounded-sm bg-destructive"></div>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-y-auto h-[calc(100vh-3.5rem)]">{children}</main>
      </div>
    </div>
  )
}
