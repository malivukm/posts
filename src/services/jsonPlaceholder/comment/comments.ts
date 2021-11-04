import { Comment } from './interfaces';
import fetchRequest from '../../fetchReq';

const servicePath = 'https://jsonplaceholder.typicode.com/comments';

export async function getCommentById(commentId: string): Promise<Comment> {
  const endpoint = `/${commentId}`;
  return fetchRequest(`${servicePath}${endpoint}`);
}

export async function getCommentByPostId(postId: string): Promise<Comment[]> {
  const endpoint = `/?postId=${postId}`;
  return fetchRequest(`${servicePath}${endpoint}`);
}
