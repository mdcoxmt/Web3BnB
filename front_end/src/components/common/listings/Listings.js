import React from 'react'
import { useEffect, useState } from 'react'

import Listing from '../listing-card/ListingCard'

import './Listings.scss'


import imgRentalCabin from '../../../assets/rental_cabin.jpg';

function Listings({listingsArray}) {

    return (
      <div className="property-listings">
        {listingsArray.map(listing => {
            console.log(listing)
            return (
                <Listing listingNo={listing}/>
            )
        })}
      </div>
    )
}

export default Listings