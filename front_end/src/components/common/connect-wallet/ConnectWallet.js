import React from 'react'
import { useEffect, useState } from 'react'

import './ConnectWallet.scss'

function ConnectWallet({connectWallet, selectedAddress}) {

  if (window.ethereum === undefined) {
    return (
      <p>no wallet there mate</p>
    )
  } else if (!selectedAddress) {

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

    return (
      <>
        <button
          className="connect-wallet connect-wallet-disabled"
          onClick={(selectedAddress) => connectWallet(selectedAddress)}
          disabled={true}
        >
            <span className="connect-wallet-text">
                Wallet Successfully
                <span className="button-second-row">Connected</span>
            </span>
        </button>
      </>
    )
  }


}

export default ConnectWallet