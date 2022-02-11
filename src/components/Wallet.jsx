import React, {useContext} from 'react';
import styled from 'styled-components'
import { WalletContext } from '../contexts/walletContext';

const Wrapper = styled.div`
  color: #fff;
`

function Wallet() {
  const { wallet, connectWallet } = useContext(WalletContext);

  return <Wrapper>
    {wallet && wallet.address}
    <button onClick={connectWallet}>wallet</button>
  </Wrapper>;
}
export default Wallet;