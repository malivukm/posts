import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

interface NotFoundProps {
  message: string;
}

export const NotFound = (props: NotFoundProps): JSX.Element => {
  const navigate = useHistory();

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log(`${props.message}${NotFound.displayName}`);
  }, []);

  return (
    <div className="not-found-container">
      <h1>Page not found, go back to posts...</h1>
      <button onClick={() => navigate.push('/posts')}>Go to posts page</button>
    </div>
  );
};

NotFound.displayName = 'NotFound component';
