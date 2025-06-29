import { dealApiRoutes, statusApiRoutes } from '@/constants/routes';
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
  const [dealsTable, setDealsTable] = useState<Record<string, DealType[]> | null>(null); // Assuming dealsTable is an array of Deal objects
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
      //TODO: Need to delete
      // const columns: KanbanColumn[] = [
      //   { id: 1, title: 'Менеджер не назван' },
      //   { id: 2, title: 'Новое' }, // Adding an "All Deals" column
      //   { id: 3, title: 'Консультация' },
      //   { id: 4, title: 'Договор' },
      //   { id: 5, title: 'Доставка' },
      // ];
      // //TODO: Need to delete
      // const statusesMap = columns.reduce(
      //   (acc, column) => {
      //     acc[column.id] = column.title;
      //     return acc;
      //   },

      //   {} as Record<number, string>,
      // );

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
          // Add any other headers if needed, like authorization
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

      // //TODO: Need to delete
      // const initialDealsTable: Record<string, DealType[]> = {
      //   'Менеджер не назван': [
      //     {
      //       id: '231231',
      //       createdAt: new Date(),
      //       isCanceled: false,
      //       price: 0,
      //       status: 'Менеджер не назван',
      //       selectedConfiguration: '',
      //       selectedOptions: { engine: [], color: [] },
      //       car: {
      //         id: '12323', // Assuming a basic structure for Car
      //         model: 'Model X',
      //         brand: 'Brand Y',
      //         imgPath: '/path/to/image.jpg',
      //       }, // Assuming a basic structure for Car
      //       client: { fullName: '', id: '1111', phoneNumber: '' }, // Assuming a basic structure for Client
      //     },

      //     {
      //       id: '231232',
      //       createdAt: new Date(),
      //       isCanceled: false,
      //       price: 0,
      //       status: 'Менеджер не назван',
      //       selectedConfiguration: '',
      //       selectedOptions: { engine: [], color: [] },
      //       car: {
      //         id: '12324', // Assuming a basic structure for Car
      //         model: 'Model Y',
      //         brand: 'Brand Z',
      //         imgPath: '/path/to/image2.jpg',
      //       }, // Assuming a basic structure for Car
      //       client: { fullName: '', id: '1112', phoneNumber: '' }, // Assuming a basic structure for Client
      //     },

      //     {
      //       id: '231233',
      //       createdAt: new Date(),
      //       isCanceled: false,
      //       price: 0,
      //       status: 'Менеджер не назван',
      //       selectedConfiguration: '',
      //       selectedOptions: { engine: [], color: [] },
      //       car: {
      //         id: '12325', // Assuming a basic structure for Car
      //         model: 'Model Z',
      //         brand: 'Brand A',
      //         imgPath: '/path/to/image3.jpg',
      //       }, // Assuming a basic structure for Car
      //       client: { fullName: '', id: '1113', phoneNumber: '' }, // Assuming a basic structure for Client
      //     },
      //   ],
      //   Новое: [
      //     {
      //       id: '231234',
      //       createdAt: new Date(),
      //       isCanceled: false,
      //       price: 0,
      //       status: 'Новое',
      //       selectedConfiguration: '',
      //       selectedOptions: { engine: [], color: [] },
      //       car: {
      //         id: '12326', // Assuming a basic structure for Car
      //         model: 'Model A',
      //         brand: 'Brand B',
      //         imgPath: '/path/to/image4.jpg',
      //       }, // Assuming a basic structure for Car
      //       client: { fullName: '', id: '1114', phoneNumber: '' }, // Assuming a basic structure for Client
      //     },
      //   ],
      //   Консультация: [
      //     {
      //       id: '231235',
      //       createdAt: new Date(),
      //       isCanceled: false,
      //       price: 0,
      //       status: 'Консультация',
      //       selectedConfiguration: '',
      //       selectedOptions: { engine: [], color: [] },
      //       car: {
      //         id: '12327', // Assuming a basic structure for Car
      //         model: 'Model B',
      //         brand: 'Brand C',
      //         imgPath: '/path/to/image5.jpg',
      //       }, // Assuming a basic structure for Car
      //       client: { fullName: '', id: '1115', phoneNumber: '' }, // Assuming a basic structure for Client
      //     },
      //   ],
      //   Договор: [
      //     {
      //       id: '231236',
      //       createdAt: new Date(),
      //       isCanceled: false,
      //       price: 0,
      //       status: 'Договор',
      //       selectedConfiguration: '',
      //       selectedOptions: { engine: [], color: [] },
      //       car: {
      //         id: '12328', // Assuming a basic structure for Car
      //         model: 'Model C',
      //         brand: 'Brand D',
      //         imgPath: '/path/to/image6.jpg',
      //       }, // Assuming a basic structure for Car
      //       client: { fullName: '', id: '1116', phoneNumber: '' }, // Assuming a basic structure for Client
      //     },
      //     {
      //       id: '231237',
      //       createdAt: new Date(),
      //       isCanceled: false,
      //       price: 0,
      //       status: 'Договор',
      //       selectedConfiguration: '',
      //       selectedOptions: { engine: [], color: [] },
      //       car: {
      //         id: '12329', // Assuming a basic structure for Car
      //         model: 'Model D',
      //         brand: 'Brand E',
      //         imgPath: '/path/to/image7.jpg',
      //       }, // Assuming a basic structure for Car
      //       client: { fullName: '', id: '1117', phoneNumber: '' }, // Assuming a basic structure for Client
      //     },
      //   ],
      //   Доставка: [],
      // };

      setDealsTable(initialDealsTable);
    } catch (error) {
      console.error('Error fetching deals:', error);
    }
  };
  const updateDealAction = async (dealId: DealType['id'], dealStatusId: number) => {
    debugger;

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

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex w-full justify-center gap-4 overflow-x-auto p-4">
        {columns.map((column, colIndex) => (
          <DealColumn
            key={column.id}
            column={column}
            colIndex={colIndex}
            colLength={columns.length}
            deals={dealsTable ? dealsTable[column.title] || [] : []}
          />
        ))}
      </div>
    </DragDropContext>
  );
};

export default ManagementDeals;
