import axiosInstance from '../utils/axios';

export interface UserInformationResponse {
  user_information: string;
}

export const getUserInformation = async (handle: string): Promise<UserInformationResponse> => {
  try {
    const response = await axiosInstance.get<UserInformationResponse>(`/get-user-information/${handle}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user information:', error);
    throw error;
  }
};
