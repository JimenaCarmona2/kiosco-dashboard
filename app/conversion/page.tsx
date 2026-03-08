"use client"

import { useState } from "react"
import {
  TrendingUp,
  TrendingDown,
  ChevronDown,
  Target,
  Clock,
  ArrowDown,
  UserCheck,
} from "lucide-react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  ScatterChart,
  Scatter,
  ZAxis,
  LineChart,
  Line,
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { DashboardLayout } from "@/components/dashboard-layout"

// Drop-off analysis
const dropOffData = [
  { stage: "Presencia", users: 4820, dropRate: 0 },
  { stage: "Sesion", users: 2170, dropRate: 55 },
  { stage: "2+ Secciones", users: 1650, dropRate: 24 },
  { stage: "Interaccion IA", users: 1200, dropRate: 27.3 },
  { stage: "Registro", users: 634, dropRate: 47.2 },
]

// Sections that convert
const sectionConversion = [
  { section: "Chat Avatar IA", conversionRate: 32, registeredAfter: 384, color: "hsl(var(--chart-1))" },
  { section: "Trivia Futbol", conversionRate: 24, registeredAfter: 444, color: "hsl(var(--chart-4))" },
  { section: "Selfie Punto", conversionRate: 18, registeredAfter: 292, color: "hsl(var(--chart-2))" },
  { section: "Info Sedes", conversionRate: 12, registeredAfter: 166, color: "hsl(var(--chart-5))" },
  { section: "Bienvenida", conversionRate: 8, registeredAfter: 168, color: "hsl(var(--muted-foreground))" },
]

// Time to conversion scatter
const dwellConversionData = [
  { dwell: 30, conversion: 5, size: 120 },
  { dwell: 60, conversion: 8, size: 200 },
  { dwell: 90, conversion: 15, size: 350 },
  { dwell: 120, conversion: 22, size: 480 },
  { dwell: 150, conversion: 28, size: 520 },
  { dwell: 180, conversion: 32, size: 400 },
  { dwell: 210, conversion: 30, size: 320 },
  { dwell: 240, conversion: 26, size: 250 },
  { dwell: 300, conversion: 18, size: 180 },
  { dwell: 360, conversion: 12, size: 100 },
]

// Conversion by time slot
const conversionByHour = [
  { hour: "08:00", rate: 8.2 },
  { hour: "09:00", rate: 10.5 },
  { hour: "10:00", rate: 12.3 },
  { hour: "11:00", rate: 14.8 },
  { hour: "12:00", rate: 11.2 },
  { hour: "13:00", rate: 9.5 },
  { hour: "14:00", rate: 15.6 },
  { hour: "15:00", rate: 18.2 },
  { hour: "16:00", rate: 16.8 },
  { hour: "17:00", rate: 13.5 },
  { hour: "18:00", rate: 10.8 },
  { hour: "19:00", rate: 8.5 },
  { hour: "20:00", rate: 6.2 },
]

// Sections viewed before registration
const sectionsBeforeReg = [
  { sections: 1, pct: 5 },
  { sections: 2, pct: 12 },
  { sections: 3, pct: 28 },
  { sections: 4, pct: 32 },
  { sections: 5, pct: 18 },
  { sections: 6, pct: 5 },
]

const conversionKpis = [
  {
    title: "Registration Conversion",
    value: "29.2%",
    subtitle: "Registros / Sesiones",
    change: "+2.3%",
    trend: "up" as const,
    icon: UserCheck,
  },
  {
    title: "Traffic to Registration",
    value: "13.2%",
    subtitle: "KPI macro principal",
    change: "+1.8%",
    trend: "up" as const,
    icon: Target,
  },
  {
    title: "Abandonment Rate",
    value: "70.8%",
    subtitle: "Sesiones sin registro",
    change: "-3.2%",
    trend: "up" as const,
    icon: ArrowDown,
  },
  {
    title: "Tiempo Optimo",
    value: "2m 30s - 3m",
    subtitle: "Mayor probabilidad de conversion",
    change: "Estable",
    trend: "up" as const,
    icon: Clock,
  },
]

