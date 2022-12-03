//import mutations from './userauthmutations';
//import actions from './userauthactions';
//import getters from './userauthgetters';
import * as auth from '../../../services/UserAuthService.js';

export default {
    state: {
        isLoggedIn: false,
        apiURL: 'http://localhost:3000',
        email: null,
        userId: null
    },
    mutations: {
        authenticateUser(state) {
            state.isLoggedIn = auth.isLoggedIn();
            if(state.isLoggedIn) {
                state.email = auth.getEmail();
                state.userId = auth.getUserId();
            } else {
                state.email = null;
                state.userId = null;
            }
        }
    },
    actions: {
        authenticateUser(context) {
            context.commit('authenticateUser');
        }
    },

}

