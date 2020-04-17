export const MINE = 'MINE';
export const FLAG = 'FLAG';
export const GAME_OVER = 'GAME_OVER';
export const IN_PROGRESS = 'IN_PROGRESS';
export const WIN = 'WIN';

export const arrayIncludes = (array, item) => {
  for (var i = 0; i < array.length; i++) {
    // This if statement depends on the format of your array
    if (array[i][0] == item[0] && array[i][1] == item[1]) {
      return true; // Found it
    }
  }
  return false; // Not found
};

function arraysIdentical(arr1, arr2) {
  var i = arr1.length;
  if (i !== arr2.length) {
    return false;
  }
  while (i--) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }
  return true;
}

export const indexOfArray = (arr, val) => {
  for (var i = 0, len = arr.length; i < len; ++i) {
    if (i in arr && arraysIdentical(arr[i], val)) {
      return i;
    }
  }
  return -1;
};

// generates jagged array of height x width with null values
export const createBoard = (width, height) => {
  return [...Array(height)].map((e) => Array(width).fill(null));
};

export const getRange = (index, max) => {
  let range = [];
  range.push(index);
  if (index - 1 >= 0) {
    range.push(index - 1);
  }
  if (index + 1 <= max - 1) {
    range.push(index + 1);
  }
  return range;
};

export const getNeighborCount = (
  board,
  colIndex,
  rowIndex,
  maxWidth,
  maxHeight
) => {
  let rowRange = getRange(rowIndex, maxHeight);
  let colRange = getRange(colIndex, maxWidth);
  let count = 0;

  rowRange.forEach((y) => {
    colRange.forEach((x) => {
      if (board[y][x] === MINE) {
        count++;
      }
    });
  });

  return count;
};

export const replaceMinesWithFlags = (board) => {
  let newBoard = board;
  newBoard.forEach((row,rowIndex) => {
    row.forEach((cell,colIndex) => {
      if (cell == MINE) {
        newBoard[rowIndex][colIndex] = FLAG;
      }
    });
  });
  return newBoard;
};
