import { fetchAvailableSlots } from '@/actions/test_drive.action';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';

interface Props {
  onTimeSelect: (time: string) => void;
  onChangeStep: (step: 'confirmation') => void;
}

const TestDriveConfirmationTimeStep = ({ onTimeSelect, onChangeStep }: Props) => {
  const [timeSlots, setTimeSlots] = useState<string[]>([]);

  useEffect(() => {
    fetchAvailableSlots().then(slots => {
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
