"use client"

import { useState, useEffect } from "react"
import { db } from "@/lib/firebase"
import { collection, getDocs } from "firebase/firestore"
import {
  Users,
  Clock,
  TrendingUp,
  TrendingDown,
  UserCheck,
  Eye,
  ArrowDown,
  ChevronDown,
} from "lucide-react"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DashboardLayout } from "@/components/dashboard-layout"

// ---- Mock Data ----
const funnelSteps = [
  { label: "Presencia Detectada", value: 4820, rate: "100%", color: "hsl(var(--chart-1))" },
  { label: "Sesion Iniciada", value: 2170, rate: "45%", color: "hsl(var(--chart-4))" },
  { label: "Interaccion IA", value: 1412, rate: "29.3%", color: "hsl(var(--chart-2))" },
  { label: "Registro Completado", value: 634, rate: "13.2%", color: "hsl(var(--chart-5))" },
]

const iconMap = {
  Users,
  Eye,
  Clock,
  UserCheck,
  TrendingUp,
  TrendingDown,
}

// Los KPIs ahora se cargarán desde Firestore

const dailyTrend = [
  { date: "11 Jun", presencias: 420, sesiones: 190, registros: 52 },
  { date: "12 Jun", presencias: 510, sesiones: 230, registros: 68 },
  { date: "13 Jun", presencias: 480, sesiones: 210, registros: 60 },
  { date: "14 Jun", presencias: 680, sesiones: 310, registros: 92 },
  { date: "15 Jun", presencias: 740, sesiones: 340, registros: 110 },
  { date: "16 Jun", presencias: 620, sesiones: 280, registros: 85 },
  { date: "17 Jun", presencias: 550, sesiones: 250, registros: 72 },
  { date: "18 Jun", presencias: 820, sesiones: 360, registros: 95 },
]

const noSessionData = [
  { hour: "08:00", rate: 68 },
  { hour: "09:00", rate: 62 },
  { hour: "10:00", rate: 55 },
  { hour: "11:00", rate: 48 },
  { hour: "12:00", rate: 42 },
  { hour: "13:00", rate: 51 },
  { hour: "14:00", rate: 38 },
  { hour: "15:00", rate: 35 },
  { hour: "16:00", rate: 40 },
  { hour: "17:00", rate: 52 },
  { hour: "18:00", rate: 58 },
  { hour: "19:00", rate: 45 },
  { hour: "20:00", rate: 60 },
]

