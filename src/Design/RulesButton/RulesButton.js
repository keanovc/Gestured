import React from 'react';
import P from 'prop-types';
import Book from '../../images/book.png';

export const RulesButton = ({ text, toggle }) => {
  return (
    <button onClick={toggle} className="absolute right-10 bottom-10 flex p-2.5 transform transition duration-500 hover:scale-125 text-white">
      <img src={Book} alt="book" className='w-16' />
    </button>
  );
};

RulesButton.propTypes = {
  toggle: P.func.isRequired,
};

