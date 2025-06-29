import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import type { TManagerPerformanceReport } from '@/types/manager/reports/reposrts.type';

interface Props {
  reportData: TManagerPerformanceReport;
}
const ManagerReportTable = ({ reportData }: Props) => {
  // const [reportData, setReportData] = useState<TManagerPerformanceReport>([]);

  // useEffect(() => {
  //   const fetchManagerReport = async () => {
  //     try {
  //       const url = import.meta.env.VITE_API_URL + reportsApiRoutes.getManagerReport;
  //       const response = await fetch(url);
  //       if (!response.ok) {
  //         throw new Error('Network response was not ok');
  //       }
  //       const data: TManagerPerformanceReport = await response.json();
  //       setReportData(data);
  //     } catch (error) {
  //       console.error('Error fetching manager report:', error);
  //     }
  //   };

  //   fetchManagerReport();
  // }, []);
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
        {reportData.map(row => (
          <TableRow key={row.id}>
            <TableCell className="font-medium">{row.managerFullName}</TableCell>
            <TableCell>{row.testDrives}</TableCell>
            <TableCell>{row.dealsRegistered}</TableCell>
            <TableCell>{row.dealsCompleted}</TableCell>
            <TableCell>
              <Badge variant={Number.parseFloat(row.conversionRate) > 30 ? 'default' : 'secondary'}>
                {row.conversionRate}
              </Badge>
            </TableCell>
            <TableCell className="font-medium">{row.revenue}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ManagerReportTable;
