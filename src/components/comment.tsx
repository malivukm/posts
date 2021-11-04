import React, { useEffect, useContext } from 'react';
import { Card } from './card';
import { JsonPlaceholderApi } from '../services';
import { CommonProps } from './_common/interfaces';
import { AppContext } from '../context/appContext';

interface CommentProps extends CommonProps {
  onClick?: (event: React.MouseEvent) => void;
  message: string;
  commentData: JsonPlaceholderApi.Comments.Comment;
}

export const Comment = (props: CommentProps): JSX.Element => {
  const appContext = useContext(AppContext);
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log(`${props.message}${Comment.displayName}`);
  }, []);

  const getClassName = (): string => {
    let className = 'comment-container';
    if (props.className) {
      className += ` ${props.className}`;
    }
    return className;
  };

  return (
    <Card message={appContext.message} type="comment" className={getClassName()}>
      <h5>{`${props.commentData.email} :`}</h5>
      <p>{props.commentData.body}</p>
    </Card>
  );
};

Comment.displayName = 'Comment component';
