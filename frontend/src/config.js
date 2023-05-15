if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const dev = process.env.NODE_ENV !== 'production';
console.log(dev);

export const backendUrl = dev
  ? 'http://localhost:3000'
  : 'https://swapify-tau.vercel.app';

export const API_URL = dev
  ? 'http://localhost:8000'
  : 'https://swapify-backend.onrender.com';
