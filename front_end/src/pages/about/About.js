import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons"
import { NavLink } from "react-router-dom"
import './About.scss'

import logo from '../../assets/web3bnb_logo_thin.jpg';

const Header = ({}) => {

  return (
    <>
      <p className="site-default about-p" id="about-p">
        <span className="title-in-paragraph">Web3BnB </span>
        is part of Team 10.
      </p>
      <p className="site-default about-p" id="about-p">
        We have 4 members:
      </p>
      <ul className="about-us-member-list">
        <li>Duncan</li>
        <li>Daré</li>
        <li>WordsPerMinute</li>
        <li>lectrone</li>
      </ul>
    </>
  )
}

export default Header