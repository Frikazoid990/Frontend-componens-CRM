import {
  fetchManagerPerformanceReport,
  fetchOverallSalesReport,
  fetchSalesFunnelReport,
} from '@/actions/reports.action';
import { useSession } from '@/hooks/useSession';
import { useToken } from '@/hooks/useToken';
import type {
  TCarSalesReport,
  TManagerPerformanceReport,
  TSalesFunnelReport,
} from '@/types/manager/reports/reposrts.type';
import { FileText, TestTube, TrendingUp, Users, type LucideIcon } from 'lucide-react';
import { useState } from 'react';
import ReportChart from './ui/ReportChart';
import ReportForm from './ui/ReportForm';
import ReportTable from './ui/ReportTable';

export type ReportType = 'manager' | 'overall-sales' | 'conversion-funnel' | '';
export interface ReportFormType {
  startDate: string;
  endDate: string;
  selectedReportType: ReportType;
}
export const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];
export const reportTypes: {
  value: ReportType;
  label: string;
  icon: LucideIcon;
}[] = [
  { value: 'manager', label: 'Отчет по менеджерам', icon: Users },
  { value: 'overall-sales', label: 'Отчет по продажам', icon: TrendingUp },
  { value: 'conversion-funnel', label: 'Воронка продаж', icon: TestTube },
];

const Reporting = () => {
  const [formData, setFormData] = useState<ReportFormType>({
    startDate: '',
    endDate: '',
    selectedReportType: '',
  });

  const [funnelReportData, setFunnelReportData] = useState<TSalesFunnelReport>([]);
  const [managerPerformanceReportData, setManagerPerformanceReportData] = useState<TManagerPerformanceReport>([]);
  const [overallSalesReportData, setOverallSalesReportData] = useState<TCarSalesReport>([]);

  const [isLoading, setIsLoading] = useState(false);

  const user = useSession();
  const token = useToken();

  const clearReportData = () => {
    setFunnelReportData([]);
    setManagerPerformanceReportData([]);
    setOverallSalesReportData([]);
  };

  const handleGenerateReport = async () => {
    if (!formData.selectedReportType) return;

    setIsLoading(true);

    try {
      if (formData.selectedReportType === 'conversion-funnel') {
        const report = await fetchSalesFunnelReport(user, token);
        if (report.error) {
          throw new Error(report.error);
        }
        setFunnelReportData(report.data || []);
      } else if (formData.selectedReportType === 'manager') {
        const report = await fetchManagerPerformanceReport(user, token);
        if (report.error) {
          throw new Error(report.error);
        }
        setManagerPerformanceReportData(report.data || []);
      } else if (formData.selectedReportType === 'overall-sales') {
        const report = await fetchOverallSalesReport(user, token);
        if (report.error) {
          throw new Error(report.error);
        }
        setOverallSalesReportData(report.data || []);
      } else {
        throw new Error('Неизвестный тип отчета');
      }
    } catch (error) {
      console.error('Ошибка при генерации отчета:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto space-y-6 p-6">
      <div className="flex items-center gap-2">
        <FileText className="h-6 w-6" />
        <h1 className="text-2xl font-bold">Отчеты автосалона</h1>
      </div>

      <ReportForm
        formData={formData}
        isLoading={isLoading}
        onChangeFormData={(newFormState: ReportFormType) => {
          setFormData(prev => ({ ...prev, ...newFormState }));
          clearReportData();
        }}
        onGenerateReport={handleGenerateReport}
      />

      {(!!funnelReportData.length || !!managerPerformanceReportData.length || !!overallSalesReportData.length) && (
        <>
          <ReportChart
            formData={formData}
            funnelReportData={funnelReportData}
            managerReportData={managerPerformanceReportData}
            overallSalesReportData={overallSalesReportData}
          />
          <ReportTable
            formData={formData}
            funnelReportData={funnelReportData}
            managerReportData={managerPerformanceReportData}
            overallSalesReportData={overallSalesReportData}
          />
        </>
      )}
    </div>
  );
};

export default Reporting;
