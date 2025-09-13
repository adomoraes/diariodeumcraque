import React, { useState, useEffect } from 'react';
import { useAuthStore } from '../lib/store';
import { findAll, create } from '../services/api';
import { Link } from 'react-router-dom';

const DashboardPage: React.FC = () => {
  const { token } = useAuthStore();
  const [entries, setEntries] = useState<any[]>([]);
  const [content, setContent] = useState('');

  useEffect(() => {
    const fetchEntries = async () => {
      if (token) {
        try {
          const data = await findAll(token);
          setEntries(data);
        } catch (error) {
          console.error('Failed to fetch entries', error);
        }
      }
    };
    fetchEntries();
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (token) {
      try {
        const newEntry = await create({ content }, token);
        setEntries([...entries, newEntry]);
        setContent('');
      } catch (error) {
        console.error('Failed to create entry', error);
      }
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Novo Registro</h2>
        <form onSubmit={handleSubmit}>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            rows={4}
            placeholder="Como foi seu treino hoje?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2"
            type="submit"
          >
            Salvar
          </button>
        </form>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Meus Registros</h2>
        <ul>
          {entries.map((entry) => (
            <li key={entry.id} className="mb-2 p-2 border rounded">
              <Link to={`/diary/${entry.id}`} className="text-blue-500 hover:underline">
                {entry.content.substring(0, 100)}...
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DashboardPage;
