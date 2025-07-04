import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import type { TCarSalesReport } from '@/types/manager/reports/reposrts.type';

interface Props {
  reportData: TCarSalesReport;
}
const OverallSalesReport = ({ reportData }: Props) => {
  // const [reportData, setReportData] = useState<TCarSalesReport>([]);

  // useEffect(() => {
  //   const fetchOverallSalesReport = async () => {
  //     try {
  //       const url = import.meta.env.VITE_API_URL + reportsApiRoutes.getCarReport;
  //       const response = await fetch(url);
  //       if (!response.ok) {
  //         throw new Error('Network response was not ok');
  //       }
  //       const data: TCarSalesReport = await response.json();
  //       setReportData(data);
  //     } catch (error) {
  //       console.error('Error fetching overall sales report:', error);
  //     }
  //   };

  //   fetchOverallSalesReport();
  // }, []);
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Модель</TableHead>

          <TableHead>Продано единиц</TableHead>
          <TableHead>Средняя цена</TableHead>
          <TableHead>Общая выручка</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {reportData.map(row => (
          <TableRow key={row.id}>
            <TableCell className="font-medium">{row.modelBrand}</TableCell>

            <TableCell>{row.unitsSold}</TableCell>
            <TableCell>{row.avgPrice.toFixed(2)}</TableCell>
            <TableCell className="font-medium">{row.totalRevenue}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default OverallSalesReport;
