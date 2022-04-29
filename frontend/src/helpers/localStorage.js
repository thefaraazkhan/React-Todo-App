const setLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value))
}

const getLocalStorage = (key) =>{

    const admin = localStorage.getItem(key)    
    return JSON.parse(admin)
   
}

const deleteLocalStorage = (key) =>{
    localStorage.removeItem(key)
}

module.exports = {setLocalStorage, getLocalStorage, deleteLocalStorage};