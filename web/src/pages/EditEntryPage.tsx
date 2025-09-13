import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../lib/store';
import { findOne, update } from '../services/api';

const EditEntryPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { token } = useAuthStore();
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEntry = async () => {
      if (token && id) {
        try {
          const data = await findOne(id, token);
          setContent(data.content);
        } catch (error) {
          console.error('Failed to fetch entry', error);
        }
      }
    };
    fetchEntry();
  }, [token, id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (token && id) {
      try {
        await update(id, { content }, token);
        navigate(`/diary/${id}`);
      } catch (error) {
        console.error('Failed to update entry', error);
      }
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">Editar Registro</h1>
      <form onSubmit={handleSubmit} className="p-4 bg-white dark:bg-gray-800 shadow-md rounded">
        <textarea
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline bg-gray-50 dark:bg-gray-700"
          rows={4}
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
  );
};

export default EditEntryPage;