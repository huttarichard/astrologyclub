const contractAddressFromInput = document.getElementById('contract_address').value
const contractAddressFromEnv = process.env.REACT_APP_CONTRACT_ADDRESS

const config = {
  contractAddress: contractAddressFromEnv || contractAddressFromInput,
  chainId: process.env.REACT_APP_CHAIN_ID,
  chainName: process.env.REACT_APP_CHAIN_NAME,
  infuraID: "cbb17e1c9af54ec1b90e007ed4854ffe"
}

export default config