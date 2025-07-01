import { dealApiRoutes, statusApiRoutes } from '@/constants/routes';
import { useSession } from '@/hooks/useSession';
import { useToken } from '@/hooks/useToken';
import type { DealType } from '@/types/deal/deal.type';
import type { DealStatusType } from '@/types/statuses/deal.status.type';
import { DragDropContext, type DropResult } from '@hello-pangea/dnd'; // Using @hello-pangea/dnd as a modern fork
import { useEffect, useState } from 'react';
import DealColumn from './ui/DealColumn';

export interface KanbanColumn {
  id: number;
  title: string;
  // deals: Deal[];
}

const ManagementDeals = () => {
  const [columns, setColumns] = useState<KanbanColumn[]>([]);
  const [statusesTable, setStatusesTable] = useState<Record<number, string> | null>(null);
  const [dealsTable, setDealsTable] = useState<Record<string, DealType[]> | null>(null); //
  const [searchTerm, setSearchTerm] = useState('');
  //  Assuming dealsTable is an array of Deal objects
  const token = useToken();
  const fetchStatuses = async () => {
    try {
      console.log('Fetching from:', import.meta.env.API_URL + statusApiRoutes.getStatusDeals);
      const response = await fetch(import.meta.env.VITE_API_URL + statusApiRoutes.getStatusDeals, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          // Add any other headers if needed, like authorization
        },
        credentials: 'include', // Include cookies for session management
      });
      if (!response.ok) {
        throw new Error('Failed to fetch statuses');
      }
      const data: DealStatusType[] = await response.json();

      const columns: KanbanColumn[] = data.map(status => ({
        id: status.value,
        title: status.label,
      }));

      const statusesMap: Record<number, string> = data.reduce(
        (acc, status) => {
          acc[status.value] = status.label;
          return acc;
        },
        {} as Record<number, string>,
      );

      setStatusesTable(statusesMap);
      setColumns(columns);
    } catch (error) {
      console.error('Error fetching statuses:', error);
    }
  };
  const fetchDeals = async () => {
    try {
      const response = await fetch(import.meta.env.VITE_API_URL + dealApiRoutes.getDeals, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        credentials: 'include', // Include cookies for session management
      });
      if (!response.ok) {
        throw new Error('Failed to fetch deals');
      }
      const data: DealType[] = await response.json();

      // Assuming the data is structured as an array of deals
      const initialDealsTable: Record<string, DealType[]> = data.reduce(
        (acc, deal) => {
          const status = deal.status; // Assuming each deal has a status field
          if (!acc[status]) {
            acc[status] = [];
          }
          acc[status].push(deal);
          return acc;
        },
        {} as Record<string, DealType[]>,
      );

      setDealsTable(initialDealsTable);
    } catch (error) {
      console.error('Error fetching deals:', error);
    }
  };
  const updateDealAction = async (dealId: DealType['id'], dealStatusId: number) => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL + dealApiRoutes.updateDealWithStatus(dealId);

      const response = await fetch(apiUrl, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          // Add any other headers if needed, like authorization
          Authorization: `Bearer ${token}`,
        },

        credentials: 'include', // Include cookies for session management
        body: JSON.stringify(dealStatusId),
      });

      if (!response.ok) {
        throw new Error('Failed to update deal');
      }

      return { error: null, success: true };
    } catch (error) {
      console.error('Error updating deal:', error);
      return { error: error instanceof Error ? error.message : 'Unknown error' };
    }
  };

  useEffect(() => {
    Promise.all([fetchStatuses(), fetchDeals()]);
  }, []);

  const onDragEnd = (result: DropResult) => {
    // debugger;

    const { source, destination } = result;
    // Dropped outside the list
    if (!destination) {
      return;
    }
    // If the item is dropped in the same column and same position
    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      return;
    }

    if (!dealsTable || !statusesTable) {
      console.error('Deals table or statuses table is not initialized');
      return;
    }
    const draggedFromColumnStatus = statusesTable[+source.droppableId];
    const destinationColumnStatus = statusesTable[+destination.droppableId];

    // Remove the dragged item from the source column
    const sourceDeals = [...dealsTable[draggedFromColumnStatus]];
    const [draggedItem] = sourceDeals.splice(source.index, 1);

    let previousDealsState: Record<string, DealType[]> | null = null;

    setDealsTable(prev => {
      if (!prev) {
        console.error('Deals table is not initialized');
        return prev;
      }

      previousDealsState = { ...prev }; // Store the previous state for debugging

      const newDealsState = {
        ...prev,
        [draggedFromColumnStatus]: prev[draggedFromColumnStatus].filter(deal => deal.id !== draggedItem.id),
        [destinationColumnStatus]: [...prev[destinationColumnStatus], draggedItem],
      };

      return newDealsState;
    });

    updateDealAction(draggedItem.id, +destination.droppableId).then(({ error, success }) => {
      if (error) {
        console.error('Error updating deal:', error);
        // Revert the dealsTable to the previous state in case of error
        setDealsTable(previousDealsState);
      } else {
        console.log('Deal updated successfully');
      }
    });

    // setColumns(newColumns);
  };

  const filteredDealsTable = (): Record<string, DealType[]> => {
    if (!searchTerm.trim() || !dealsTable) {
      return dealsTable || {}; // Если нет поиска или данных — возвращаем оригинальные или пустой объект
    }

    const lowercasedTerm = searchTerm.toLowerCase();
    const result: Record<string, DealType[]> = {};

    Object.entries(dealsTable).forEach(([status, deals]) => {
      result[status] = deals.filter(deal => {
        const clientName = deal.client.fullName?.toLowerCase() || '';
        const carModel = `${deal.car.brand} ${deal.car.model}`.toLowerCase();
        const price = String(deal.price);
        const phoneNumber = deal.client.phoneNumber.toLowerCase() || '';
        return (
          clientName.includes(lowercasedTerm) ||
          carModel.includes(lowercasedTerm) ||
          price.includes(lowercasedTerm) ||
          phoneNumber.includes(lowercasedTerm)
        );
      });
    });

    return result;
  };

  const role = useSession()?.['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
  return (
    <>
      <div className="flex justify-end p-4">
        <div className="w-64">
          <input
            type="text"
            placeholder="Поиск..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
          />
        </div>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex w-full justify-center gap-4 overflow-x-auto p-4">
          {columns
            .filter(section => {
              if (role === 'MANAGER') {
                return [
                  'Новая',
                  'Консультация',
                  'Подписание договора',
                  'Доставка/Подготовка автомобиля',
                  'Завершена',
                ].includes(section.title);
              } else {
                return section;
              }
            })
            .map((column, colIndex) => (
              <DealColumn
                key={column.id}
                column={column}
                colIndex={colIndex}
                colLength={columns.length}
                deals={filteredDealsTable()[column.title] || []}
              />
            ))}
        </div>
      </DragDropContext>
    </>
  );
};

export default ManagementDeals;
