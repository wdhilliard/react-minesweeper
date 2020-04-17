import {
  arrayIncludes,
  indexOfArray,
  createBoard,
  getRange,
  getNeighborCount,
  replaceMinesWithFlags,
  MINE,
  IN_PROGRESS,
  GAME_OVER,
  WIN
} from './../utility/minesweeper';

export const types = {
  SET_GAME_BOARD: 'SET_GAME_BOARD',
  RESET_GAME_BOARD: 'RESET_GAME_BOARD',
  SET_VISIBLE_SQUARES: 'SHOW_SQUARE',
  SET_GAME_STATUS: 'SET_GAME_STATUS',
  EVALUATE_GAME_STATUS: 'EVALUATE_GAME_STATUS',
  SET_FLAGS: 'SET_FLAGS',
  SET_WIDTH: 'SET_WIDTH',
  SET_NUMBER_OF_MINES: 'SET_NUMBER_OF_MINES',
  SET_HEIGHT: 'SET_HEIGHT'
};

export const setWidth = (value) => (dispatch, getState) => {
  return dispatch({ type: types.SET_WIDTH, payload: value });
};

export const setHeight = (value) => (dispatch, getState) => {
  return dispatch({ type: types.SET_HEIGHT, payload: value });
};

export const setNumberOfMines = (value) => (dispatch, getState) => {
  return dispatch({ type: types.SET_NUMBER_OF_MINES, payload: value });
};

export const resetBoard = () => (dispatch, getState) => {
  const state = getState();
  const { width, height } = state;
  let { numberOfMines } = state;
  const board = createBoard(width, height);

  if (numberOfMines > width * height - 1) {
    numberOfMines = width * height - 1;
  }
  return dispatch({
    type: types.RESET_GAME_BOARD,
    payload: { board, numberOfMines }
  });
};

export const newGame = (colIndex, rowIndex) => (dispatch, getState) => {
  const { width, height, numberOfMines } = getState();
  let board = createBoard(width, height);

  // Set Mines
  let mines = 0;
  while (mines < numberOfMines) {
    //get random mine coordinates
    const x = Math.floor(Math.random() * width);
    const y = Math.floor(Math.random() * height);

    //check that mine does not exist already and dont allow user to lose on first try
    if (board[y][x] !== MINE && !(x == colIndex && y == rowIndex)) {
      board[y][x] = MINE;
      mines++;
    }
  }

  //Set Numbers
  board.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (cell !== MINE) {
        board[y][x] = getNeighborCount(board, x, y, width, height);
      }
    });
  });

  return dispatch({ type: types.SET_GAME_BOARD, payload: board });
};

export const flagMine = (colIndex, rowIndex) => (dispatch, getState) => {
  const { flaggedSquares } = getState();
  const coordinates = [colIndex, rowIndex];
  const flagIndex = indexOfArray(flaggedSquares, coordinates);

  if (flagIndex !== -1) {
    const newFlags = [...flaggedSquares];
    newFlags.splice(flagIndex, 1);
    return dispatch({
      type: types.SET_FLAGS,
      payload: newFlags
    });
  }

  return dispatch({
    type: types.SET_FLAGS,
    payload: [...flaggedSquares, coordinates]
  });
};

export const revealSquare = (colIndex, rowIndex) => (dispatch, getState) => {
  const { board, width, height, visibleSquares } = getState();
  let newSquares = [];

  const checkSquares = (colIndex, rowIndex) => {
    //if square has already been clicked, exit
    if (arrayIncludes(visibleSquares, [colIndex, rowIndex])) {
      return;
    }
    newSquares.push([colIndex, rowIndex]);
    //if square is not 0, end search
    if (board[rowIndex][colIndex] !== 0) {
      return;
    }
    //get neighbors
    const rowRange = getRange(rowIndex, height);
    const colRange = getRange(colIndex, width);

    rowRange.forEach((y) => {
      colRange.forEach((x) => {
        const value = board[y][x];
        const coordinates = [x, y];
        //if square has been checked, dont continue
        if (
          !arrayIncludes(newSquares, coordinates) &&
          !arrayIncludes(visibleSquares, coordinates)
        ) {
          //if square is 0, and not the current square, check it's neighbors
          if (value === 0 && !(x == colIndex && y == rowIndex)) {
            checkSquares(x, y);
          }
          //else add the square to clicked squares
          if (value !== MINE) {
            newSquares = [...newSquares, coordinates];
          }
        }
      });
    });
  };
  checkSquares(colIndex, rowIndex);

  const newList = [...visibleSquares, ...newSquares];
  const filteredList = newList.filter((a, b) => indexOfArray(newList, a) === b);

  return dispatch({
    type: types.SET_VISIBLE_SQUARES,
    payload: filteredList
  });
};

export const gameOver = () => (dispatch, getState) => {
  return dispatch({
    type: types.SET_GAME_STATUS,
    payload: GAME_OVER
  });
};

export const evaluateStatus = () => (dispatch, getState) => {
  const state = getState();
  const { numberOfMines, width, height, visibleSquares } = state;
  let { board } = state;
  let status = IN_PROGRESS;

  if (width * height - visibleSquares.length <= numberOfMines) {
    status = WIN;
    board = replaceMinesWithFlags(board);
  }

  return dispatch({
    type: types.EVALUATE_GAME_STATUS,
    payload: { status, board }
  });
};
