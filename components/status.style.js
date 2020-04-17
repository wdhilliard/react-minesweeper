import styled from 'styled-components';
import { GAME_OVER, WIN } from './../utility/minesweeper';

export const StatusContainer = styled.div`
  display: flex;
`;
export const StatusText = styled.span`
  width: 100%;
  margin-bottom: 5px;
  text-align: center;
  color: ${(props) => {
    switch (props.status) {
      case GAME_OVER:
        return 'red';
      case WIN:
        return 'green';
      default:
        return 'white';
    }
  }};
`;
