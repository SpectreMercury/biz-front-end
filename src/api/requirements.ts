import request from '@/utils/request';
import { ApiResponse } from '@/interface/requests';
import { OwnedProps, PublicNeedRequest } from '@/interface/requirements';

export async function getPublicNeeds(): Promise<PublicNeedRequest[]> {
  const url = 'http://124.223.105.57:8883/api/public_needs';
  const response: ApiResponse<PublicNeedRequest[]> = await request(url, 'GET');
  return response.data;
}


export async function getMyNeeds(userWallet: string, relationType: number): Promise<OwnedProps[]> {
  // const url = `http://124.223.105.57:8883/api/my_needs?userWallet=${userWallet}&relationType=${relationType}`;
  const url = `http://124.223.105.57:8883/api/my_needs?userWallet=0xaebcdfdfdfada238292232323fffdaaa&relationType=${relationType}`;
  const response: ApiResponse<OwnedProps[]> = await request(url, 'GET');
  return response.data;
}