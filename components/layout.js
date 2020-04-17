import { LayoutContainer, Title, GlobalStyle } from './layout.style';
import Settings from './settings';
import Status from './status';

export default ({ children, title = 'Minesweeper' }) => (
  <LayoutContainer>
    <GlobalStyle />
    <Title>{title}</Title>
    <Status />
    {children}
    <Settings />
  </LayoutContainer>
);
