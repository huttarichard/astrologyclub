import React, { useState } from 'react';
import { ContractContextProvider } from './contexts/contractContext.jsx';
import { WalletContextProvider } from './contexts/walletContext.jsx';
import Wallet from './components/Wallet';
import MintModal from './components/MintModal';

function App(){
  const [showModal, setShowModal] = useState(true)

  return (
    <ContractContextProvider>
      <WalletContextProvider>
          <Wallet showModal={() => setShowModal(true)} />
          <MintModal show={showModal} handleClose={() => setShowModal(false)} />
      </WalletContextProvider>
    </ContractContextProvider>
  )
}
export default App;