import api from './api';

export default {
    loginUser(userCredentials) {
        return api().post('api/v1/user/login', userCredentials)
        .then(response => response.data);
    },
    register(userCredentials) {
        return api().post('api/v1/user/register', userCredentials)
        .then(response => response.data);
    }
}

