import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons"
import { NavLink } from "react-router-dom"
import './About.scss'

import logo from '../../assets/web3bnb_logo_thin.jpg';

const Header = ({}) => {

  return (
    <>
      <p className="site-default">
        <span className="title-in-paragraph">Web3BnB </span>
        is part of Team 10. We have 4 members:
      </p>
    </>
  )
}

export default Header