import React, { useEffect, useState, useContext } from 'react';
import { Search } from './search';
import { JsonPlaceholderApi } from '../services';
import { AppContext } from '../context/appContext';
import { PostsListWithSpinner } from './postsList';

interface PostsProps {
  message: string;
}

export const Posts = (props: PostsProps): JSX.Element => {
  const appContext = useContext(AppContext);
  const [postsData, setPostsData] = useState<JsonPlaceholderApi.Post.PostResponse[]>();
  const [noResults, setNoResults] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [allUsers, setAllUsers] = useState<JsonPlaceholderApi.User.UserResponse[]>();

  useEffect(() => {
    const getPostData = async (): Promise<void> => {
      try {
        setIsLoading(true);
        const postsDataResponse = await JsonPlaceholderApi.Post.getAllPosts();
        const allUsersResponse = await JsonPlaceholderApi.User.getAllUsers();
        setPostsData(postsDataResponse);
        setAllUsers(allUsersResponse);
      } catch (error) {
        // console.log(error);
        setNoResults(true);
      } finally {
        setIsLoading(false);
      }
    };

    void getPostData();

    // eslint-disable-next-line no-console
    console.log(`${props.message}${Posts.displayName}`);
  }, []);

  useEffect(() => {
    if (postsData?.length) {
      setNoResults(false);
    }
  }, [postsData]);

  const searchByUserData = (query: string): void => {
    void (async () => {
      try {
        setNoResults(false);
        setIsLoading(true);
        const allPosts = await JsonPlaceholderApi.Post.getAllPosts();
        const users = await JsonPlaceholderApi.User.getUsersByData(query);
        const userIds = users.map((item) => item.id);
        const filteredPostsByUser = allPosts.filter((post) => userIds.includes(post.userId));
        if (filteredPostsByUser.length) {
          setPostsData(filteredPostsByUser);
        } else {
          setNoResults(true);
        }
      } catch (error) {
        // console.log(error);
        setNoResults(true);
      } finally {
        setIsLoading(false);
      }
    })();
  };

  return (
    <div className="posts-grid-container">
      <Search placeholder="Search posts by user data" message={appContext.message} onSearch={(query) => searchByUserData(query)}></Search>
      <div className="posts-results">
        {noResults ? (
          <div>
            <h1>No posts found</h1>
          </div>
        ) : (
          <PostsListWithSpinner isLoading={isLoading} message={appContext.message} posts={postsData} users={allUsers} />
        )}
      </div>
    </div>
  );
};

Posts.displayName = 'Posts component';
