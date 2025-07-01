import { managerApiRoutes } from '@/constants/routes';
import { useSession } from '@/hooks/useSession';
import { useToken } from '@/hooks/useToken';
import type { ManagerStatsType } from '@/types/manager/manager.stats.type';
import { useNavigate } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const ManagementDashboard = () => {
  const [stats, setStats] = useState<ManagerStatsType | null>(null);
  const user = useSession();
  const token = useToken();

  const fetchManagerStats = async (): Promise<ManagerStatsType | null> => {
    try {
      if (!user) {
        throw new Error('No user session');
      }
      const response = await fetch(
        import.meta.env.VITE_API_URL + managerApiRoutes.getStatsForCurrentManager(user?.id),
        {
          method: 'GET',
          credentials: 'include',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data: ManagerStatsType = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };
  const navigate = useNavigate();
  useEffect(() => {
    fetchManagerStats().then(data => setStats(data));
    if (user?.['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] === 'CLIENT') navigate({ to: '/' });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="mb-6 text-2xl font-bold text-gray-800">Месячная статистика:</h1>

      {/* Statistics Cards */}
      <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border-2 border-gray-300 bg-white p-4">
          <div className="mb-1 text-sm text-gray-600">Кол-во завершенных сделок:</div>
          <div className="text-3xl font-bold text-green-500">{stats?.completedDealsCountTotal}</div>
        </div>
        <div className="rounded-lg border-2 border-gray-300 bg-white p-4">
          <div className="mb-1 text-sm text-gray-600">Кол-во новых сделок:</div>
          <div className="text-3xl font-bold text-red-500">{stats?.newDealsCountTotal}</div>
        </div>
        <div className="rounded-lg border-2 border-gray-300 bg-white p-4">
          <div className="mb-1 text-sm text-gray-600">Общая сумма продаж за месяц</div>
          <div className="text-3xl font-bold text-yellow-500">{stats?.totalPrice}</div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Bar Chart */}
        <div className="rounded-lg border border-gray-200 bg-white p-6 lg:col-span-2">
          <ResponsiveContainer width="100%" height={320}>
            <BarChart
              data={[
                { name: 'В процессе', value: stats?.testDriveInProcessCountTotal },
                { name: 'Завершенные', value: stats?.testDriveCompletedCountTotal },
              ]}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
              <YAxis
                domain={[
                  0,
                  Math.max(
                    stats?.testDriveInProcessCountTotal ?? 0,

                    stats?.testDriveCompletedCountTotal ?? 0,
                  ),
                ]}
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#6b7280' }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '6px',
                  fontSize: '12px',
                }}
              />
              <Bar
                dataKey="value"
                fill="#60a5fa"
                radius={[2, 2, 0, 0]}
                label={{ position: 'top', fontSize: 12, fill: '#374151' }}
              />
            </BarChart>
          </ResponsiveContainer>

          {/* Legend */}
          <div className="mt-4 flex items-center justify-center">
            <div className="flex items-center">
              <div className="mr-2 h-3 w-3 rounded-sm bg-blue-400"></div>
              <span className="text-sm text-gray-600">Тест-драйвы</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagementDashboard;
