import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@radix-ui/react-select';
import { TestTubeIcon, TrendingUpIcon, UsersIcon } from 'lucide-react';
import type { ReportFormType, ReportType } from '../Reporting';

interface Props {
  // startDate: string;
  // endDate: string;
  // selectedReportType: ReportType;
  // reportTypes: ReportType[];
  formData: ReportFormType;
  isLoading: boolean;
  onGenerateReport: () => void;
  onChangeFormData: (newFormState: ReportFormType) => void;
}

const ReportForm = ({
  formData,
  // reportTypes,
  isLoading,
  onChangeFormData,
  onGenerateReport,
}: Props) => {
  const { startDate, endDate, selectedReportType } = formData;

  const reportTypes = [
    { value: 'manager', label: 'Отчет по менеджерам', icon: UsersIcon },
    { value: 'overall-sales', label: 'Отчет по продажам', icon: TrendingUpIcon },
    { value: 'conversion-funnel', label: 'Воронка продаж', icon: TestTubeIcon },
  ];
  return (
    <Card>
      <CardHeader>
        <CardTitle>Сформировать отчет</CardTitle>
        <CardDescription>Выберите тип отчета и настройте параметры для генерации.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="reportType">Тип отчета</Label>
          <Select
            value={selectedReportType}
            onValueChange={(val: ReportType) =>
              onChangeFormData({
                ...formData,
                selectedReportType: val,
              })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Выберите тип отчета" />
            </SelectTrigger>
            <SelectContent>
              {reportTypes.map(type => {
                const Icon = type.icon;
                return (
                  <SelectItem key={type.value} value={type.value}>
                    <div className="flex items-center gap-2">
                      <Icon className="h-4 w-4" />
                      {type.label}
                    </div>
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-4">
          <div className="border-t pt-4">
            <h3 className="mb-4 text-sm font-medium">Параметры отчета</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startDate">Начальная дата</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={startDate || ''}
                  onChange={e =>
                    onChangeFormData({
                      ...formData,
                      startDate: e.target.value,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate">Конечная дата</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={endDate || ''}
                  onChange={e =>
                    onChangeFormData({
                      ...formData,
                      endDate: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          </div>

          <Button onClick={onGenerateReport} disabled={isLoading} className="w-full">
            {isLoading ? 'Формирование отчета...' : 'Сформировать отчет'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReportForm;
