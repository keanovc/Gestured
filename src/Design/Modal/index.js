import React from 'react';
import CloseIcon from '../../images/icon-close.svg';
import Rules from '../../images/rules.webp';
import './styles.css';
import P from 'prop-types';

export const Modal = ({ text, show, toggle }) => {
  return (
    <div className="modalWrapper">
      <div className="modalContainer">
        <div className="heading">
          <h1>{text}</h1>
          <img src={CloseIcon} alt="closeIcon" id="closeIcon" onClick={toggle} />
        </div>
        <div className="content">
          <img src={Rules} alt="rules img" />
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  text: P.string.isRequired,
  show: P.bool.isRequired,
  toggle: P.func.isRequired,
};
