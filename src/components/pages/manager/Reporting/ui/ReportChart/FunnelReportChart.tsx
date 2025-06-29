import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { TSalesFunnelReport } from '@/types/manager/reports/reposrts.type';

import { Cell, Funnel, FunnelChart, Legend, ResponsiveContainer, Tooltip } from 'recharts';
import { COLORS } from '../../Reporting';

interface Props {
  funnelReportData: TSalesFunnelReport;
}
const FunnelReportChart = ({ funnelReportData }: Props) => {
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
                <Funnel dataKey="count" data={funnelReportData} isAnimationActive nameKey="stage">
                  {funnelReportData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Funnel>
                <Legend />
              </FunnelChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FunnelReportChart;
