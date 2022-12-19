import api from './api';

export default {
    //login the user, utilize axios to send a POST
    loginUser(user) {
        return api().post('/user/login', {
            email: user.email,
            password: user.password
        })
        .then(response => {
            if(response.data.accessToken) {
                localStorage.setItem('user', JSON.stringify(response.data))
                console.log("response data" +response.data);
            }
            return response.data;
        })
     
    },
    //logout a user, remove from local storage
    logoutUser() {
        localStorage.removeItem('user');
    },

    //register a new user
    signUpUser(user) {
        return api().post('/user/register', {
            email: user.email,
            password: user.password,
            firstName: user.firstName,
            lastName: user.lastName
        })
        .then(response => response.data);
    }
}

