import React, { useEffect, useState, useContext } from 'react';
import { CommonProps } from './_common/interfaces';
import useResizeObserver from 'use-resize-observer/polyfilled';
import { List, ListRowProps, ListRowRenderer, CellMeasurer, CellMeasurerCache } from 'react-virtualized';
import { JsonPlaceholderApi } from '../services';
import { PostCard } from './postCard';
import { AppContext } from '../context/appContext';
import { useHistory } from 'react-router-dom';
import { WithSpinner } from './withSpinner';

export interface PostsListProps extends CommonProps {
  message: string;
  posts?: JsonPlaceholderApi.Post.PostResponse[];
  users?: JsonPlaceholderApi.User.UserResponse[];
}

export const PostsList = (props: PostsListProps): JSX.Element => {
  const appContext = useContext(AppContext);
  const navigate = useHistory();
  const [resultRefSize, setResultRefSize] = useState<{ width: number | undefined; height: number | undefined }>();
  const onResultsResize = (dimensions: { width: number | undefined; height: number | undefined }): void => {
    setResultRefSize(dimensions);
  };

  const { ref: resultsRef } = useResizeObserver<HTMLDivElement>({
    onResize: onResultsResize,
  });

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log(`${props.message}${PostsList.displayName}`);
  }, []);

  const cache = new CellMeasurerCache({
    defaultHeight: 100,
    fixedWidth: true,
  });

  const rowRenderer: ListRowRenderer = ({ index, key, parent, style }: ListRowProps) => {
    if (props.posts) {
      const post = props.posts[index];
      const user = props.users?.find((element) => element.id === post.userId);
      const customStyle = {
        ...style,
        paddingTop: '10px',
      };

      return (
        <CellMeasurer cache={cache} columnIndex={0} key={key} parent={parent} rowIndex={index}>
          {({ measure }) => (
            <div style={customStyle} onLoad={measure} key={key}>
              <PostCard
                key={`${post.id}-${key}`}
                postData={post}
                user={user}
                message={appContext.message}
                onClick={(id) => navigate.push(`/post/${id}`)}
              />
            </div>
          )}
        </CellMeasurer>
      );
    }
  };

  return (
    <div className="posts-list" ref={resultsRef}>
      {props.posts?.length && props.users?.length && (
        <List
          height={resultRefSize?.height ?? 0}
          rowHeight={cache.rowHeight}
          width={resultRefSize?.width ?? 0}
          rowRenderer={rowRenderer}
          rowCount={props.posts.length}
          deferredMeasurementCache={cache}
        />
      )}
    </div>
  );
};

PostsList.displayName = 'PostsList Component';

export const PostsListWithSpinner = WithSpinner(PostsList);
