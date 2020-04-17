import React, { useContext } from 'react';
import { StoreContext } from '../context/context.js';
import Square from '../components/square';
import {BoardContainer, BoardRow} from './board.style'

const Board = () => {
  const { state } = useContext(StoreContext);
  const { board } = state;

  return (
    <BoardContainer>
      {board.map((row, rowIndex) => {
        return (
          <BoardRow key={rowIndex}>
            {row.map((squareValue, colIndex) => {
              return <Square key={`${colIndex}${rowIndex}`} coordinates={[colIndex, rowIndex]} />;
            })}
          </BoardRow>
        );
      })}
    </BoardContainer>
  );
};

export default Board;
