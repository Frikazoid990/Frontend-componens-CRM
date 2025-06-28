import { format, parseISO } from 'date-fns';

export const formatDateSafe = (dateString?: string | null) => {
  if (!dateString) return { date: 'N/A', time: 'N/A' };
  try {
    const date = parseISO(dateString);
    return {
      date: format(date, 'MM.dd.yyyy'),
      time: format(date, 'HH:mm'),
    };
  } catch (error) {
    console.error('Ошибка форматирования даты:', error);
    return { date: 'N/A', time: 'N/A' };
  }
};
