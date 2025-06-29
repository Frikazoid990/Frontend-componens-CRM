import { fetchAvailableSlots } from '@/actions/test_drive.action';
import { Button } from '@/components/ui/button';
import { useToken } from '@/hooks/useToken';
import type { UUID } from 'crypto';
import { useEffect, useState } from 'react';

interface Props {
  date: Date;
  carId: UUID;
  onTimeSelect: (time: string) => void;
  onChangeStep: (step: 'confirmation') => void;
}

const TestDriveConfirmationTimeStep = ({ date, carId, onTimeSelect, onChangeStep }: Props) => {
  const token = useToken();
  const [timeSlots, setTimeSlots] = useState<string[]>([]);

  useEffect(() => {
    if (token)
      fetchAvailableSlots(
        {
          date,
          carId,
        },
        token,
      ).then(slots => {
        console.log(slots);
        setTimeSlots(slots);
      });
  }, []);

  return (
    <div className="grid max-h-60 grid-cols-3 gap-2 overflow-y-auto py-4">
      {timeSlots.map(time => {
        const [h, m] = time.split(':');
        const formattedTimeStr = `${h}:${m}`;

        return (
          <Button
            key={time}
            variant="outline"
            className="h-10 text-sm"
            onClick={() => {
              onTimeSelect(time);
              onChangeStep('confirmation');
            }}
          >
            {formattedTimeStr}
          </Button>
        );
      })}
    </div>
  );
};

export default TestDriveConfirmationTimeStep;
