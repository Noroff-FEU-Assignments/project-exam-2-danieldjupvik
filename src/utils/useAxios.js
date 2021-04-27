import { useContext } from 'react';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import { baseUrl } from './api';

const useAxios = () => {
  const [auth] = useContext(AuthContext);
  const apiClient = axios.create({
    baseURL: baseUrl,
  });
  apiClient.interceptors.request.use((config) => {
    const token = auth.jwt;
    config.headers.Authorization = token ? `Bearer ${token}` : '';
    return config;
  });

  return apiClient;
};

export default useAxios;
