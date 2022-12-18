import { createStore } from 'vuex';
import UserAuthService from "@/services/UserAuthService";

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
      //login calls the userauth service to process the login of a user
      login({commit}, user) {
          return UserAuthService.loginUser(user).then(
              user=> {
              commit('setUser', user);
              return Promise.resolve(user)
              },
              error => {
                  commit('errorOccurred', error);
                  return Promise.reject(error);
              }
          );
      },
      //logout calls userauth service to process logout of a user
      logout({commit}) {
        UserAuthService.logoutUser();
        //clear states of the user with mutations
        commit('setUser', null);
        commit('setToken', null);
      },

      //register calls userauth service to process sign up of a new user
      register({commit}, user) {
        return UserAuthService.signUpUser(user).then(
          response=> {
            commit('setUser', user);
            return Promise.resolve(response.data);
          },
          error => {
            commit('errorOccurred');
            return Promise.reject(error);
          }
        )
      }

  },
  //change the state of a user. are they logged in?
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

