import React, { useEffect, useRef, useState } from 'react'
import '../Design/Score/Score.css'

const LocalCamScore = ({score}) => {

  return (
    <div className="headerWrapper">
      <div className={`scoreWrapper`}>
        <span>Score</span>
        <h2>{score}</h2>
      </div>
    </div>
  );
}

export default LocalCamScore