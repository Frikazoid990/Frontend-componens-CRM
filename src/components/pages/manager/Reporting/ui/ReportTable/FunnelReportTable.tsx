import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import type { TSalesFunnelReport } from '@/types/manager/reports/reposrts.type';

interface Props {
  reportData: TSalesFunnelReport;
}

const FunnelReportTable = ({ reportData }: Props) => {
  // const [reportData, setReportData] = useState<TSalesFunnelReport>([]);

  // useEffect(() => {
  //   const fetchFunnelReport = async () => {
  //     try {
  //       const url = import.meta.env.VITE_API_URL + reportsApiRoutes.getFunnelReport;
  //       const response = await fetch(url);
  //       if (!response.ok) {
  //         throw new Error('Network response was not ok');
  //       }
  //       const data: TSalesFunnelReport = await response.json();
  //       setReportData(data);
  //     } catch (error) {
  //       console.error('Error fetching funnel report:', error);
  //     }
  //   };

  //   fetchFunnelReport();
  // }, []);

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
  );
};

export default FunnelReportTable;
