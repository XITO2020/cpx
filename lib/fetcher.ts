import axios, { AxiosError } from 'axios';

export interface FetcherError extends Error {
  status?: number;
  info?: any;
}

const fetcher = async <T = any>(url: string): Promise<T> => {
  try {
    const response = await axios.get<T>(url);
    return response.data;
  } catch (error) {
    const fetchError = new Error(
      error instanceof AxiosError 
        ? error.response?.data?.message || error.message
        : 'An error occurred while fetching the data'
    ) as FetcherError;
    
    if (error instanceof AxiosError) {
      fetchError.status = error.response?.status;
      fetchError.info = error.response?.data;
    }
    
    throw fetchError;
  }
};

export default fetcher;