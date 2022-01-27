import { useState, useCallback } from "react";

export const useHttp = () => {
  const request = useCallback(async (
    url,
    method = 'GET',
    body = null,
    headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  }) => {
    try {
      const response = await fetch(url, {
        method,
        body,
        headers,
        mode: 'no-cors',
        withCredentials: true,
        credentials: 'same-origin',
      });

      if (!response.ok) {
        return null;
        // throw new Error(`Could not fetch ${url}, status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch(e) {
      throw e;
    }
  }, []);

  return {request}
}