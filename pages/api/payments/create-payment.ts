// ... existing imports ...

const PLAN_PRICES = {
  basic: {
    // ... existing payment methods ...
    ethereum: {
      amount: 0.01, // ETH amount
    },
    tezos: {
      amount: 10, // XTZ amount
    }
  },
  standard: {
    // ... existing payment methods ...
    ethereum: {
      amount: 0.02,
    },
    tezos: {
      amount: 20,
    }
  },
  premium: {
    // ... existing payment methods ...
    ethereum: {
      amount: 0.05,
    },
    tezos: {
      amount: 50,
    }
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // ... existing code ...

  switch (paymentMethod) {
    // ... existing payment methods ...

    case 'ethereum':
      const ethPayment = await createEthereumPayment(
        PLAN_PRICES[plan].ethereum.amount
      );
      paymentIntent = {
        ...ethPayment,
        provider: 'ethereum',
        plan,
      };
      break;

    case 'tezos':
      const tezosPayment = await createTezosPayment(
        PLAN_PRICES[plan].tezos.amount
      );
      paymentIntent = {
        ...tezosPayment,
        provider: 'tezos',
        plan,
      };
      break;

    default:
      return res.status(400).json({ error: 'Invalid payment method' });
  }

  // ... rest of the code
}