import { Connection, PublicKey, Transaction } from '@solana/web3.js';
import { getAssociatedTokenAddress } from '@solana/spl-token';

if (!process.env.SOLANA_RPC_URL || !process.env.SOLANA_WALLET_PUBKEY) {
  throw new Error('Solana credentials are not defined');
}

const connection = new Connection(process.env.SOLANA_RPC_URL);
const merchantWallet = new PublicKey(process.env.SOLANA_WALLET_PUBKEY);

export async function createSolanaPayment(amount: number) {
  try {
    const reference = new PublicKey(generateReference());

    return {
      recipient: merchantWallet.toString(),
      amount,
      reference: reference.toString(),
      label: 'Conspix Subscription',
      message: 'Thanks for subscribing to Conspix!',
    };
  } catch (error) {
    console.error('Solana payment creation error:', error);
    throw error;
  }
}

export async function checkSolanaPayment(reference: string, expectedAmount: number) {
  try {
    const referencePublicKey = new PublicKey(reference);
    const signatures = await connection.getSignaturesForAddress(referencePublicKey);

    if (signatures.length === 0) return false;

    const transaction = await connection.getTransaction(signatures[0].signature);
    if (!transaction) return false;

    // Verify the transaction amount matches expected amount
    const transferAmount = transaction.meta?.postBalances[0] - transaction.meta?.preBalances[0];
    return transferAmount === expectedAmount;
  } catch (error) {
    console.error('Solana payment check error:', error);
    throw error;
  }
}

function generateReference(): string {
  return Array.from(crypto.getRandomValues(new Uint8Array(32)))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}