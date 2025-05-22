import { TezosToolkit } from '@taquito/taquito';
import { BeaconWallet } from '@taquito/beacon-wallet';

if (!process.env.TEZOS_WALLET_ADDRESS) {
  throw new Error('Tezos wallet address is not defined');
}

const MERCHANT_ADDRESS = process.env.TEZOS_WALLET_ADDRESS;
const Tezos = new TezosToolkit('https://mainnet.api.tez.ie');
const wallet = new BeaconWallet({ name: 'Conspix' });

Tezos.setWalletProvider(wallet);

export async function createTezosPayment(amount: number) {
  try {
    const reference = Array.from(crypto.getRandomValues(new Uint8Array(32)))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');

    return {
      recipient: MERCHANT_ADDRESS,
      amount,
      reference,
      label: 'Conspix Subscription',
      message: 'Thanks for subscribing to Conspix!',
    };
  } catch (error) {
    console.error('Tezos payment creation error:', error);
    throw error;
  }
}

export async function checkTezosPayment(
  reference: string,
  expectedAmount: number,
  senderAddress: string
) {
  try {
    const operations = await Tezos.rpc.getOperations();
    const matchingOperation = operations.find(op => 
      op.contents?.some(content =>
        content.kind === 'transaction' &&
        content.source === senderAddress &&
        content.destination === MERCHANT_ADDRESS &&
        content.amount === expectedAmount.toString()
      )
    );

    return !!matchingOperation;
  } catch (error) {
    console.error('Tezos payment check error:', error);
    throw error;
  }
}