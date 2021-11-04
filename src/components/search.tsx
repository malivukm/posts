import React, { useEffect, useState } from 'react';

interface SearchProps {
  onSearch: (query: string) => void;
  message: string;
  placeholder?: string;
}

export const Search = (props: SearchProps): JSX.Element => {
  const [inputText, setInputText] = useState<string>('');

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log(`${props.message}${Search.displayName}`);
  }, []);

  const onKeyUp = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === 'Enter') {
      props.onSearch(inputText);
    }
  };

  return (
    <div className="search-container">
      <input
        placeholder={props.placeholder}
        className="search-input"
        type="text"
        onChange={(event) => setInputText(event.target.value)}
        onKeyUp={onKeyUp}
      />
      <button className="search-button" onClick={() => props.onSearch(inputText)}>
        Search
      </button>
    </div>
  );
};

Search.displayName = 'Search component';
