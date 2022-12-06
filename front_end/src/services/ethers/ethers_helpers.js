export async function connectWallet() {
    // To connect to the user's wallet, we have to run this method.
    // It returns a promise that will resolve to the user's address.

    const [selectedAddress] = await window.ethereum.request({ method: 'eth_requestAccounts' });

    console.log('selectedAddress:', selectedAddress)

    // Once we have the address, initialize app
    // First, check the network
    if (!_checkNetwork()) {
      return;
    }

    _initialize(selectedAddress);

    // Reinitialize when user changes their account
    window.ethereum.on("accountsChanged", ([newAddress]) => {
      this._stopPollingData();
      // `accountsChanged` event can be triggered with an undefined newAddress.
      // This happens when the user removes the Dapp from the "Connected
      // list of sites allowed access to your addresses" (Metamask > Settings > Connections)
      // To avoid errors, we reset the dapp state 
      if (newAddress === undefined) {
        return this._resetState();
      }
      
      this._initialize(newAddress);
    });
    
    // We reset the dapp state if the network is changed
    window.ethereum.on("chainChanged", ([networkId]) => {
      this._stopPollingData();
      this._resetState();
    });
}