import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface Props {
  brand: string;
  model: string;
  color: string;
  engine: string;
  config: string;
  isShown: boolean;
  setIsShown: (isShown: boolean) => void;
  onBuy: () => void;
  onCancel: () => void;
}

const BuyConfirmationDialog = ({
  brand,
  model,
  color,
  engine,
  config,

  isShown,
  setIsShown,

  onBuy,
  onCancel,
}: Props) => {
  return (
    <Dialog open={isShown} onOpenChange={setIsShown}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Подтверждение покупки</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <p className="mb-4 text-center text-lg">Вы точно хотите создать сделку по этому автомобилю?</p>
          <div className="rounded-lg bg-gray-50 p-4 text-center">
            <p className="font-semibold">
              {brand} {model}
            </p>
            <p className="text-sm text-gray-600">{color && `Цвет: ${color}`}</p>
            <p className="text-sm text-gray-600">{engine && `Двигатель: ${engine}`}</p>
            <p className="text-sm text-gray-600">{config && `Комплектация: ${config}`}</p>
          </div>
        </div>
        <DialogFooter className="flex justify-center gap-2">
          <Button variant="outline" onClick={onCancel}>
            Отмена
          </Button>
          <Button onClick={onBuy}>Принять</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BuyConfirmationDialog;
