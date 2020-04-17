import { StoreProvider } from '../context/context';

function MinesweeperApp({ Component, pageProps }) {
  return (
    <StoreProvider>
      <Component {...pageProps} />
    </StoreProvider>
  );
}

export default MinesweeperApp;
