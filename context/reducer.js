import { types } from './actions';
import { createBoard, IN_PROGRESS } from './../utility/minesweeper';

export const initialState = {
  board: createBoard(10, 10),
  width: 10,
  height: 10,
  numberOfMines: 10,
  visibleSquares: [],
  flaggedSquares: [],
  status: IN_PROGRESS
};

export const reducer = (state, action) => {
  switch (action.type) {
    case types.SET_GAME_BOARD:
      return {
        ...state,
        board: action.payload
      };

    case types.RESET_GAME_BOARD:
      return {
        ...state,
        board: action.payload.board,
        numberOfMines: action.payload.numberOfMines,
        visibleSquares: [],
        flaggedSquares: [],
        status: IN_PROGRESS
      };

    case types.SET_VISIBLE_SQUARES:
      return {
        ...state,
        visibleSquares: action.payload
      };

    case types.SET_GAME_STATUS:
      return {
        ...state,
        status: action.payload
      };

    case types.EVALUATE_GAME_STATUS:
      return {
        ...state,
        status: action.payload.status,
        board: action.payload.board
      };
      
    case types.SET_FLAGS:
      return {
        ...state,
        flaggedSquares: action.payload
      };

    case types.SET_WIDTH:
      return {
        ...state,
        width: action.payload
      };

    case types.SET_NUMBER_OF_MINES:
      return {
        ...state,
        numberOfMines: action.payload
      };

    case types.SET_HEIGHT:
      return {
        ...state,
        height: action.payload
      };

    default:
      throw new Error();
  }
};
