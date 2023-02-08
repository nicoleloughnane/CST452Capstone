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
          //check if a token has been received 
          if(response.data.token) {
            localStorage.setItem('user', JSON.stringify(response.data));
            commit('setUser', response.data.user, response.data.token);
            this.state.isLoggedIn = true;
            console.log('i am here in login action. user is: ' + this.state.user + ' and token is: ' + this.state.token)
            return response.data;
          }
        }) 
        .catch(error => {
          commit('errorOccurred', error.message);
        })
      },
      //logout
      logout({commit}) {
        //clear states of the user with mutations
        commit('setUser', null, null);
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
        
      }).catch(error => {
        commit('errorOccurred', error.message);
      });
      },
      tryLogin({commit}) {
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user');
        if (user && token) {
          console.log("I am here in try login, user exists")
          commit('setUser', {
            user: user,
            token: token
          });
          this.state.isLoggedIn = true;
        }
      }

  },
  //change the state: set user and token, notify if error has occurred
  mutations: {
      setUser(state, user, token) {
          state.user = user;
          state.token = token;
        },
        errorOccurred(state, error) {
          state.errorOccurred = error;
        }     
  } 
});

export default store;

