import React, { useEffect, useState } from 'react';
import './Header.css';

function Header() {
  const [currentAccount, setCurrentAccount] = useState('');

  async function handleConnectButtonClick() {
    try {
      if (currentAccount) {
        // Do nothing if already connected
        return;
      } else {
        // Connect to Metamask
      
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        console.log('Connected to Metamask wallet:', accounts[0]);
        setCurrentAccount(accounts[0]);
      // Add your code to interact with the user's wallet here
      }
    } catch (error) {
      console.error('Failed to connect to Metamask wallet:', error);
    }
  }
  
  useEffect(() => {
    
    async function findMetaMaskAccount() {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts.length !== 0) {
          console.log('Found an authorized account:', accounts[0]);
          setCurrentAccount(accounts[0]);
        } else {
          console.error('No authorized account found');
        }
      } catch (error) {
        console.error(error);
      }
    }

    findMetaMaskAccount();

    // Listen for Metamask events that indicate the user has disconnected
    window.ethereum.on('accountsChanged', (accounts) => {
      if (accounts.length === 0) {
        setCurrentAccount('');
      }
    });
    window.ethereum.on('disconnect', () => {
      setCurrentAccount('');
    });

    // Cleanup function to remove event listeners
    return () => {
      window.ethereum.removeListener('accountsChanged', () => {});
      window.ethereum.removeListener('disconnect', () => {});
    };
  }, []);

  return (
    <header className="header">
      <h1>GuessIQ</h1>
      {!currentAccount ? (
        <button className="button" id="connect-button" onClick={handleConnectButtonClick}>
          Connect
        </button>
      ) : (
        <button className="button" id="connect-button">
          {currentAccount.slice(0, 6) + '...' + currentAccount.slice(-4)}
        </button>
      )}
    </header>
  );
}

export default Header;
