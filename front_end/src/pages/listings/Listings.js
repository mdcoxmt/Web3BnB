import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons"
import { NavLink } from "react-router-dom"
import './Listings.scss'

import ConnectWallet from '../../components/common/connect-wallet/ConnectWallet';

const Header = ({connectWallet, selectedAddress}) => {

  return (
    <>
      <p className="site-default">
        <span className="title-in-paragraph">Listings </span>
          is the place to see a Calendar and Location for our listings...
      </p>
      <ConnectWallet connectWallet={connectWallet} selectedAddress={selectedAddress} />
    </>
  )
}

export default Header