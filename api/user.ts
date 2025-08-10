import axios from "axios";
import { WarehouseKeys } from "../shared/documentPrefixes";


// 1. Лучше вынести в .env
const API_URL = "https://literally-fair-lark.cloudpub.ru/api";

// 2. Добавляем интерфейс для ответа
interface UserProfile {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  place:string;
  operators?: string[];
  photo?: string;
}

export const getUserProfile = async (token: string): Promise<UserProfile> => {
  try {
    
    const response = await axios.get(`${API_URL}/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      timeout: 10000,
      validateStatus: (status) => status < 500 // Не считать 401 ошибкой
    });
    if (response.status === 401) {
        throw new Error('Требуется авторизация')
    }

    if (!response.data?.id) {
      throw new Error('Неверный формат ответа сервера');
    }

    return response.data as UserProfile;

  } catch (error: unknown) {

    if (axios.isAxiosError(error)) {
      console.error('[ProfileAPI] Ошибка запроса:', {
        url: `${API_URL}/users/me`,
        status: error.response?.status,
        data: error.response?.data,
        code: error.code
      });

      if (error.response?.status === 401) {
        throw new Error('Требуется авторизация');
      }
      if (error.code === 'ECONNABORTED') {
        throw new Error('Превышено время ожидания');
      }
    }

    console.error('[ProfileAPI] Необработанная ошибка:', error);
    throw error;
  }
};