import React, { useEffect } from 'react'
import './Home.scss'

import SearchBar from '../../components/common/search-bar/SearchBar'

import imgRentalCabin from '../../assets/rental_cabin.jpg';

const Main = ({}) => {

  return (
    <>
      <p className="site-default">
        <span className="title-in-paragraph">Web3BnB</span>
        . Bookings on the blockchain.
      </p>

      <SearchBar />
      
      <section className="rental-properties-examples">
        <p className="site-default">
        Here's one of our beautiful properties...
        </p>
      </section>

      <img className="web3bnb-rental-cabin-photo" alt="web3bnb-rental-cabin" src={imgRentalCabin} />
    </>
  )
}

export default Main