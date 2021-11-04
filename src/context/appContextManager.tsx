import React, { FC } from 'react';
import { AppContext } from './appContext';

export const AppContextManager: FC = ({ children }): JSX.Element => {
  const message = 'Hello from: ';

  return <AppContext.Provider value={{ message }}>{children}</AppContext.Provider>;
};
