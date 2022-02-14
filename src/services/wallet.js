import Web3Modal from 'web3modal';
import WalletConnectProvider from "@walletconnect/web3-provider";
// import { abi } from '../contracts/AstrologyClub.json'
import config from '../config';

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: config.infuraID,
    }
  }
};

class Wallet {
  constructor(provider, modal, contract) {
    this.modal = modal;
    this.provider = provider;
    this.contract = contract;
  }

  static async Connect(contract) {
    const modal = new Web3Modal({
      network: config.chainName,
      cacheProvider: true,
      providerOptions,
      theme: "dark"
    });

    const provider = await modal.connect();

    window.web3.setProvider(provider);

    return new Wallet(provider, modal, contract);
  }

  // returns eth balance
  async balance() {
    let data = await window.web3.eth.getBalance(this.address);
    return window.web3.utils.fromWei(data);
  }

  async getAmountMinted() {
    return this.contract.methods.balanceOf(this.address).call();
  }

  get address() {
    return this.provider.selectedAddress;
  }

  // async deploy() {
  //   const newContract = new window.web3.eth.Contract(abi);
  //   const hash = newContract
  //     .deploy({
  //       data: bytecode,
  //     })
  //     .send({
  //       from: this.address,
  //     });

  //   return hash;
  // }

  async getPublicState() {
    return this.contract.methods.publicState().call();
  }

  async getLimitPerWallet() {
    return this.contract.methods.limitPerWallet().call();
  }

  async mint(quantity) {
    const call = this.contract.methods.mint(quantity);

    const quantityBN = new window.web3.utils.BN(quantity)
    const priceBN = new window.web3.utils.BN('100000000000000000')

    const value = quantityBN.mul(priceBN).toString()

    const transactionObject = {
      from: this.address,
      to: this.contract._address,
      data: call.encodeABI(),
      value: value,
    }

    // this.contract.methods.mint(quantity).send({
    //   from: this.address,
    // });

    return window.web3.eth.sendTransaction(transactionObject);
  }

  disconnect() {
    this.modal.clearCachedProvider();
  }
}

export default Wallet;
