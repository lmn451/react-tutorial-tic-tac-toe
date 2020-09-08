import React from 'react';
import "../index.css";


const Square = props => (
  <button className={`${props.winnerClass} square`} onClick={props.onClick}>
    {props.value}
  </button>
);

export default Square;