export default function ConversionPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("Ultimos 7 dias")

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-foreground">Conversion Intelligence</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Secciones que convierten, tiempo optimo y drop-off analysis
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

      {/* Conversion KPIs */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {conversionKpis.map((kpi, i) => (
          <Card key={i} className="border-border bg-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center">
                  <kpi.icon className="w-4 h-4 text-muted-foreground" />
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

      {/* Drop-off Analysis */}
      <Card className="border-border bg-card mb-6">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold text-foreground">Drop-off Analysis</CardTitle>
          <p className="text-xs text-muted-foreground">Perdida de usuarios en cada etapa del funnel</p>
        </CardHeader>
        <CardContent>
          <div className="flex items-end gap-2 justify-between">
            {dropOffData.map((stage, i) => {
              const heightPct = (stage.users / dropOffData[0].users) * 100
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                  <div className="text-xs font-mono text-foreground font-medium">{stage.users.toLocaleString()}</div>
                  <div className="w-full relative" style={{ height: "180px" }}>
                    <div
                      className="absolute bottom-0 w-full rounded-t-md transition-all"
                      style={{
                        height: `${heightPct}%`,
                        backgroundColor:
                          i === 0
                            ? "hsl(var(--chart-1))"
                            : i === dropOffData.length - 1
                              ? "hsl(var(--chart-5))"
                              : "hsl(var(--chart-4))",
                        opacity: 0.8,
                      }}
                    ></div>
                  </div>
                  <div className="text-[10px] text-muted-foreground text-center font-medium">{stage.stage}</div>
                  {stage.dropRate > 0 && (
                    <Badge variant="outline" className="text-[10px] border-destructive/30 text-destructive bg-destructive/10">
                      -{stage.dropRate}%
                    </Badge>
                  )}
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 gap-6 mb-6">
        {/* Sections that convert */}
        <Card className="border-border bg-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold text-foreground">Secciones que Mas Convierten</CardTitle>
            <p className="text-xs text-muted-foreground">% de usuarios que registran despues de visitar cada seccion</p>
          </CardHeader>
          <CardContent>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={sectionConversion} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={false} />
                  <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={10} tickLine={false} unit="%" />
                  <YAxis
                    type="category"
                    dataKey="section"
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={10}
                    tickLine={false}
                    width={95}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                      color: "hsl(var(--foreground))",
                    }}
                    labelStyle={{ color: "hsl(var(--foreground))" }}
                    formatter={(value: number) => [`${value}%`, "Conversion Rate"]}
                  />
                  <Bar dataKey="conversionRate" radius={[0, 4, 4, 0]}>
                    {sectionConversion.map((entry, index) => (
                      <Cell key={index} fill={entry.color} fillOpacity={0.8} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Conversion by Time Slot */}
        <Card className="border-border bg-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold text-foreground">Conversion por Horario</CardTitle>
            <p className="text-xs text-muted-foreground">Para optimizar staffing y ubicacion</p>
          </CardHeader>
          <CardContent>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={conversionByHour}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="hour" stroke="hsl(var(--muted-foreground))" fontSize={10} tickLine={false} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={10} tickLine={false} unit="%" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                      color: "hsl(var(--foreground))",
                    }}
                    labelStyle={{ color: "hsl(var(--foreground))" }}
                    formatter={(value: number) => [`${value}%`, "Conversion Rate"]}
                  />
                  <Line
                    type="monotone"
                    dataKey="rate"
                    stroke="hsl(var(--chart-2))"
                    strokeWidth={2}
                    dot={{ fill: "hsl(var(--chart-2))", r: 3 }}
                    activeDot={{ r: 5, fill: "hsl(var(--chart-2))" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Dwell vs Conversion Correlation */}
        <Card className="border-border bg-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold text-foreground">Dwell vs Conversion</CardTitle>
            <p className="text-xs text-muted-foreground">Correlacion entre duracion de sesion y probabilidad de registro</p>
          </CardHeader>
          <CardContent>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis
                    dataKey="dwell"
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={10}
                    tickLine={false}
                    name="Dwell (seg)"
                    unit="s"
                  />
                  <YAxis
                    dataKey="conversion"
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={10}
                    tickLine={false}
                    name="Conversion"
                    unit="%"
                  />
                  <ZAxis dataKey="size" range={[40, 200]} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                      color: "hsl(var(--foreground))",
                    }}
                    labelStyle={{ color: "hsl(var(--foreground))" }}
                    formatter={(value: number, name: string) => {
                      if (name === "dwell") return [`${value}s`, "Tiempo de permanencia"]
                      if (name === "conversion") return [`${value}%`, "Tasa de conversion"]
                      return [value, name]
                    }}
                  />
                  <Scatter data={dwellConversionData} fill="hsl(var(--chart-1))" fillOpacity={0.6} />
                </ScatterChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-3 rounded-lg bg-primary/10 border border-primary/20 p-3">
              <p className="text-xs text-primary font-medium">Insight: Zona optima de conversion</p>
              <p className="text-[10px] text-muted-foreground mt-1">
                Las sesiones entre 2m 30s y 3m muestran la mayor tasa de conversion (28-32%). Despues de 4 minutos, la conversion decae significativamente.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Sections before registration */}
        <Card className="border-border bg-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold text-foreground">Secciones Visitadas Antes del Registro</CardTitle>
            <p className="text-xs text-muted-foreground">Profundidad de navegacion que impulsa la conversion</p>
          </CardHeader>
          <CardContent>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={sectionsBeforeReg}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis
                    dataKey="sections"
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={10}
                    tickLine={false}
                    label={{ value: "# Secciones", position: "bottom", offset: -5, fill: "hsl(var(--muted-foreground))", fontSize: 10 }}
                  />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={10} tickLine={false} unit="%" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                      color: "hsl(var(--foreground))",
                    }}
                    labelStyle={{ color: "hsl(var(--foreground))" }}
                    formatter={(value: number) => [`${value}%`, "% de registros"]}
                  />
                  <Bar dataKey="pct" radius={[4, 4, 0, 0]}>
                    {sectionsBeforeReg.map((entry, index) => (
                      <Cell
                        key={index}
                        fill={entry.pct >= 28 ? "hsl(var(--chart-1))" : "hsl(var(--chart-4))"}
                        fillOpacity={0.8}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-3 rounded-lg bg-accent/10 border border-accent/20 p-3">
              <p className="text-xs text-accent font-medium">Insight: Profundidad ideal</p>
              <p className="text-[10px] text-muted-foreground mt-1">
                El 60% de los registros ocurren despues de visitar 3-4 secciones. Asegurar que el flujo guie al usuario por al menos 3 puntos de contacto.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
