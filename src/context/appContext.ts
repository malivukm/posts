import { createContext } from 'react';

type AppContextValue = {
  message: string;
};

export const AppContext = createContext<AppContextValue>({ message: '' });
