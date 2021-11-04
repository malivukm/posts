import React, { useEffect } from 'react';

export interface SpinnerProps {
  message: string;
}

export const Spinner = (props: SpinnerProps): JSX.Element => {
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log(`${props.message}${Spinner.displayName}`);
  }, []);

  return (
    <div className="spinner-container">
      <div className="spinner"></div>
    </div>
  );
};

Spinner.displayName = 'Spinner Component';
