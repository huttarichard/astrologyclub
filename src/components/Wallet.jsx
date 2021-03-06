import React, {useContext} from 'react';
import styled from 'styled-components'
import { WalletContext } from '../contexts/walletContext';

const Wrapper = styled.div`
  /* margin-right: 1rem; */
`

const StyledButton = styled.button`
  border: solid 1px #d1a18a;
  background: transparent;
  color: #d1a18a;
  font-family: "Archivo Black", sans-serif;
  font-size: 11px;
  text-transform: uppercase;
  padding: 6px 12px;
  transition: all .3s;
  cursor: pointer;
  &:hover {
    background-color: #d1a18a;
    color: #000;
  }
`

const ConnectedWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`

const NotConnectedWrapper = styled.div`
  text-align: right;
`

const WalletWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-right: 1rem;
  span {
    color: #d1a18a;
    font-size: 10px;
    cursor: default;
  }
`

const MintWrapper = styled.div`
  span {
    color: #d1a18a;
    font-size: 11px;
    font-style: italic;
  }
`

function Wallet({showModal}) {
  const { wallet, isMainnet, connectWallet } = useContext(WalletContext);

  return <Wrapper>
    {wallet && wallet.address ? (
      <ConnectedWrapper>
        <WalletWrapper>
          <span>wallet:</span>
          <span title={wallet.address}>{wallet.address.substring(0, 10)}...</span>
        </WalletWrapper>
        <MintWrapper>
          {isMainnet ? (
            <StyledButton onClick={showModal}>Mint</StyledButton>
          ) : (
            <span>Switch to mainnet</span>
          )}
        </MintWrapper>
      </ConnectedWrapper>
    ) : (
      <NotConnectedWrapper>
        <StyledButton onClick={connectWallet}>Connect Wallet</StyledButton>
      </NotConnectedWrapper>
    )}
  </Wrapper>
}
export default Wallet;