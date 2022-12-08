import React from 'react'
import { useEffect, useState } from 'react'

import './ConnectWallet.scss'

function ConnectWallet({connectWallet, selectedAddress}) {

  if (window.ethereum === undefined) {
    console.log('no wallet')
    return (
      <p>no wallet there mate</p>
    )
  } else if (!selectedAddress) {
    console.log('not connected')

    return (
      <>
        <button
          className="connect-wallet"
          onClick={(selectedAddress) => connectWallet(selectedAddress)}
        >
            <span className="connect-wallet-text">
                Connect
                <span className="button-second-row">Wallet</span>
            </span>
        </button>
      </>
    )
  } else {
    console.log('wallet connected')

    return (
      <p>good to go connected mate</p>
    )
  }


}

export default ConnectWallet