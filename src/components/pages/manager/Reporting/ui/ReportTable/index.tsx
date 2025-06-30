import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type {
  TCarSalesReport,
  TManagerPerformanceReport,
  TSalesFunnelReport,
} from '@/types/manager/reports/reposrts.type';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { saveAs } from 'file-saver';
import { Download, FileSpreadsheet, FileTextIcon } from 'lucide-react';
import * as XLSX from 'xlsx';
import { reportTypes, type ReportFormType, type ReportType } from '../../Reporting';
import FunnelReportTable from './FunnelReportTable';
import ManagerReportTable from './ManagerReportTable';
import OverallSalesReport from './OverallSalesReport';

interface Props {
  formData: ReportFormType;
  funnelReportData: TSalesFunnelReport;
  managerReportData: TManagerPerformanceReport;
  overallSalesReportData: TCarSalesReport;
}
const ReportTable = ({ formData, funnelReportData, managerReportData, overallSalesReportData }: Props) => {
  const dataMap: Record<ReportType, TCarSalesReport | TManagerPerformanceReport | TSalesFunnelReport> = {
    manager: managerReportData,
    'overall-sales': overallSalesReportData,
    'conversion-funnel': funnelReportData,
    '': [],
  };

  const data: TCarSalesReport | TManagerPerformanceReport | TSalesFunnelReport = dataMap[formData.selectedReportType];

  const exportToExcel = () => {
    if (!data || data.length === 0) {
      console.warn('Нет данных для экспорта');
      return;
    }

    const fileName = `Отчет_${formData.selectedReportType}_${new Date().toLocaleDateString('ru-RU')}`;

    // 1) Конвертируем JSON в лист
    const worksheet = XLSX.utils.json_to_sheet(data, {
      header: Object.keys(data[0]), // гарантируем порядок колонок
    });

    // 2) Создаём книгу и добавляем в неё лист под именем "Sheet1"
    const workbook: XLSX.WorkBook = {
      Sheets: { Sheet1: worksheet },
      SheetNames: ['Sheet1'],
    };

    // 3) Генерируем бинарные данные
    const wbout = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });

    // 4) Сохраняем через file-saver
    const blob = new Blob([wbout], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8',
    });
    saveAs(blob, `${fileName}.xlsx`);
  };

  const exportToJSON = () => {
    let jsonString = '';
    try {
      jsonString = JSON.stringify(data, null, 2);
    } catch (error) {
      console.error('Ошибка при конвертации данных в JSON:', error);
      return;
    }

    const fileName = `Отчет_${formData.selectedReportType}_${new Date().toLocaleDateString('ru-RU')}`;
    // Создаём Blob с типом JSON
    const blob = new Blob([jsonString], {
      type: 'application/json;charset=utf-8',
    });

    // Сохраняем через file-saver
    saveAs(blob, `${fileName}.json`);
  };

  const printReport = () => {
    window.print();
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{reportTypes.find(t => t.value === formData.selectedReportType)?.label} Результаты</CardTitle>
            <CardDescription>
              Сформировано {new Date().toLocaleDateString('ru-RU')} в {new Date().toLocaleTimeString('ru-RU')}
            </CardDescription>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Экспорт
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => exportToExcel()}>
                <FileSpreadsheet className="mr-2 h-4 w-4" />
                Экспорт в CSV
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => exportToJSON()}>
                <FileTextIcon className="mr-2 h-4 w-4" />
                Экспорт в JSON
              </DropdownMenuItem>
              <DropdownMenuItem onClick={printReport}>
                <FileTextIcon className="mr-2 h-4 w-4" />
                Печать отчета
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        {formData.selectedReportType === 'manager' && <ManagerReportTable reportData={managerReportData} />}
        {formData.selectedReportType === 'overall-sales' && <OverallSalesReport reportData={overallSalesReportData} />}
        {formData.selectedReportType === 'conversion-funnel' && <FunnelReportTable reportData={funnelReportData} />}
      </CardContent>
    </Card>
  );
};

export default ReportTable;
