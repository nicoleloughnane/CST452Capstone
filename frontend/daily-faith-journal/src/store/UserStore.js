import { createStore } from 'vuex';
import api from '../services/api'

//store starts here
const store = createStore({
    state: {
      isLoggedIn: false,
      user: null,
      token: null,
      errorOccurred: null
    },
    //actions to login, logout, and register a user
    actions: {
      //login 
      login({commit}, user) {
          return api().post('/user/login', {
            email: user.email,
            password: user.password
        })
        .then(response => {
              //set user and token to data from the response
              commit('setUser', response.data.user);
              commit('setToken', response.data.token)
              this.state.isLoggedIn = true;
              return response.data;
        }) 
        .catch(error => {
          commit('errorOccurred', error.message);
        })
      },
      //logout
      logout({commit}) {
        //clear states of the user with mutations
        commit('setUser', null);
        commit('setToken', null);
        this.state.isLoggedIn = false;
      },

      //register 
      register({commit}, user) {
        return api().post('/user/register', {
          email: user.email,
          password: user.password,
          firstName: user.firstName,
          lastName: user.lastName
      })
      .then(response => {
        commit('setUser', response.data.user);
        commit('setToken', response.data.token)
        
      }).catch(error => {
        commit('errorOccurred', error.message);
      });
      }

  },
  //change the state: set user and token, notify if error has occurred
  mutations: {
      setUser(state, user) {
          state.user = user;
        },
        setToken(state, token) {
          state.token = token;
        },
        errorOccurred(state, error) {
          state.errorOccurred = error;
        }     
  } 
});

export default store;

