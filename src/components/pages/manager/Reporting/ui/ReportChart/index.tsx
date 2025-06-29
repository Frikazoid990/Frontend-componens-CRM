import type {
  TCarSalesReport,
  TManagerPerformanceReport,
  TSalesFunnelReport,
} from '@/types/manager/reports/reposrts.type';
import type { ReportFormType } from '../../Reporting';
import FunnelReportChart from './FunnelReportChart';
import ManagerPerformanceChart from './ManagerPerformanceChart';
import OverallSalesChart from './OverallSalesChart';

interface Props {
  formData: ReportFormType;
  funnelReportData: TSalesFunnelReport;
  managerReportData: TManagerPerformanceReport;
  overallSalesReportData: TCarSalesReport;
}

const ReportChart = ({ formData, funnelReportData, managerReportData, overallSalesReportData }: Props) => {
  return (
    <div>
      {formData.selectedReportType === 'manager' && <ManagerPerformanceChart managerReportData={managerReportData} />}
      {formData.selectedReportType === 'overall-sales' && (
        <OverallSalesChart overallSalesReportData={overallSalesReportData} />
      )}
      {formData.selectedReportType === 'conversion-funnel' && <FunnelReportChart funnelReportData={funnelReportData} />}
    </div>
  );
};

export default ReportChart;
