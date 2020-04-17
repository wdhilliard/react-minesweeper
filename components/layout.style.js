import styled, { createGlobalStyle } from 'styled-components';

export const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Title = styled.h1`
  font-size: 32px;

  margin:5px 0px;
  text-transform: uppercase;
  color: #ffffff;
  text-align: center;
`;
export const GlobalStyle = createGlobalStyle`
  html { font-family: 'Open Sans', sans-serif; }

  body {
    display: flex;
    box-sizing: border-box;
    width: 100%;
    height: 100vh;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0px;
    padding: 16px;
    background-color: #111111;
  }
`;
