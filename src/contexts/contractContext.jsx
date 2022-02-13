import React from 'react';
import { createContext, useState } from 'react';
import { abi } from '../contracts/AstrologyClub.json';

const mainContractAddress = document.getElementById('contract_address').value

export const ContractContext = createContext({
  contract: null,
  setContract: () => {},
});

export function ContractContextProvider({ children }) {
  const [contract, setContract] = useState(
    new window.web3.eth.Contract(abi, mainContractAddress)
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
