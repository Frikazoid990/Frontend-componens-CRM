import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useNavigate } from '@tanstack/react-router';
import { FileX, Plus } from 'lucide-react';

interface Props {
  text: string;
  mainHeaderText: string;
}

const EmptyCard = ({ text, mainHeaderText }: Props) => {
  const navigate = useNavigate();
  return (
    <Card className="rounded-xl border-2 border-dashed border-gray-200 p-6 shadow-sm">
      <CardContent className="flex flex-col items-center justify-center p-0 text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
          <FileX className="h-8 w-8 text-gray-400" />
        </div>
        <h3 className="mb-2 text-lg font-semibold text-gray-900">{mainHeaderText}</h3>
        <p className="mb-4 max-w-sm text-sm text-gray-500">{text}</p>
        <Button
          onClick={() => {
            navigate({ to: '/' });
          }}
          variant="outline"
          size="sm"
          className="border-gray-300 bg-white text-gray-700"
        >
          <Plus className="mr-2 h-4 w-4" />
          Посмотреть каталог
        </Button>
      </CardContent>
    </Card>
  );
};

export default EmptyCard;
