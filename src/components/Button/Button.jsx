
import React from 'react';
import css from './Button.module.css';

export const Button = ({
  onClick = null,
}) => {
  return (
    <div className={css.more}>
      <button
              className={css.moreButton}
              type='button'
              onClick={onClick}
    >
      Load more
    </button>
    </div>

  );
};