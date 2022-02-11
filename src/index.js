/* eslint-disable no-undef */
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

const web3 = new Web3(
  Web3.givenProvider || 'wss://main-light.eth.linkpool.io/ws'
);

window.web3 = web3

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);