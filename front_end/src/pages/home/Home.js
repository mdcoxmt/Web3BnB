import React, { useEffect } from 'react'
import './Home.scss'

import SearchBar from '../../components/common/search-bar/SearchBar'
import ConnectWallet from '../../components/common/connect-wallet/ConnectWallet'
import Listings from '../../components/common/listings/Listings'


import { ethers } from "ethers";

const Home = ({connectWallet, selectedAddress}) => {

  const listingsArrayMock = [0, 1, 2, 3, 4, 5, 6];


  return (
    <>
      <p className="site-default">
        <span className="title-in-paragraph">Web3BnB</span>
        . Bookings on the blockchain.
      </p>

      <SearchBar />

      <ConnectWallet connectWallet={connectWallet} selectedAddress={selectedAddress}/>

      <Listings listingsArray={listingsArrayMock} />

      {/* <RenderWalletMode connectWallet={connectWallet} selectedAddress={selectedAddress} /> */}

  </>
  )
}

export default Home