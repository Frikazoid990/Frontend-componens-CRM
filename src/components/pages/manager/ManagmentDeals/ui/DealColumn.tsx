import type { DealType } from '@/types/deal/deal.type';
import { Draggable, Droppable } from '@hello-pangea/dnd';
import { Link } from '@tanstack/react-router';
import type { KanbanColumn } from '../ManagementDeals';

interface Props {
  column: KanbanColumn;
  colIndex: number;
  colLength: number;
  deals: DealType[];
}
const DealColumn = ({ column, colIndex, colLength, deals }: Props) => {
  return (
    <div className="flex max-h-[780px] flex-col overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-gray-200 p-3">
        <h3 className="text-sm font-medium">{column.title}</h3>
        {colIndex < colLength - 1 && <span className="text-sm text-gray-400">→</span>}
      </div>
      <Droppable droppableId={column.id.toString()}>
        {provided => (
          <div ref={provided.innerRef} {...provided.droppableProps} className="flex w-64 flex-shrink-0 flex-col">
            <div className="min-h-[100px] flex-1 space-y-3 overflow-y-auto p-3">
              {' '}
              {/* Added min-h for better droppable area */}
              {deals.length > 0 ? (
                deals.map((deal, dealIndex) => {
                  const formattedDate = new Date(deal.createdAt).toLocaleDateString('ru-RU', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                  });
                  return (
                    <Draggable key={deal.id} draggableId={deal.id} index={dealIndex}>
                      {providedDraggable => (
                        <div
                          ref={providedDraggable.innerRef}
                          {...providedDraggable.draggableProps}
                          {...providedDraggable.dragHandleProps}
                          className="cursor-grab rounded-md border border-gray-300 bg-white p-3 text-sm shadow-sm active:cursor-grabbing"
                        >
                          <p className="font-semibold">{deal.client.fullName}</p>
                          <p className="text-gray-700">{deal.car.brand + ' ' + deal.car.model}</p>
                          <p className="text-xs text-gray-500">Дата начала сделки: {formattedDate}</p>
                          <p className="mt-1 font-bold">{deal.price} (RUB)</p>
                          <p className="mt-2 text-xs text-blue-600">{'Автоцентр XXI'}</p>
                          <div className="flex w-full justify-end">
                            <Link
                              to="/manager/deals/$id"
                              params={{ id: deal.id }}
                              className="text-blue-500 hover:underline"
                            >
                              Подробнее
                            </Link>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  );
                })
              ) : (
                <div className="py-8 text-center text-sm text-gray-400">Нет сделок в данном статусе.</div>
              )}
              {provided.placeholder} {/* Important for dnd to work correctly */}
            </div>
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default DealColumn;
