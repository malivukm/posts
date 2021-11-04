import React, { useEffect, useState, useContext } from 'react';
import { Comment } from './comment';
import { JsonPlaceholderApi } from '../services';
import { AppContext } from '../context/appContext';
import { useHistory } from 'react-router-dom';

interface PostSingleProps {
  onClick?: (event: React.MouseEvent) => void;
  message: string;
  postId: string;
}

export const PostSingle = (props: PostSingleProps): JSX.Element => {
  const navigate = useHistory();
  const appContext = useContext(AppContext);
  const [postData, setPostData] = useState<JsonPlaceholderApi.Post.PostResponse>();
  const [commentsData, setCommentsData] = useState<JsonPlaceholderApi.Comments.Comment[]>();
  const [user, setUser] = useState<JsonPlaceholderApi.User.UserResponse>();

  useEffect(() => {
    JsonPlaceholderApi.Post.getPostById(props.postId)
      .then((postDataResponse) => {
        setPostData(postDataResponse);
        JsonPlaceholderApi.User.getUserById(postDataResponse.userId)
          .then((userData) => {
            setUser(userData);
          })
          .catch(() => {
            // console.log('error:', err);
          });
      })
      .catch(() => {
        // console.log('error:', err);
        navigate.push('/404');
      });

    // eslint-disable-next-line no-console
    console.log(`${props.message}${PostSingle.displayName}`);
  }, []);

  useEffect(() => {
    if (postData) {
      const getComments = async (): Promise<void> => {
        try {
          const commentsDataResponse = await JsonPlaceholderApi.Comments.getCommentByPostId(props.postId);
          if (commentsDataResponse.length) {
            setCommentsData(commentsDataResponse);
          }
        } catch (error) {
          // console.log(error);
        }
      };

      void getComments();
    }
  }, [postData]);

  return (
    <div className="single-post-container">
      <h1>{postData?.title}</h1>
      <p>{postData?.body}</p>
      {user && <span className="author">Author: {user.name}</span>}
      {commentsData && (
        <div className="single-post-comments">
          <h4>Comments:</h4>
          {commentsData.map((comment, index) => (
            <Comment key={`${comment.id}-${index}`} className="single-post-comment" commentData={comment} message={appContext.message} />
          ))}
        </div>
      )}
    </div>
  );
};

PostSingle.displayName = 'PostSingle component';
