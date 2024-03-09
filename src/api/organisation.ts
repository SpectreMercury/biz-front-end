import request from '@/utils/request';
import { ApiResponse } from '@/interface/requests';

// Define the Organization interface based on your actual data structure
interface Organization {
  id: number;
  name: string;
}

export async function getOrganizations(): Promise<Organization[]> {
  const url = 'http://124.223.105.57:8883/api/organization/list';
  const response: ApiResponse<Organization[]> = await request(url, 'GET');
  return response.data;
}
