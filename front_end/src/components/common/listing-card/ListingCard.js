import React from 'react'
import { useEffect, useState } from 'react'

import './ListingCard.scss'

import imgSrc from '../../../assets/rental_cabin.jpg';

function Listing({listingNo}) {

    return (
      <>
        <div className="listing-card">
            <div className="listing-card-header">
                <h2>Property No {listingNo}</h2>
            </div>
             <img className="web3bnb-rental-property-photo" alt="web3bnb-rental-property photo" src={imgSrc} />

            <p className="listing-card-desc">Description of the property...</p>
        </div>
      </>
    )
}

export default Listing