import api from './api';

export default {
    isLoggedIn() {
        const token = localStorage.getItem('token');
        return token != null;
    },
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

    signUpUser(user) {
        //console.log("in signup user with password of " + user.password);
        return api().post('/user/register', {
            email: user.email,
            password: user.password,
            firstName: user.firstName,
            lastName: user.lastName
        })
        .then(response => response.data);
    }
}

