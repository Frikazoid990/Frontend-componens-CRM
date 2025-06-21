import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { formatDateInRussian } from '@/lib/format';
import type { UUID } from 'crypto';
import { Clock } from 'lucide-react';
import { useState } from 'react';
import TestDriveConfirmationDateStep from './TestDriveConfirmationDateStep';
import TestDriveConfirmationFinalStep from './TestDriveConfirmationFinalStep';
import TestDriveConfirmationTimeStep from './TestDriveConfirmationTimeStep';

interface Props {
  isShown: boolean;
  brand: string;
  model: string;
  carId: UUID;
  setIsShown: (isShown: boolean) => void;

  onSubmit: (planedDate: Date) => void;
  onCancel: () => void;
}

export type StepType = 'date' | 'time' | 'confirmation';

const TestDriveConfirmationDialog = ({ isShown, brand, model, carId, setIsShown, onSubmit, onCancel }: Props) => {
  const [currentStep, setCurrentStep] = useState<StepType>('date');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const confirmTestDriveHandler = () => {
    if (!selectedDate || !selectedTime) return;

    const dateWithTime = new Date(selectedDate);
    const [hours, minutes, seconds] = selectedTime.split(':').map(Number);
    dateWithTime.setHours(hours, minutes, seconds);

    onSubmit(dateWithTime);
  };

  const cancelHandler = () => {
    setCurrentStep('date');
    setSelectedDate(undefined);
    setSelectedTime(null);
    onCancel();
  };

  const contentByStepTable: Record<StepType, { content: React.ReactNode; header: React.ReactNode }> = {
    date: {
      content: (
        <TestDriveConfirmationDateStep
          date={selectedDate}
          onChangeStep={setCurrentStep}
          onDateSelect={setSelectedDate}
        />
      ),
      header: <DialogTitle>Выберите дату тест-драйва</DialogTitle>,
    },
    time: {
      content: (
        <TestDriveConfirmationTimeStep
          date={selectedDate ?? new Date()}
          carId={carId}
          onChangeStep={setCurrentStep}
          onTimeSelect={setSelectedTime}
        />
      ),
      header: (
        <>
          <DialogTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Выберите время
          </DialogTitle>
          {selectedDate && <p className="text-sm text-gray-600">{formatDateInRussian(selectedDate)}</p>}
        </>
      ),
    },
    confirmation: {
      content: (
        <TestDriveConfirmationFinalStep
          date={selectedDate}
          time={selectedTime}
          onCancel={cancelHandler}
          onSubmit={confirmTestDriveHandler}
          brand={brand}
          model={model}
        />
      ),
      header: <DialogTitle>Подтверждение записи на тест-драйв</DialogTitle>,
    },
  };

  const currentContent = contentByStepTable[currentStep].content;
  const currentHeader = contentByStepTable[currentStep].header;

  return (
    <Dialog
      open={isShown}
      onOpenChange={value => {
        if (!isShown) {
          cancelHandler();
        }
        setIsShown(value);
      }}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>{currentHeader}</DialogHeader>
        {currentContent}
      </DialogContent>
    </Dialog>
  );
};

export default TestDriveConfirmationDialog;
