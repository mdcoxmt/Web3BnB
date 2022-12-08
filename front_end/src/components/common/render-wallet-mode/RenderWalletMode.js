import React from 'react'
import { useEffect, useState } from 'react'


import ConnectWallet from '../connect-wallet/ConnectWallet'

function RenderWalletMode({connectWallet, selectedAddress}) {

  console.log('RenderWalletRunning, selectedAddress:',selectedAddress)


    if (window.ethereum === undefined) {
        console.log('no wallet')
        return (
          <p>no wallet there mate</p>
        )
      } else if (!selectedAddress) {
        console.log('not connected')

        return (
          <ConnectWallet connectWallet={connectWallet}/>
        )
      } else {
        console.log('wallet connected')

        return (
          <p>good to go connected mate</p>
        )
      }
}

export default RenderWalletMode