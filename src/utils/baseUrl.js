import {create} from 'apisauce';
import authStorage from './authStorage';

const apiClient = create({
  baseURL: 'http://137.184.130.244:1995/api/v1/',
});

apiClient.addAsyncRequestTransform(async request => {
  const authToken = await authStorage.getToken();
  if (!authToken) return;
  request.headers['Authorization'] = `Bearer ${authToken}`;
});

export default apiClient;

export const baseURL = 'http://137.184.130.244:1995/api/v1';
