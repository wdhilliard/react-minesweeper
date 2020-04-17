import React, { useContext } from 'react';
import { SquareContainer } from './square.style';
import { StoreContext } from '../context/context';
import {
  arrayIncludes,
  MINE,
  FLAG,
  WIN,
  GAME_OVER
} from './../utility/minesweeper';
import {
  newGame,
  revealSquare,
  gameOver,
  flagMine,
  evaluateStatus
} from './../context/actions';

import Mine from './mine';
import Flag from './flag';

const Square = ({ coordinates }) => {
  const { state, dispatch } = useContext(StoreContext);
  const { board, visibleSquares, flaggedSquares, status } = state;

  const [colIndex, rowIndex] = coordinates;
  const squareValue = board[rowIndex][colIndex];
  const isFlagged = arrayIncludes(flaggedSquares, coordinates);
  const showSquare =
    arrayIncludes(visibleSquares, coordinates) ||
    status === GAME_OVER ||
    status === WIN;

  const handleLeftClick = (e) => {
    if (isFlagged || status === GAME_OVER) {
      return;
    }
    if (squareValue === null) {
      dispatch(newGame(colIndex, rowIndex));
      dispatch(revealSquare(colIndex, rowIndex));
      dispatch(evaluateStatus());
    } else if (squareValue === MINE) {
      dispatch(gameOver());
    } else if (squareValue !== MINE) {
      dispatch(revealSquare(colIndex, rowIndex));
      dispatch(evaluateStatus());
    }
  };

  const handleRightClick = (e) => {
    e.preventDefault();
    dispatch(flagMine(colIndex, rowIndex));
  };

  const renderContents = () => {
    if (squareValue === FLAG || (isFlagged && status !== GAME_OVER)) {
      return <Flag />;
    } else if (squareValue === 0) {
      return null;
    } else if (squareValue === MINE && status === GAME_OVER) {
      return <Mine />;
    } else if (
      typeof squareValue === 'number' &&
      (showSquare || status === GAME_OVER)
    ) {
      return squareValue;
    }
  };

  return (
    <SquareContainer
      onClick={(e) => handleLeftClick(e)}
      onContextMenu={(e) => handleRightClick(e)}
      showSquare={showSquare}
      value={squareValue}
    >
      {renderContents()}
    </SquareContainer>
  );
};

export default Square;
