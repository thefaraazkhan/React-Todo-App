if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const dev = process.env.NODE_ENV !== 'production';
console.log(dev);

export const backendUrl = 'https://swapify-tau.vercel.app/';

export const API_URL = 'https://swapify-backend.onrender.com';
