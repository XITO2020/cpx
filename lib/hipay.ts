import axios from 'axios';

if (!process.env.HIPAY_API_KEY) {
  throw new Error('HIPAY_API_KEY is not defined');
}

const hipayClient = axios.create({
  baseURL: 'https://api.hipay.com',
  headers: {
    Authorization: `Bearer ${process.env.HIPAY_API_KEY}`,
    'Content-Type': 'application/json',
  },
});

export default hipayClient;