if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const dev = process.env.NODE_ENV !== 'production';

export const host = dev
  ? 'http://localhost:8000'
  : 'https://swapify-backend.onrender.com';

console.log(dev);

// export const loginRoute = `${host}/api/auth/login`;
// export const registerRoute = `${host}/api/auth/register`;
// export const logoutRoute = `${host}/api/auth/logout`;
export const allUsersRoute = `${host}/api/auth/allusers`;
export const sendMessageRoute = `${host}/api/messages/addmsg`;
export const recieveMessageRoute = `${host}/api/messages/getmsg`;
// export const setAvatarRoute = `${host}/api/auth/setavatar`;
