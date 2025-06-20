import { Calendar } from '@/components/ui/calendar';
import { ru } from 'date-fns/locale';

interface Props {
  date?: Date;
  onDateSelect: (date?: Date) => void;
  onChangeStep: (step: 'time') => void;
}

const TestDriveConfirmationDateStep = ({ date, onDateSelect, onChangeStep }: Props) => {
  return (
    <div className="flex justify-center py-4">
      <Calendar
        mode="single"
        selected={date}
        onSelect={date => {
          onDateSelect(date);
          if (date) {
            onChangeStep('time');
          }
        }}
        disabled={date => date < new Date()}
        className="rounded-md border"
        locale={ru}
        weekStartsOn={1}
        formatters={{
          formatCaption: date => {
            const month = date.toLocaleString('ru-RU', { month: 'long' });
            const year = date.getFullYear();
            return `${month.charAt(0).toUpperCase() + month.slice(1)} ${year}`;
          },
        }}
      />
    </div>
  );
};

export default TestDriveConfirmationDateStep;
