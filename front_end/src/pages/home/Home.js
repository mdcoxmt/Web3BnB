import React, { useEffect } from 'react'
import './Home.scss'

import SearchBar from '../../components/common/search-bar/SearchBar'
import ConnectWallet from '../../components/common/connect-wallet/ConnectWallet'


import { ethers } from "ethers";

import imgRentalCabin from '../../assets/rental_cabin.jpg';

const Home = ({connectWallet, selectedAddress}) => {

  return (
    <>
      <p className="site-default">
        <span className="title-in-paragraph">Web3BnB</span>
        . Bookings on the blockchain.
      </p>

      <SearchBar />

      <ConnectWallet connectWallet={connectWallet} selectedAddress={selectedAddress}/>

      {/* <RenderWalletMode connectWallet={connectWallet} selectedAddress={selectedAddress} /> */}
      
      <section className="rental-properties-examples">
        <p className="site-default">
        Here's one of our beautiful properties...
        </p>
      </section>

      <img className="web3bnb-rental-cabin-photo" alt="web3bnb-rental-cabin" src={imgRentalCabin} />
  </>
  )
}

export default Home