export default function Page() {

  const [selectedPeriod, setSelectedPeriod] = useState("Ultimos 7 dias")
  const [kpiCards, setKpiCards] = useState<Array<any>>([])

  useEffect(() => {
    async function fetchKPIs() {
      const querySnapshot = await getDocs(collection(db, "kpis"))
      const kpis = querySnapshot.docs.map(doc => {
        const data = doc.data()
        return {
          ...data,
          icon: iconMap[data.icon as keyof typeof iconMap] || Users,
        }
      })
      setKpiCards(kpis)
    }
    fetchKPIs()
  }, [])

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-foreground">Overview</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Funnel completo y metricas macro del kiosko
          </p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2 bg-secondary border-border text-foreground hover:bg-muted">
              {selectedPeriod} <ChevronDown className="w-3 h-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setSelectedPeriod("Hoy")}>Hoy</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSelectedPeriod("Ultimos 7 dias")}>Ultimos 7 dias</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSelectedPeriod("Ultimos 30 dias")}>Ultimos 30 dias</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-5 gap-4 mb-6">
        {kpiCards.map((kpi, i) => (
          <Card key={i} className="border-border bg-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center">
                  {kpi.icon && <kpi.icon className="w-4 h-4 text-muted-foreground" />}
                </div>
                <div
                  className={`flex items-center gap-1 text-xs font-medium ${
                    kpi.trend === "up" ? "text-chart-5" : "text-destructive"
                  }`}
                >
                  {kpi.trend === "up" ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {kpi.change}
                </div>
              </div>
              <div className="text-2xl font-semibold text-foreground">{kpi.value}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{kpi.title}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-6 mb-6">
        {/* Conversion Funnel */}
        <Card className="border-border bg-card col-span-1">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold text-foreground">Funnel de Conversion</CardTitle>
            <p className="text-xs text-muted-foreground">Presencia a Registro</p>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3">
              {funnelSteps.map((step, i) => {
                const widthPercent = (step.value / funnelSteps[0].value) * 100
                return (
                  <div key={i}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs text-foreground font-medium">{step.label}</span>
                      <span className="text-xs font-mono text-muted-foreground">{step.value.toLocaleString()}</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-6 relative overflow-hidden">
                      <div
                        className="h-full rounded-full flex items-center justify-end pr-2 transition-all"
                        style={{ width: `${widthPercent}%`, backgroundColor: step.color }}
                      >
                        <span className="text-[10px] font-semibold text-background">{step.rate}</span>
                      </div>
                    </div>
                    {i < funnelSteps.length - 1 && (
                      <div className="flex justify-center my-1">
                        <ArrowDown className="w-3 h-3 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
            <div className="mt-4 pt-3 border-t border-border">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">No Session Rate</span>
                <span className="text-sm font-semibold text-accent">55.0%</span>
              </div>
              <div className="flex items-center justify-between mt-1">
                <span className="text-xs text-muted-foreground">Abandonment Rate</span>
                <span className="text-sm font-semibold text-destructive">70.8%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Daily Trend Chart */}
        <Card className="border-border bg-card col-span-2">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold text-foreground">Tendencia Diaria</CardTitle>
            <p className="text-xs text-muted-foreground">Presencias, sesiones y registros por dia</p>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={dailyTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                      color: "hsl(var(--foreground))",
                    }}
                    labelStyle={{ color: "hsl(var(--foreground))" }}
                  />
                  <Area
                    type="monotone"
                    dataKey="presencias"
                    stroke="hsl(var(--chart-1))"
                    fill="hsl(var(--chart-1))"
                    fillOpacity={0.15}
                    strokeWidth={2}
                    name="Presencias"
                  />
                  <Area
                    type="monotone"
                    dataKey="sesiones"
                    stroke="hsl(var(--chart-4))"
                    fill="hsl(var(--chart-4))"
                    fillOpacity={0.1}
                    strokeWidth={2}
                    name="Sesiones"
                  />
                  <Area
                    type="monotone"
                    dataKey="registros"
                    stroke="hsl(var(--chart-5))"
                    fill="hsl(var(--chart-5))"
                    fillOpacity={0.1}
                    strokeWidth={2}
                    name="Registros"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center gap-6 mt-3 px-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-0.5 rounded bg-chart-1"></div>
                <span className="text-[11px] text-muted-foreground">Presencias</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-0.5 rounded bg-chart-4"></div>
                <span className="text-[11px] text-muted-foreground">Sesiones</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-0.5 rounded bg-chart-5"></div>
                <span className="text-[11px] text-muted-foreground">Registros</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-2 gap-6">
        {/* No Session Rate por hora */}
        <Card className="border-border bg-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold text-foreground">No Session Rate por Hora</CardTitle>
            <p className="text-xs text-muted-foreground">% de personas que no interactuan mas de 10s</p>
          </CardHeader>
          <CardContent>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={noSessionData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="hour" stroke="hsl(var(--muted-foreground))" fontSize={10} tickLine={false} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={10} tickLine={false} domain={[0, 100]} unit="%" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                      color: "hsl(var(--foreground))",
                    }}
                    labelStyle={{ color: "hsl(var(--foreground))" }}
                    formatter={(value) => [`${value ?? 0}%`, "No Session Rate"]}
                  />
                  <Bar dataKey="rate" radius={[3, 3, 0, 0]}>
                    {noSessionData.map((entry, index) => (
                      <Cell key={index} fill={entry.rate > 55 ? "hsl(var(--destructive))" : entry.rate > 45 ? "hsl(var(--chart-2))" : "hsl(var(--chart-1))"} fillOpacity={0.7} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* KPIs ejecutivos resumen */}
        <Card className="border-border bg-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold text-foreground">KPIs Ejecutivos</CardTitle>
            <p className="text-xs text-muted-foreground">Resumen para vista C-Level</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg bg-secondary p-3">
                <p className="text-xs text-muted-foreground">Traffic Total</p>
                <p className="text-lg font-semibold text-foreground mt-1">4,820</p>
                <p className="text-[10px] text-chart-5 mt-0.5">+18.3% vs semana anterior</p>
              </div>
              <div className="rounded-lg bg-secondary p-3">
                <p className="text-xs text-muted-foreground">Engagement Rate</p>
                <p className="text-lg font-semibold text-foreground mt-1">45.0%</p>
                <p className="text-[10px] text-chart-5 mt-0.5">+3.1pts vs semana anterior</p>
              </div>
              <div className="rounded-lg bg-secondary p-3">
                <p className="text-xs text-muted-foreground">Avg Session Duration</p>
                <p className="text-lg font-semibold text-foreground mt-1">2m 34s</p>
                <p className="text-[10px] text-chart-5 mt-0.5">+12s vs semana anterior</p>
              </div>
              <div className="rounded-lg bg-secondary p-3">
                <p className="text-xs text-muted-foreground">Conversion Rate</p>
                <p className="text-lg font-semibold text-foreground mt-1">13.2%</p>
                <p className="text-[10px] text-chart-5 mt-0.5">+1.8pts vs semana anterior</p>
              </div>
              <div className="rounded-lg bg-primary/10 border border-primary/20 p-3 col-span-2">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-primary">Total Registros</p>
                    <p className="text-2xl font-bold text-primary mt-1">634</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Meta semanal</p>
                    <p className="text-sm font-medium text-foreground">500</p>
                    <p className="text-[10px] text-chart-5 mt-0.5">126.8% completado</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
