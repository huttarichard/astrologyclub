import React from 'react';
import { createContext, useState } from 'react';
import { abi } from '../contracts/AstrologyClub.json';
import config from '../config'

export const ContractContext = createContext({
  contract: null,
  setContract: () => {},
});

export function ContractContextProvider({ children }) {
  const [contract, setContract] = useState(
    new window.web3.eth.Contract(abi, config.contractAddress)
  );

  const value = {
    contract,
    setContract,
  };

  return (
    <ContractContext.Provider value={value}>
      {children}
    </ContractContext.Provider>
  );
}
