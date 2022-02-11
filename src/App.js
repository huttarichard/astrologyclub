import React from 'react';
import { ContractContextProvider } from './contexts/contractContext.jsx';
import { WalletContextProvider } from './contexts/walletContext.jsx';
import Wallet from './components/Wallet';

function App(){
  return (
    <ContractContextProvider>
    <WalletContextProvider>
        <Wallet />
    </WalletContextProvider>
  </ContractContextProvider>
  )
}
export default App;