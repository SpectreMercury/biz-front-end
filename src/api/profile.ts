import { UserProfile } from "@/interface/profile";
import { ApiResponse } from "@/interface/requests";
import request from "@/utils/request";

export async function getProfile(addr: string): Promise<UserProfile> {
  const url = `http://124.223.105.57:8883/api/person?addr=${addr}`;
  const response: ApiResponse<UserProfile> = await request(url, 'GET');
  return response.data;
}
