import { PostResponse } from './interfaces';
import fetchRequest from '../../fetchReq';

const servicePath = 'https://jsonplaceholder.typicode.com/posts';

export async function getAllPosts(): Promise<PostResponse[]> {
  return fetchRequest(servicePath);
}

export async function getPostById(postId: string): Promise<PostResponse> {
  const endpoint = `/${postId}`;
  return fetchRequest(`${servicePath}${endpoint}`);
}
