import React, { useEffect, useContext } from 'react';
import { Spinner } from './spinner';
import { AppContext } from '../context/appContext';

interface WithSpinnerProps {
  isLoading: boolean;
  message: string;
}

export function WithSpinner<T>(WrappedComponent: React.ComponentType<T>): (props: T & WithSpinnerProps) => JSX.Element {
  const displayName = WrappedComponent.displayName;

  const componentWithSpinner = (props: T & WithSpinnerProps): JSX.Element => {
    const appContext = useContext(AppContext);

    useEffect(() => {
      // eslint-disable-next-line no-console
      console.log(`${props.message}${componentWithSpinner.displayName}`);
    }, []);

    if (props.isLoading) {
      return <Spinner message={appContext.message} />;
    } else {
      return <WrappedComponent {...props} />;
    }
  };

  componentWithSpinner.displayName = `withSpinner(${displayName})`;

  return componentWithSpinner;
}
