import { ethers } from 'ethers';

if (!process.env.METAMASK_PUBLIC_ADDRESS) {
  throw new Error('MetaMask address is not defined');
}

const MERCHANT_ADDRESS = process.env.METAMASK_PUBLIC_ADDRESS;

export async function createEthereumPayment(amount: number) {
  try {
    // Generate a unique payment reference
    const reference = ethers.hexlify(ethers.randomBytes(32));

    return {
      recipient: MERCHANT_ADDRESS,
      amount: ethers.parseEther(amount.toString()),
      reference,
      label: 'Conspix Subscription',
      message: 'Thanks for subscribing to Conspix!',
    };
  } catch (error) {
    console.error('Ethereum payment creation error:', error);
    throw error;
  }
}

export async function checkEthereumPayment(
  reference: string,
  expectedAmount: string,
  senderAddress: string
) {
  try {
    if (!window.ethereum) {
      throw new Error('MetaMask not installed');
    }

    const provider = new ethers.BrowserProvider(window.ethereum);
    const block = await provider.getBlockNumber();
    const events = await provider.getLogs({
      fromBlock: block - 1000, // Check last 1000 blocks
      toBlock: 'latest',
      address: MERCHANT_ADDRESS,
      topics: [ethers.id('Transfer(address,address,uint256)')],
    });

    const matchingEvent = events.find(event => {
      const decoded = ethers.AbiCoder.defaultAbiCoder().decode(
        ['address', 'address', 'uint256'],
        event.data
      );
      return decoded[0] === senderAddress && 
             decoded[1] === MERCHANT_ADDRESS &&
             decoded[2] === expectedAmount;
    });

    return !!matchingEvent;
  } catch (error) {
    console.error('Ethereum payment check error:', error);
    throw error;
  }
}