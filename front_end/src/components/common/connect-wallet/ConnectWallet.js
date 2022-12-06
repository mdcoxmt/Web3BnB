import React from 'react'
import './ConnectWallet.scss'

function ConnectWallet({connectWallet}) {
    

  return (
    <>
      <button
        className="connect-wallet"
        onClick={() => connectWallet()}
      >
          <span className="connect-wallet-text">
              Connect
              <span className="button-second-row">Wallet</span>
          </span>
      </button>
    </>
  )
}

export default ConnectWallet