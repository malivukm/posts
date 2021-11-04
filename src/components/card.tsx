import React, { useEffect } from 'react';
import { CommonProps } from './_common/interfaces';

export interface CardProps extends CommonProps {
  onClick?: (event: React.MouseEvent) => void;
  message: string;
  type?: 'post' | 'comment';
}

export const Card = (props: CardProps): JSX.Element => {
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log(`${props.message}${Card.displayName}`);
  }, []);

  const getClassName = (): string => {
    let className = `card-container ${props.type === 'comment' ? 'comment-card' : 'post-card'}`;
    if (props.className) {
      className += ` ${props.className}`;
    }
    return className;
  };

  return (
    <div className={getClassName()} style={props.style} onClick={props.onClick}>
      {props.children}
    </div>
  );
};

Card.displayName = 'Card Component';
