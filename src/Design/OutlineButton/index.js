import React from 'react';
import './styles.css';
import P from 'prop-types';

export const OutlineButton = ({ text, toggle }) => {
  return (
    <button className="btnOutline" onClick={toggle}>
      {text}
    </button>
  );
};

OutlineButton.propTypes = {
  text: P.string.isRequired,
  toggle: P.func.isRequired,
};

