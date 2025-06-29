import axios from 'axios';

export const localApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_LOCAL_API_URL || 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});
