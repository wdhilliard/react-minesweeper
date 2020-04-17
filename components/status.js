import React, { useContext } from 'react';
import { StoreContext } from '../context/context.js';
import { StatusContainer, StatusText } from './status.style';
import { GAME_OVER, IN_PROGRESS, WIN } from './../utility/minesweeper';

const Status = () => {
  const { state, dispatch } = useContext(StoreContext);
  const { status } = state;
  return (
    <StatusContainer>
      <StatusText status={status}>
        {status === IN_PROGRESS && 'CLICK SQUARES TO REVEAL'}
        {status === GAME_OVER && 'OH NO, YOU LOSE!'}
        {status === WIN && 'YOU WIN!'}
      </StatusText>
    </StatusContainer>
  );
};

export default Status;
