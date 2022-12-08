import React, { useEffect } from 'react'
import './Home.scss'

import SearchBar from '../../components/common/search-bar/SearchBar'
import ConnectWallet from '../../components/common/connect-wallet/ConnectWallet';

import imgRentalCabin from '../../assets/rental_cabin.jpg';

const Home = ({connectWallet, selectedAddress, stayToken}) => {

  console.log('stayToken2:', stayToken)

  const RenderMint = () => {

    if (window.ethereum && selectedAddress) {
      const PROPERTY_URI = "DUMMY_PROPERTY_URI"
      const stayDate = "1262022"



      // stayToken.mintStay(PROPERTY_URI, 2, 5, stayDate, {value:"10"}).then(response => {
      //   console.log('mintStay response:', response)
      // })

      return (
        <>
          <p>wallet connected woooooo</p>
        </>
      )
    }
  }

  return (
    <>
      <p className="site-default">
        <span className="title-in-paragraph">Web3BnB</span>
        . Bookings on the blockchain.
      </p>

      <SearchBar />

      <ConnectWallet connectWallet={connectWallet} selectedAddress={selectedAddress}/>

      {/* <RenderMint /> */}

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