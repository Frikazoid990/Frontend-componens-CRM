import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import type { TManagerPerformanceReport } from '@/types/manager/reports/reposrts.type';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from 'recharts';

interface Props {
  managerReportData: TManagerPerformanceReport;
}
const ManagerPerformanceChart = ({ managerReportData }: Props) => {
  const managerChartData = managerReportData.map(row => {
    const nameParts = row.managerFullName.split(' ');
    const formattedName = `${nameParts[0]}${nameParts[1] ? ` ${nameParts[1].slice(0, 1)}.` : ''}${nameParts[2] ? ` ${nameParts[2].slice(0, 1)}.` : ''}`;
    return {
      name: formattedName,
      testDrives: row.testDrives,
      dealsCompleted: row.dealsCompleted,
      conversionRate: Number.parseInt(row.conversionRate.split(',')[0]),
    };
  });

  return (
    <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
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
  );
};

export default ManagerPerformanceChart;
