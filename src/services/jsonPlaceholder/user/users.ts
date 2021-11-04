import { UserResponse } from './interfaces';
import fetchRequest from '../../fetchReq';

const servicePath = 'https://jsonplaceholder.typicode.com/users';

export async function getAllUsers(): Promise<UserResponse[]> {
  return fetchRequest(servicePath);
}

export async function getUserById(userId: number): Promise<UserResponse> {
  const endpoint = `/${userId}`;
  return fetchRequest(`${servicePath}${endpoint}`);
}

export async function getUsersByData(userData: string): Promise<UserResponse[]> {
  const endpoint = `/?q=${userData}`;
  return fetchRequest(`${servicePath}${endpoint}`);
}
