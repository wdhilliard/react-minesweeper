import styled from 'styled-components';

export const SquareContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin:1px;
  width: 30px;
  height: 30px;
  border-radius: 3px;
  background-color: ${(props) => (props.showSquare ? '#FFFFFF' : '#DDDDDD')};
  font-weight: bold;
  color: ${(props) => {
      switch (props.value) {
        case 1:
          return 'blue';
        case 2:
          return 'green';
        case 3:
          return 'red';
          case 4:
          return 'purple';
          case 5:
          return 'black';
          case 6:
          return 'turquoise';
          case 7:
          return 'black';
          case 8:
          return 'gray';
        default:
          return 'black';
      }
  }};
  
  svg {
    height: 20px;
    width: auto;
  }
`;
