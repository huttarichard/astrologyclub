import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components'
import { WalletContext } from '../contexts/walletContext';
import Ethereum from './Ethereum'
import Close from './Close'

const ModalBase = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  padding: 0 2rem;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, .1);
`

const ModalWrapper = styled.div`
  position: relative;
  max-width: 400px;
  padding: 3rem 3rem 2rem 3rem;
  background-color: #000;
  
  h2 {
    margin: 0 0 2rem;
    text-align: center;
    font-family: "Archivo Black", sans-serif;
    color: #d1a18a;
    font-size: 3rem;
  }
`

const ModalClose = styled.button`
  position: absolute;
  top: 2rem;
  right: 2rem;
  background: none;
  border: 0;
  margin: 0;
  padding: 0;
  cursor: pointer;
`

const ModalForm = styled.form`
  color: #fff;

  label {
    display: flex;
    flex-direction: column;
    margin-bottom: 8px;

    span {
      display: inline-block;
      text-align: center;
      margin-bottom: 1rem;
    }

    input {
      width: 100%;
      box-sizing: border-box;
      padding: 4px 12px;
    }
  }

  p {
    margin: 0;
    min-height: 18px;
  }
`

const MintData = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;

  > div {

    &:first-child {
      display: flex;
      align-items: center;

      svg {
        display: block;
        width: 1.3rem;
        height: auto;
        margin-right: 0.5rem;
      }

      span {
        font-size: 14px;
      }
    }

    &:last-child {
      span {
        font-size: 14px;
      }
    }
  }
`

const StyledButton = styled.button`
  width: 100%;
  border: solid 1px #d1a18a;
  background: transparent;
  color: #d1a18a;
  font-family: "Archivo Black", sans-serif;
  text-transform: uppercase;
  padding: 12px 24px;
  font-size: 20px;
  margin-bottom: 1rem;
  transition: all .3s;
  cursor: pointer;
  &:hover {
    background-color: #d1a18a;
    color: #000;
  }
  &:disabled {
    background-color: #d1a18a;
    color: #000;
    opacity: 0.7;
    cursor: not-allowed;
  }
`

function MintModal({show, handleClose}) {
  const [quantity, setQuantity] = useState(1);
  const [disabled, setDisabled] = useState(false);
  const [message, setMessage] = useState('');
  const [limit, setLimit] = useState(0)
  const { wallet } = useContext(WalletContext);

  useEffect(() => {
    const checkPublicState = async () => {
      const publicState = await wallet.getPublicState()

      if (!publicState) {
        setDisabled(true)

        setMessage('Minting disabled. Come back later.')
      }
    }

    const checkLimit = async () => {
      const limitPerWallet = await wallet.getLimitPerWallet()
      const amountMinted = await wallet.getAmountMinted()

      if (limitPerWallet > amountMinted) {
        setLimit(limitPerWallet - amountMinted)
      } else {
        setDisabled(true)

        setMessage(`You reached the limit of ${limitPerWallet} per wallet`)
      }
    }

    if (!wallet) {
      return
    }

    checkPublicState()
    checkLimit()
  },[wallet])

  const handleSubmit = async (e) => {
    e.preventDefault();

    setDisabled(true);
    setMessage('minting...');

    if (quantity < 1 || quantity > 30) {
      setMessage('Please select quantity between 1 and 30.');
      setDisabled(false);

      return;
    }

    try {
      const res = await wallet.mint(quantity);
      if (res.status) {
        setMessage('Congrats, minting process completed!');
      } else {
        console.log(res);
        setMessage('Something went wrong, try again later.');
      }
    } catch (e) {
      console.log(e);

      setMessage('Something went wrong, try again later.');
    }

    setDisabled(false);
  };

  if (show) {
    return (
    <ModalBase onClick={handleClose}>
      <ModalWrapper onClick={e => e.stopPropagation()}>
        <ModalClose>
          <Close onClick={handleClose} />
        </ModalClose>
        <h2>Mint</h2>
        <ModalForm onSubmit={handleSubmit}>
          <label>
            <span>Connect with you zodiac tribe. Discover and meet astrology lovers and enthusiasts  from all over the world.</span>
            <input
              type="number"
              value={quantity}
              min="1"
              max={limit}
              step="1"
              onChange={(e) => setQuantity(e.target.value)}
              required
            />
          </label>
          <MintData>
            <div>
              <Ethereum />
              <span>0.1 ETH</span>
            </div>
            <div>
              <span>Maximum amount: {limit}</span>
            </div>
          </MintData>
          <StyledButton disabled={disabled}>Mint</StyledButton>
          <p>{message}</p>
        </ModalForm>
      </ModalWrapper>
    </ModalBase>
    )
  } else {
    return<></>
  }
}

export default MintModal;