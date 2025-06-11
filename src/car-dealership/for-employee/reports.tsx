"use client"


import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Car, Download, FileSpreadsheet, FileText, FileTextIcon, TestTube, TrendingUp, Users } from "lucide-react"
import { useState } from "react"
import { Bar, BarChart, CartesianGrid, Cell, Funnel, FunnelChart, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

type ReportType = "manager" | "overall-sales" | "test-drives" | "conversion-funnel" | ""

interface ReportData {
  id: string
  [key: string]: any
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

export default function Component() {
const [reportType, setReportType] = useState<ReportType>("")
  const [formData, setFormData] = useState<Record<string, string>>({})
  const [reportData, setReportData] = useState<ReportData[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const reportTypes = [
    { value: "manager", label: "Отчет по менеджерам", icon: Users },
    { value: "overall-sales", label: "Отчет по продажам", icon: TrendingUp },
    { value: "test-drives", label: "Отчет по тест-драйвам", icon: Car },
    { value: "conversion-funnel", label: "Воронка продаж", icon: TestTube },
  ]

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const generateMockData = (type: ReportType): ReportData[] => {
    switch (type) {
      case "manager":
        return [
          {
            id: "1",
            manager: "Иван Петров",
            testDrives: 45,
            dealsRegistered: 18,
            dealsCompleted: 12,
            conversionRate: "26.7%",
            revenue: "4 800 000 ₽",
          },
          {
            id: "2",
            manager: "Мария Смирнова",
            testDrives: 38,
            dealsRegistered: 22,
            dealsCompleted: 15,
            conversionRate: "39.5%",
            revenue: "6 300 000 ₽",
          },
          {
            id: "3",
            manager: "Алексей Козлов",
            testDrives: 52,
            dealsRegistered: 19,
            dealsCompleted: 11,
            conversionRate: "21.2%",
            revenue: "4 200 000 ₽",
          },
          {
            id: "4",
            manager: "Елена Иванова",
            testDrives: 41,
            dealsRegistered: 25,
            dealsCompleted: 18,
            conversionRate: "43.9%",
            revenue: "7 200 000 ₽",
          },
        ]
      case "overall-sales":
        return [
          {
            id: "1",
            model: "Honda Civic",
            category: "Седан",
            unitsSold: 28,
            avgPrice: "2 450 000 ₽",
            totalRevenue: "68 600 000 ₽",
            margin: "12%",
          },
          {
            id: "2",
            model: "Toyota RAV4",
            category: "Внедорожник",
            unitsSold: 22,
            avgPrice: "3 280 000 ₽",
            totalRevenue: "72 160 000 ₽",
            margin: "15%",
          },
          {
            id: "3",
            model: "Kia Rio",
            category: "Седан",
            unitsSold: 35,
            avgPrice: "1 850 000 ₽",
            totalRevenue: "64 750 000 ₽",
            margin: "10%",
          },
          {
            id: "4",
            model: "Volkswagen Tiguan",
            category: "Внедорожник",
            unitsSold: 18,
            avgPrice: "3 750 000 ₽",
            totalRevenue: "67 500 000 ₽",
            margin: "18%",
          },
        ]
      case "test-drives":
        return [
          {
            id: "1",
            date: "2024-01-15",
            customer: "Дмитрий Соколов",
            vehicle: "Honda Civic",
            duration: "45 мин",
            result: "Сделка завершена",
            followUp: "Завершено",
          },
          {
            id: "2",
            date: "2024-01-15",
            customer: "Анна Кузнецова",
            vehicle: "Toyota RAV4",
            duration: "30 мин",
            result: "Заинтересована",
            followUp: "В ожидании",
          },
          {
            id: "3",
            date: "2024-01-14",
            customer: "Сергей Волков",
            vehicle: "Kia Rio",
            duration: "60 мин",
            result: "Сделка зарегистрирована",
            followUp: "Завершено",
          },
          {
            id: "4",
            date: "2024-01-14",
            customer: "Ольга Морозова",
            vehicle: "Volkswagen Tiguan",
            duration: "40 мин",
            result: "Не заинтересована",
            followUp: "Нет",
          },
        ]
      case "conversion-funnel":
        return [
          { id: "1", stage: "Все тест-драйвы", count: 1000, percentage: 100, color: "#0088FE" },
          { id: "2", stage: "Успешные тест-драйвы", count: 300, percentage: 30, color: "#00C49F" },
          { id: "3", stage: "Зарегистрированные сделки", count: 100, percentage: 10, color: "#FFBB28" },
          { id: "4", stage: "Завершенные сделки", count: 50, percentage: 5, color: "#FF8042" },
        ]
      default:
        return []
    }
  }

const exportToCSV = (data: ReportData[], filename: string) => {
    if (!data.length) return

    const headers = Object.keys(data[0]).filter((key) => key !== "id")
    const csvContent = [
      headers.join(","),
      ...data.map((row) =>
        headers
          .map((header) => {
            const value = row[header]
            return typeof value === "string" && (value.includes(",") || value.includes('"'))
              ? `"${value.replace(/"/g, '""')}"`
              : value
          })
          .join(","),
      ),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", `${filename}.csv`)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
}

const exportToJSON = (data: ReportData[], filename: string) => {
    if (!data.length) return

    const jsonContent = JSON.stringify(data, null, 2)
    const blob = new Blob([jsonContent], { type: "application/json;charset=utf-8;" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", `${filename}.json`)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
}

const printReport = () => {
    window.print()
}

const handleGenerateReport = async () => {
    if (!reportType) return

    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const mockData = generateMockData(reportType)
    setReportData(mockData)
    setIsLoading(false)
}

const renderReportFields = () => {
    switch (reportType) {
        case "manager":
            return (
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="startDate">Начальная дата</Label>
                        <Input
                            id="startDate"
                            type="date"
                            value={formData.startDate || ""}
                            onChange={(e) => handleInputChange("startDate", e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="endDate">Конечная дата</Label>
                        <Input
                            id="endDate"
                            type="date"
                            value={formData.endDate || ""}
                            onChange={(e) => handleInputChange("endDate", e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="manager">Менеджер</Label>
                        <Select value={formData.manager || ""} onValueChange={(value) => handleInputChange("manager", value)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Выберите менеджера" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Все менеджеры</SelectItem>
                                <SelectItem value="john">Иван Петров</SelectItem>
                                <SelectItem value="sarah">Светлана Иванова</SelectItem>
                                <SelectItem value="mike">Михаил Сидоров</SelectItem>
                                <SelectItem value="lisa">Елена Кузнецова</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="performance">Уровень эффективности</Label>
                        <Select
                            value={formData.performance || ""}
                            onValueChange={(value) => handleInputChange("performance", value)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Выберите уровень" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Вся эффективность</SelectItem>
                                <SelectItem value="high">Высокая</SelectItem>
                                <SelectItem value="medium">Средняя</SelectItem>
                                <SelectItem value="low">Низкая</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            )
        case "overall-sales":
            return (
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="startDate">Начальная дата</Label>
                        <Input
                            id="startDate"
                            type="date"
                            value={formData.startDate || ""}
                            onChange={(e) => handleInputChange("startDate", e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="endDate">Конечная дата</Label>
                        <Input
                            id="endDate"
                            type="date"
                            value={formData.endDate || ""}
                            onChange={(e) => handleInputChange("endDate", e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="category">Категория автомобиля</Label>
                        <Select value={formData.category || ""} onValueChange={(value) => handleInputChange("category", value)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Выберите категорию" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Все категории</SelectItem>
                                <SelectItem value="sedan">Седан</SelectItem>
                                <SelectItem value="suv">Внедорожник</SelectItem>
                                <SelectItem value="truck">Грузовик</SelectItem>
                                <SelectItem value="luxury">Премиум</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="brand">Марка</Label>
                        <Select value={formData.brand || ""} onValueChange={(value) => handleInputChange("brand", value)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Выберите марку" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Все марки</SelectItem>
                                <SelectItem value="honda">Honda</SelectItem>
                                <SelectItem value="toyota">Toyota</SelectItem>
                                <SelectItem value="ford">Ford</SelectItem>
                                <SelectItem value="bmw">BMW</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            )
        case "test-drives":
            return (
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="startDate">Начальная дата</Label>
                        <Input
                            id="startDate"
                            type="date"
                            value={formData.startDate || ""}
                            onChange={(e) => handleInputChange("startDate", e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="endDate">Конечная дата</Label>
                        <Input
                            id="endDate"
                            type="date"
                            value={formData.endDate || ""}
                            onChange={(e) => handleInputChange("endDate", e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="result">Результат тест-драйва</Label>
                        <Select value={formData.result || ""} onValueChange={(value) => handleInputChange("result", value)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Выберите результат" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Все результаты</SelectItem>
                                <SelectItem value="completed">Сделка завершена</SelectItem>
                                <SelectItem value="registered">Сделка зарегистрирована</SelectItem>
                                <SelectItem value="interested">Заинтересован</SelectItem>
                                <SelectItem value="not-interested">Не заинтересован</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="vehicle">Модель автомобиля</Label>
                        <Select value={formData.vehicle || ""} onValueChange={(value) => handleInputChange("vehicle", value)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Выберите модель" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Все модели</SelectItem>
                                <SelectItem value="civic">Honda Civic</SelectItem>
                                <SelectItem value="rav4">Toyota RAV4</SelectItem>
                                <SelectItem value="f150">Ford F-150</SelectItem>
                                <SelectItem value="x3">BMW X3</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            )
        case "conversion-funnel":
            return (
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="startDate">Начальная дата</Label>
                        <Input
                            id="startDate"
                            type="date"
                            value={formData.startDate || ""}
                            onChange={(e) => handleInputChange("startDate", e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="endDate">Конечная дата</Label>
                        <Input
                            id="endDate"
                            type="date"
                            value={formData.endDate || ""}
                            onChange={(e) => handleInputChange("endDate", e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="manager">Фильтр по менеджеру</Label>
                        <Select value={formData.manager || ""} onValueChange={(value) => handleInputChange("manager", value)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Выберите менеджера" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Все менеджеры</SelectItem>
                                <SelectItem value="john">Иван Петров</SelectItem>
                                <SelectItem value="sarah">Светлана Иванова</SelectItem>
                                <SelectItem value="mike">Михаил Сидоров</SelectItem>
                                <SelectItem value="lisa">Елена Кузнецова</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="category">Категория автомобиля</Label>
                        <Select value={formData.category || ""} onValueChange={(value) => handleInputChange("category", value)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Выберите категорию" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Все категории</SelectItem>
                                <SelectItem value="sedan">Седан</SelectItem>
                                <SelectItem value="suv">Внедорожник</SelectItem>
                                <SelectItem value="truck">Грузовик</SelectItem>
                                <SelectItem value="luxury">Премиум</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            )
        default:
            return null
    }
}

const renderChart = () => {
    if (!reportData.length) return null

    switch (reportType) {
        case "manager":
            { const managerChartData = reportData.map((row) => ({
                name: row.manager,
                testDrives: row.testDrives,
                dealsCompleted: row.dealsCompleted,
                conversionRate: Number.parseFloat(row.conversionRate.replace("%", "")),
            }))

            return (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Тест-драйвы vs Завершенные сделки</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ChartContainer config={{}} className="h-[300px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={managerChartData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <ChartTooltip content={<ChartTooltipContent />} />
                                        <Bar dataKey="testDrives" fill="#8884d8" name="Тест-драйвы" />
                                        <Bar dataKey="dealsCompleted" fill="#82ca9d" name="Завершенные сделки" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </ChartContainer>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Процент конверсии по менеджерам</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ChartContainer config={{}} className="h-[300px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={managerChartData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <ChartTooltip content={<ChartTooltipContent />} />
                                        <Bar dataKey="conversionRate" fill="#ffc658" name="Процент конверсии" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </ChartContainer>
                        </CardContent>
                    </Card>
                </div>
            ) }

        case "overall-sales":
            { const salesChartData = reportData.map((row) => ({
                name: row.model,
                unitsSold: row.unitsSold,
                revenue: Number.parseInt(row.totalRevenue.replace(/[$,]/g, "")),
                margin: Number.parseFloat(row.margin.replace("%", "")),
            }))

            return (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Продажи по моделям</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ChartContainer config={{}} className="h-[300px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={salesChartData}
                                            cx="50%"
                                            cy="50%"
                                            labelLine={false}
                                            label={({ name, value }) => `${name}: ${value}`}
                                            outerRadius={80}
                                            fill="#8884d8"
                                            dataKey="unitsSold"
                                        >
                                            {salesChartData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <ChartTooltip content={<ChartTooltipContent />} />
                                    </PieChart>
                                </ResponsiveContainer>
                            </ChartContainer>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Выручка по моделям</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ChartContainer config={{}} className="h-[300px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={salesChartData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <ChartTooltip content={<ChartTooltipContent />} />
                                        <Bar dataKey="revenue" fill="#82ca9d" name="Выручка (руб)" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </ChartContainer>
                        </CardContent>
                    </Card>
                </div>
            ) }

case "conversion-funnel":
    return (
        <div className="mb-6">
            <Card>
                <CardHeader>
                    <CardTitle>Воронка продаж</CardTitle>
                    <CardDescription>Отслеживание пути клиента от тест-драйва до завершенной сделки</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="h-[400px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <FunnelChart>
                                <Tooltip />
                                <Funnel
                                    dataKey="count"
                                    data={reportData}
                                    isAnimationActive
                                    nameKey="stage"
                                >
                                    {reportData.map((entry, index) => (
                                        <Cell 
                                            key={`cell-${index}`} 
                                            fill={COLORS[index % COLORS.length]} 
                                        />
                                    ))}
                                </Funnel>
                                <Legend />
                            </FunnelChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>
        </div>
    )

        default:
            return null
    }
}

const renderReportTable = () => {
    if (!reportData.length) return

    switch (reportType) {
        case "manager":
            return (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Менеджер</TableHead>
                            <TableHead>Тест-драйвы</TableHead>
                            <TableHead>Зарегистрированные сделки</TableHead>
                            <TableHead>Завершенные сделки</TableHead>
                            <TableHead>Процент конверсии</TableHead>
                            <TableHead>Выручка</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {reportData.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell className="font-medium">{row.manager}</TableCell>
                                <TableCell>{row.testDrives}</TableCell>
                                <TableCell>{row.dealsRegistered}</TableCell>
                                <TableCell>{row.dealsCompleted}</TableCell>
                                <TableCell>
                                    <Badge variant={Number.parseFloat(row.conversionRate) > 30 ? "default" : "secondary"}>
                                        {row.conversionRate}
                                    </Badge>
                                </TableCell>
                                <TableCell className="font-medium">{row.revenue}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )
        case "overall-sales":
            return (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Модель</TableHead>
                            <TableHead>Категория</TableHead>
                            <TableHead>Продано единиц</TableHead>
                            <TableHead>Средняя цена</TableHead>
                            <TableHead>Общая выручка</TableHead>
                            <TableHead>Маржа</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {reportData.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell className="font-medium">{row.model}</TableCell>
                                <TableCell>
                                    <Badge variant="outline">{row.category}</Badge>
                                </TableCell>
                                <TableCell>{row.unitsSold}</TableCell>
                                <TableCell>{row.avgPrice}</TableCell>
                                <TableCell className="font-medium">{row.totalRevenue}</TableCell>
                                <TableCell>
                                    <Badge variant={Number.parseFloat(row.margin) > 15 ? "default" : "secondary"}>{row.margin}</Badge>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )
        case "test-drives":
            return (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Дата</TableHead>
                            <TableHead>Клиент</TableHead>
                            <TableHead>Автомобиль</TableHead>
                            <TableHead>Длительность</TableHead>
                            <TableHead>Результат</TableHead>
                            <TableHead>Дальнейшие действия</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {reportData.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell>{row.date}</TableCell>
                                <TableCell className="font-medium">{row.customer}</TableCell>
                                <TableCell>{row.vehicle}</TableCell>
                                <TableCell>{row.duration}</TableCell>
                                <TableCell>
                                    <Badge
                                        variant={
                                            row.result === "Deal Completed"
                                                ? "default"
                                                : row.result === "Deal Registered"
                                                    ? "secondary"
                                                    : row.result === "Interested"
                                                        ? "outline"
                                                        : "destructive"
                                        }
                                    >
                                        {row.result === "Deal Completed" ? "Сделка завершена" : 
                                         row.result === "Deal Registered" ? "Сделка зарегистрирована" : 
                                         row.result === "Interested" ? "Заинтересован" : "Не заинтересован"}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <Badge variant={row.followUp === "Completed" ? "default" : "outline"}>
                                        {row.followUp === "Completed" ? "Завершено" : "В процессе"}
                                    </Badge>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )
        case "conversion-funnel":
            return (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Этап</TableHead>
                            <TableHead>Количество</TableHead>
                            <TableHead>Процент</TableHead>
                            <TableHead>Конверсия</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {reportData.map((row, index) => (
                            <TableRow key={row.id}>
                                <TableCell className="font-medium">{row.stage}</TableCell>
                                <TableCell>{row.count}</TableCell>
                                <TableCell>{row.percentage}%</TableCell>
                                <TableCell>
                                    {index > 0 && (
                                        <Badge variant="outline">{((row.count / reportData[index - 1].count) * 100).toFixed(1)}%</Badge>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )
        default:
            return null
    }
}
  // Остальной код остается без изменений...
  // [Остальные функции и компоненты остаются такими же, как в оригинале]
  
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center gap-2">
        <FileText className="h-6 w-6" />
        <h1 className="text-2xl font-bold">Отчеты автосалона</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Сформировать отчет</CardTitle>
          <CardDescription>
            Выберите тип отчета и настройте параметры для генерации.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="reportType">Тип отчета</Label>
            <Select
              value={reportType}
              onValueChange={(value: ReportType) => {
                setReportType(value)
                setFormData({})
                setReportData([])
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Выберите тип отчета" />
              </SelectTrigger>
              <SelectContent>
                {reportTypes.map((type) => {
                  const Icon = type.icon
                  return (
                    <SelectItem key={type.value} value={type.value}>
                      <div className="flex items-center gap-2">
                        <Icon className="h-4 w-4" />
                        {type.label}
                      </div>
                    </SelectItem>
                  )
                })}
              </SelectContent>
            </Select>
          </div>

          {reportType && (
            <div className="space-y-4">
              <div className="border-t pt-4">
                <h3 className="text-sm font-medium mb-4">Параметры отчета</h3>
                {renderReportFields()}
              </div>

              <Button onClick={handleGenerateReport} disabled={isLoading} className="w-full">
                {isLoading ? "Формирование отчета..." : "Сформировать отчет"}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {reportData.length > 0 && (
        <>
          {renderChart()}

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>{reportTypes.find((t) => t.value === reportType)?.label} Результаты</CardTitle>
                  <CardDescription>
                    Сформировано {new Date().toLocaleDateString('ru-RU')} в {new Date().toLocaleTimeString('ru-RU')}
                  </CardDescription>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Экспорт
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() =>
                        exportToCSV(reportData, `${reportType}-report-${new Date().toISOString().split("T")[0]}`)
                      }
                    >
                      <FileSpreadsheet className="h-4 w-4 mr-2" />
                      Экспорт в CSV
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() =>
                        exportToJSON(reportData, `${reportType}-report-${new Date().toISOString().split("T")[0]}`)
                      }
                    >
                      <FileTextIcon className="h-4 w-4 mr-2" />
                      Экспорт в JSON
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={printReport}>
                      <FileTextIcon className="h-4 w-4 mr-2" />
                      Печать отчета
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent>{renderReportTable()}</CardContent>
          </Card>
        </>
      )}
    </div>
  )
}