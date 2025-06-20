import { fetchAvailableSlots } from '@/actions/test_drive.action';
import { Button } from '@/components/ui/button';
import type { UUID } from 'crypto';
import { useEffect, useState } from 'react';

interface Props {
  date: Date;
  carId: UUID;
  onTimeSelect: (time: string) => void;
  onChangeStep: (step: 'confirmation') => void;
}

const TestDriveConfirmationTimeStep = ({ date, carId, onTimeSelect, onChangeStep }: Props) => {
  const [timeSlots, setTimeSlots] = useState<string[]>([]);

  useEffect(() => {
    fetchAvailableSlots({
      date,
      carId,
    }).then(slots => {
      console.log(slots);
      setTimeSlots(slots);
    });
  }, []);

  return (
    <div className="grid max-h-60 grid-cols-3 gap-2 overflow-y-auto py-4">
      {timeSlots.map(time => (
        <Button
          key={time}
          variant="outline"
          className="h-10 text-sm"
          onClick={() => {
            onTimeSelect(time);
            onChangeStep('confirmation');
          }}
        >
          {time}
        </Button>
      ))}
    </div>
  );
};

export default TestDriveConfirmationTimeStep;
