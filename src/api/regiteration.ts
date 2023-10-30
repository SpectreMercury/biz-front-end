import request from "@/utils/request";

export const postRegistration = async (data: any) => {
  const url = 'http://124.223.105.57:8883/api/registration';
  const method = 'POST';
  const headers = {
    'Content-Type': 'application/json'
  };

  try {
    const response = await request(url, method, data, headers);
    return response;
  } catch (error) {
    console.error("Error posting registration data:", error);
    throw error;
  }
};