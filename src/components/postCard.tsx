import React, { useEffect, useContext } from 'react';
import { Card } from './card';
import { JsonPlaceholderApi } from '../services';
import { AppContext } from '../context/appContext';

interface PostCardProps {
  onClick?: (postId: number) => void;
  message: string;
  postData: JsonPlaceholderApi.Post.PostResponse;
  user?: JsonPlaceholderApi.User.UserResponse;
}

export const PostCard = (props: PostCardProps): JSX.Element => {
  const appContext = useContext(AppContext);
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log(`${props.message}${PostCard.displayName}`);
  }, []);

  return (
    <Card message={appContext.message} type="post" onClick={() => (props.onClick ? props.onClick(props.postData.id) : null)}>
      <h3>{props.postData.title}</h3>
      <p>{props.postData.body}</p>
      {props.user && <span className="user">{props.user?.name}</span>}
    </Card>
  );
};

PostCard.displayName = 'PostCard component';
