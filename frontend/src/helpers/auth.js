import {setCookie, getCookie, deleteCookie} from './cookies';
import { setLocalStorage, getLocalStorage, deleteLocalStorage } from './localStorage';

const setAuthentication = (token, admin) =>{
    setCookie('token', token);
    setLocalStorage('admin', admin);
}

const isAuthenticated = () =>{
    if (getCookie('token') && getLocalStorage('admin')){
        return getLocalStorage('admin');
    }else{
        return false;
    }
}

const adminLogOut = (next) => {
    deleteCookie('token');
    deleteLocalStorage('admin')

    next();
}

export {setAuthentication, isAuthenticated, adminLogOut};