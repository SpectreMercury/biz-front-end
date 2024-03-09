import request from "@/utils/request";

export const publishNeeds = async (data: any) => {
  const url = 'http://124.223.105.57:8883/api/publish_needs';
  const method = 'POST';
  const headers = {
    'Content-Type': 'application/json'
  };

  try {
    const response = await request(url, method, data, headers);
    return response;
  } catch (error) {
    console.error("Error posting publish needs data:", error);
    throw error;
  }
};


export const applyNeeds = async (data: any) => {
  const url = 'http://124.223.105.57:8883/api/join_needs';
  const method = 'POST';
  const headers = {
    'Content-Type': 'application/json'
  };

  try {
    const response = await request(url, method, data, headers);
    return response;
  } catch (error) {
    console.error("Error posting publish needs data:", error);
    throw error;
  }
};
