import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuthStore } from '../lib/store';
import { findOne } from '../services/api';

const EntryDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { token } = useAuthStore();
  const [entry, setEntry] = useState<any>(null);

  useEffect(() => {
    const fetchEntry = async () => {
      if (token && id) {
        try {
          const data = await findOne(id, token);
          setEntry(data);
        } catch (error) {
          console.error('Failed to fetch entry', error);
        }
      }
    };
    fetchEntry();
  }, [token, id]);

  if (!entry) {
    return <div className="text-light-darker dark:text-dark-lighter">Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-light-darker dark:text-dark-lighter">Detalhes do Registro</h1>
      <div className="p-4 border rounded bg-light-DEFAULT dark:bg-dark-light text-light-darker dark:text-dark-lighter">
        <p>{entry.content}</p>
        <Link to={`/diary/edit/${entry.id}`} className="text-primary hover:underline mt-4 inline-block">
          Editar
        </Link>
      </div>
    </div>
  );
};

export default EntryDetailPage;
