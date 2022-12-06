import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons"
import { NavLink } from "react-router-dom"
import './Listings.scss'

import logo from '../../assets/web3bnb_logo_thin.jpg';

const Header = ({}) => {

  return (
    <p className="site-default">
    <span className="title-in-paragraph">Listings </span>
      is the place to see a Calendar and Location for our listings...
  </p>
  )
}

export default Header