import { MoneroWalletRPC } from 'monero-javascript';

if (!process.env.MONERO_WALLET_RPC_URL || !process.env.MONERO_WALLET_PASSWORD) {
  throw new Error('Monero credentials are not defined');
}

const moneroWallet = new MoneroWalletRPC({
  uri: process.env.MONERO_WALLET_RPC_URL,
  username: 'monero',
  password: process.env.MONERO_WALLET_PASSWORD,
});

export async function createMoneroPayment(amount: number) {
  try {
    const account = await moneroWallet.createAccount();
    const address = await moneroWallet.getAddress(account.index);

    return {
      address,
      amount,
      accountIndex: account.index,
    };
  } catch (error) {
    console.error('Monero payment creation error:', error);
    throw error;
  }
}

export async function checkMoneroPayment(accountIndex: number, expectedAmount: number) {
  try {
    const transfers = await moneroWallet.getTransfers({
      accountIndex,
      in: true,
    });

    const received = transfers.reduce((sum, transfer) => sum + transfer.amount, 0);
    return received >= expectedAmount;
  } catch (error) {
    console.error('Monero payment check error:', error);
    throw error;
  }
}