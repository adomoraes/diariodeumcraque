import React, { useState, useEffect } from 'react';
import { useAuthStore } from '../lib/store';
import { getWeeklySummary } from '../services/api';

const WeeklyReviewPage: React.FC = () => {
  const { token } = useAuthStore();
  const [summary, setSummary] = useState<Record<number, number>>({});

  useEffect(() => {
    const fetchSummary = async () => {
      if (token) {
        try {
          const data = await getWeeklySummary(token);
          setSummary(data);
        } catch (error) {
          console.error('Failed to fetch weekly summary', error);
        }
      }
    };
    fetchSummary();
  }, [token]);

  const days = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  const data = days.map((day, index) => ({
    day,
    entries: summary[index] || 0,
  }));

  const maxEntries = Math.max(...data.map((d) => d.entries), 1);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Revisão Semanal</h1>
      <div className="flex justify-around items-end bg-gray-100 p-4 rounded-lg h-64">
        {data.map((item) => (
          <div key={item.day} className="flex flex-col items-center">
            <div
              className="w-12 bg-blue-500"
              style={{ height: `${(item.entries / maxEntries) * 100}%` }}
            ></div>
            <span className="mt-2 text-sm text-gray-600">{item.day}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeeklyReviewPage;
