require('dotenv').config();
// const dev = process.env.NODE_ENV !== 'production';
const dev = true;

export const backendUrl = dev
  ? 'http://localhost:3000'
  : 'https://local-shopping-app.vercel.app';

export const API_URL = dev
  ? 'http://localhost:8000'
  : 'https://localshopping.azurewebsites.net';
