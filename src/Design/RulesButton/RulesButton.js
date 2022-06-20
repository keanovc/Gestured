import React from 'react';
import './RulesButton.css';
import P from 'prop-types';

export const RulesButton = ({ text, toggle }) => {
  return (
    <button className="btnOutline" onClick={toggle}>
      {text}
    </button>
  );
};

RulesButton.propTypes = {
  text: P.string.isRequired,
  toggle: P.func.isRequired,
};

