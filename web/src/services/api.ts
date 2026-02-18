const API_URL = 'http://localhost:3000'; // Assuming the backend is running on port 3000

export const register = async (data: any) => {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return response.json();
};

export const login = async (data: any) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return response.json();
};

export const findAll = async (token: string) => {
  const response = await fetch(`${API_URL}/diary`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
};

export const findOne = async (id: string, token: string) => {
  const response = await fetch(`${API_URL}/diary/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
};

export const create = async (data: any, token: string) => {
  const response = await fetch(`${API_URL}/diary`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return response.json();
};

export const update = async (id: string, data: any, token: string) => {
  const response = await fetch(`${API_URL}/diary/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return response.json();
};

export const remove = async (id: string, token: string) => {
  const response = await fetch(`${API_URL}/diary/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
};

export const getWeeklySummary = async (token: string) => {
  const response = await fetch(`${API_URL}/diary/summary/weekly`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
};

export const getLastThreeEntries = async (token: string) => {

  const response = await fetch(`${API_URL}/diary/last-three`, {

    headers: {

      Authorization: `Bearer ${token}`,

    },

  });

  return response.json();

};



export const getMonthlySummary = async (token: string, year: number, month: number) => {

  const response = await fetch(`${API_URL}/diary/summary/monthly?year=${year}&month=${month}`, {

    headers: {

      Authorization: `Bearer ${token}`,

    },

  });

  return response.json();

};
