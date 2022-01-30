import { useCallback, useState } from 'react';

export const useHttp = () => {
  const [isLoading, setLoading] = useState(false);

  const request = useCallback(async (url) => {
    try {
      setLoading(true);

      const response = await fetch(url);

      setLoading(false);

      if (!response.ok) {
        throw new Error(`Could not fetch ${url}, status: ${response.status}`);
      }

      return await response.json();
    } catch(e) {
      throw e;
    }
  }, []);

  return {request, isLoading}
}