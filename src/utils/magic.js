// utils/magic.js

import { Magic } from 'magic-sdk';
// import { EthereumAuthProvider } from '@magic-sdk/provider';
import { ethers } from 'ethers';
import { OAuthExtension } from '@magic-ext/oauth';

// Initialize Magic with your Magic publishable key
const   magic = new Magic('pk_live_773A61B5424F8C7D', {
  extensions: [new OAuthExtension()],
  network: 'mainnet',
});

// Create a Web3 provider using Magic's Ethereum provider
const provider = new ethers.providers.Web3Provider(magic.rpcProvider);

export { magic, provider };
