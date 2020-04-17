import React, { useContext } from 'react';
import { StoreContext } from '../context/context.js';
import {
  SettingsContainer,
  Setting,
  Label,
  Input,
  Button
} from './settings.style';
import {
  setWidth,
  setHeight,
  setNumberOfMines,
  resetBoard
} from './../context/actions';

const Settings = () => {
  const { state, dispatch } = useContext(StoreContext);
  const { width, height, numberOfMines } = state;

  const widthChange = (e) => {
    let value = parseInt(e.target.value, 10);
    if (value < 3) {
      value = 3;
    }
    if (value > 40) {
      value = 40;
    }
    dispatch(setWidth(value));
    dispatch(resetBoard());
  };

  const heightChange = (e) => {
    let value = parseInt(e.target.value, 10);
    if (value < 3) {
      value = 3;
    }
    if (value > 25) {
      value = 25;
    }
    dispatch(setHeight(value));
    dispatch(resetBoard());
  };

  const numberOfMinesChange = (e) => {
    let value = parseInt(e.target.value, 10);
    if (value < 1) {
      value = 1;
    }
    if (value > width * height - 1) {
      value = width * height - 1;
    }
    dispatch(setNumberOfMines(value));
    dispatch(resetBoard());
  };

  const resetGame = () => {
    dispatch(resetBoard());
  };
  return (
    <SettingsContainer>
      <Setting>
        <Label htmlFor="mine-count">Number of Mines:</Label>
        <Input
          type="number"
          id="mine-count"
          value={numberOfMines}
          onChange={(e) => numberOfMinesChange(e)}
        />
      </Setting>
      <Setting>
        <Label htmlFor="width">Board Width:</Label>
        <Input
          type="number"
          id="width"
          value={width}
          onChange={(e) => widthChange(e)}
        />
      </Setting>
      <Setting>
        <Label htmlFor="height">Board Height:</Label>
        <Input
          type="number"
          id="height"
          value={height}
          onChange={(e) => heightChange(e)}
        />
      </Setting>
      <Button onClick={resetGame}>New Game</Button>
    </SettingsContainer>
  );
};

export default Settings;
