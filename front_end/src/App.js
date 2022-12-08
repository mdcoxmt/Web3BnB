import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { useEffect, useState } from 'react'

import Header from './components/header/Header'

import Home from './pages/home/Home'
import Listings from './pages/listings/Listings'
import About from './pages/about/About'

import './App.scss'
import './pages/pages.scss'

import { ethers } from 'ethers'
import StayNFT from './contracts/Web3BnBStay.json'
import contractAddress from './contracts/contract-address.json'
import Web3Modal from 'web3modal'
import { ABI } from './ABI'
// This is the Hardhat Network id, you might change it in the hardhat.config.js.
// If you are using MetaMask, be sure to change the Network id to 1337.
// Here's a list of network ids https://docs.metamask.io/guide/ethereum-provider.html#properties
// to use when deploying to other networks.
const HARDHAT_NETWORK_ID = '31337'
const ERROR_CODE_TX_REJECTED_BY_USER = 4001

// This functional dapp component is in charge of doing these things:
//   1. It connects to the user's wallet
//   2. Initializes ethers and the Token contract
//   3. Polls the user's Stays/Listings to keep it updated
//   4. Renders the whole application
function App() {
  const [wallet, setWallet] = useState('')
  console.log('🚀 ~ file: App.js:32 ~ App ~ wallet', wallet)
  const [signer, setSigner] = useState(null)
  const [provider, setProvider] = useState(null)
  const [contract, setContract] = useState(null)
  console.log('🚀 ~ file: App.js:36 ~ App ~ contract', contract)
  const [selectedAddress, setSelectedAddress] = useState(undefined)
  const [networkError, setNetworkError] = useState(undefined)

  const connectWallet = async () => {
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()
    const address = await signer.getAddress()
    setWallet(address)
    localStorage.setItem('currentAccountLocalStorage', address)
    setProvider(provider)
    setSigner(signer)
    let contract = new ethers.Contract(
      '0xfDD2ca57Bb229ba61c1f953BdDFE82e9555B59ab',
      ABI,
      signer,
    )
    setContract(contract)
  }

  const getAll = async () => {
    const res = await contract.getAllProperties()
    console.log('🚀 ~ file: App.js:60 ~ getAll ~ res', res)
  }

  return (
    <Router>
      <div className="App Dapp site-wrapper">
        {/* <BurgerMenu /> */}
        <Header />
        <button onClick={getAll}>getAll</button>
        <main>
          <div className="bg-wrapper"></div>
          <div className={`main-content-wrapper main-content-wrapper-page-`}>
            <Routes>
              <Route
                path="/"
                exact
                element={
                  <Home
                    connectWallet={connectWallet}
                    selectedAddress={selectedAddress}
                  />
                }
              />
              <Route
                path="/listings"
                exact
                element={
                  <Listings
                    connectWallet={connectWallet}
                    selectedAddress={selectedAddress}
                  />
                }
              />
              <Route path="/about" exact element={<About />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  )

  // This method checks if Metamask selected network is Localhost:8545
  function _checkNetwork() {
    if (window.ethereum.networkVersion === HARDHAT_NETWORK_ID) {
      return true
    }

    setNetworkError({
      networkError: 'Please connect Metamask to Localhost:8545',
    })

    return false
  }

  async function _initializeEthers() {
    // We first initialize ethers by creating a provider using window.ethereum
    const provider = new ethers.providers.Web3Provider(window.ethereum)

    // Then, we initialize the contract using that provider and using (ex: our token contract, another contract, etc)
    this._token = new ethers.Contract(
      contractAddress.Token,
      StayNFT.abi,
      provider.getSigner(0),
    )
  }

  function _initialize(userAddress) {
    // This method initializes the dapp

    // We first store the user's address in the component's state
    setSelectedAddress({ selectedAddress: userAddress })

    // Then, initialize ethers... do what we need for our Dapp (fetch token data, start polling user balance etc)

    // Fetching the token data and the user's balance are specific to this
    // sample project, but you can reuse the same initialization pattern.
    _initializeEthers()
    this._getTokenData()
    this._startPollingData()
  }

  // async function connectWallet() {
  //   console.log('🚀 ~ file: App.js:91 ~ connectWallet ~ connectWallet')

  //   // To connect to the user's wallet, we have to run this method.
  //   // It returns a promise that will resolve to the user's address.

  //   const [selectedAddress] = await window.ethereum.request({
  //     method: 'eth_requestAccounts',
  //   })

  //   // Once we have the address, initialize app
  //   // First, check the network
  //   if (!_checkNetwork()) {
  //     return
  //   }

  //   _initialize(selectedAddress)

  //   // Reinitialize when user changes their account
  //   window.ethereum.on('accountsChanged', ([newAddress]) => {
  //     this._stopPollingData()
  //     // `accountsChanged` event can be triggered with an undefined newAddress.
  //     // This happens when the user removes the Dapp from the "Connected
  //     // list of sites allowed access to your addresses" (Metamask > Settings > Connections)
  //     // To avoid errors, we reset the dapp state
  //     if (newAddress === undefined) {
  //       return this._resetState()
  //     }

  //     this._initialize(newAddress)
  //   })

  //   // We reset the dapp state if the network is changed
  //   window.ethereum.on('chainChanged', ([networkId]) => {
  //     this._stopPollingData()
  //     this._resetState()
  //   })
  // }
}

export default App
