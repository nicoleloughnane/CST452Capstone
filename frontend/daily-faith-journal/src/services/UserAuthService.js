import store from '../store';

export function isLoggedIn() {
    const token = localStorage.getItem('token');
    return token != null;
}

export function login() {
    const token = {
        email : 'ndlock@gmail.com'
    }
    setToken(token);
}


function setToken(token) {
    localStorage.setItem('token', JSON.stringify(token));
    store.dispatch('authenticateUser');
}


export function getEmail() {
 return 'ndlock@gmail.com'
}

export function getUserId() {
  return '123'
}

