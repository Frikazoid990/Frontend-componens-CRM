import { Button } from '@/components/ui/button';
import { DialogFooter } from '@/components/ui/dialog';
import { formatDateInRussian } from '@/lib/format';

interface Props {
  date?: Date;
  time: string | null;

  brand: string;
  model: string;

  onCancel: () => void;
  onSubmit: () => void;
}

const TestDriveConfirmationFinalStep = ({ date, time, brand, model, onCancel, onSubmit }: Props) => {
  return (
    <>
      <div className="py-4">
        <p className="mb-4 text-center text-lg">Вы уверены, что хотите забронировать это время?</p>
        {date && time && (
          <div className="rounded-lg bg-gray-50 p-4 text-center">
            <p className="font-semibold">
              {brand} {model}
            </p>
            <p className="text-sm text-gray-600">{formatDateInRussian(date)}</p>
            <p className="text-sm text-gray-600">в {time}</p>
          </div>
        )}
      </div>
      <DialogFooter className="flex justify-center gap-2">
        <Button variant="outline" onClick={onCancel}>
          Отмена
        </Button>
        <Button onClick={onSubmit}>Принять</Button>
      </DialogFooter>
    </>
  );
};

export default TestDriveConfirmationFinalStep;
