const API_URL = 'http://localhost:5001';

export const httpClient = {
  get: async <T>(endpoint: string): Promise<T> => {
    const response = await fetch(API_URL + endpoint);

    if (!response.ok) {
      throw new Error(`Can't load from '${endpoint}'`);
    }

    return response.json();
  },
  post: async <T>(endpoint: string, data: T) => {
    const response = await fetch(API_URL + endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Can't load from '${endpoint}'`);
    }

    return response.json();
  },
  patch: async <T>(endpoint: string, data: T): Promise<T> => {
    const response = await fetch(API_URL + endpoint, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Can't load from '${endpoint}'`);
    }

    return response.json();
  },
  delete: async <T>(endpoint: string): Promise<T> => {
    const response = await fetch(API_URL + endpoint, { method: 'DELETE' });

    if (!response.ok) {
      throw new Error(`Can't load from '${endpoint}'`);
    }

    return response.json();
  },
};
