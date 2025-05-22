import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { motion } from 'framer-motion';
import { FaMonero, FaEthereum } from 'react-icons/fa';
import { SiSolana, SiTezos } from 'react-icons/si';

const CryptoLogin: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleEthereumLogin = async () => {
    try {
      setIsLoading(true);
      setError('');

      if (!window.ethereum) {
        throw new Error('Please install MetaMask');
      }

      // Request account access
      const accounts = await window.ethereum.request({ 
        method: 'eth_requestAccounts' 
      });
      const address = accounts[0];

      // Sign message
      const message = 'Login to Conspix';
      const signature = await window.ethereum.request({
        method: 'personal_sign',
        params: [message, address],
      });

      // Sign in with NextAuth
      const result = await signIn('ethereum', {
        address,
        signature,
        redirect: false,
      });

      if (result?.error) {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error('Ethereum login error:', error);
      setError(error instanceof Error ? error.message : 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleTezosLogin = async () => {
    try {
      setIsLoading(true);
      setError('');

      const { BeaconWallet } = await import('@taquito/beacon-wallet');
      const wallet = new BeaconWallet({ name: 'Conspix' });

      // Request permission
      await wallet.requestPermissions();
      const userAddress = await wallet.getPKH();

      // Sign payload
      const bytes = '05' + Buffer.from('Login to Conspix').toString('hex');
      const signature = await wallet.client.requestSignPayload({ signingType: 'micheline', payload: bytes });

      // Sign in with NextAuth
      const result = await signIn('tezos', {
        address: userAddress,
        signature: signature.signature,
        redirect: false,
      });

      if (result?.error) {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error('Tezos login error:', error);
      setError(error instanceof Error ? error.message : 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  // ... existing Solana and Monero handlers ...

  return (
    <div className="space-y-4">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleEthereumLogin}
        disabled={isLoading}
        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white p-3 rounded-lg hover:opacity-90 disabled:opacity-50"
      >
        <FaEthereum size={20} />
        Connect with MetaMask
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleTezosLogin}
        disabled={isLoading}
        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-400 to-cyan-500 text-white p-3 rounded-lg hover:opacity-90 disabled:opacity-50"
      >
        <SiTezos size={20} />
        Connect with Tezos
      </motion.button>

      {/* Existing Solana and Monero buttons */}

      {error && (
        <p className="text-red-500 text-sm text-center">{error}</p>
      )}
    </div>
  );
};