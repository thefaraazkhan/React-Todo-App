import Cookies from 'js-cookie';

const setCookie = (key, value) =>{
    Cookies.set(key,value, {expires: 1});
}

const getCookie = (key) =>{
    return Cookies.get(key);
}

const deleteCookie = (key) =>{
    Cookies.remove(key);
}

export {setCookie, getCookie, deleteCookie};