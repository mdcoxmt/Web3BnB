import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons"
import { NavLink } from "react-router-dom"
import './Create.scss'

import ConnectWallet from '../../components/common/connect-wallet/ConnectWallet';

const Create = ({connectWallet, selectedAddress}) => {

  return (
    <>
      <p className="site-default">
        <span className="title-in-paragraph">Create </span>
          your own Web3BnB Listing using this form:
      </p>
      <ConnectWallet connectWallet={connectWallet} selectedAddress={selectedAddress} />
    </>
  )
}

export default Create