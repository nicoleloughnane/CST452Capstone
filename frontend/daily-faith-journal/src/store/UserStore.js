import { createStore } from 'vuex';
import UserAuthService from "@/services/UserAuthService";

const user = JSON.parse(localStorage.getItem('user'));
const stateOfAuth = user   ? { status: { loggedIn: true }, user }
: { status: { loggedIn: false }, user: null };

//store starts here
const store = createStore({
    modules: {
      //authModule
    },
    state: stateOfAuth,
    getters: {
      
    },
    //actions to login, logout, and register a user
    actions: {
      //login calls the userauth service to process the login of a user
      login({commit}, user) {
          return UserAuthService.loginUser(user).then(
              user=> {
              commit('loginSuccess', user);
              return Promise.resolve(user)
              },
              error => {
                  commit('loginFail');
                  return Promise.reject(error);
              }
          );
      },
      //logout calls userauth service to process logout of a user
      logout({commit}) {
        UserAuthService.logoutUser();
        commit('logout');
      },
      register({commit}, user) {
        //console.log("in register in store");
        return UserAuthService.signUpUser(user).then(
          response=> {
            commit('registerSuccess');
            return Promise.resolve(response.data);
          },
          error => {
            commit('registerFail');
            return Promise.reject(error);
          }
        )
      }

  },
  //change the state of a user. are they logged in?
  mutations: {
      loginSuccess(state, user) {
          state.status.loggedIn = true;
          state.user = user;
        },
        loginFail(state) {
          state.status.loggedIn = false;
          state.user = null;
        },
        logout(state) {
          state.status.loggedIn = false;
          state.user = null;
        },
        registerSuccess(state) {
          state.status.loggedIn = false;
        },
        registerFail(state) {
          state.status.loggedIn = false;
        }
  }
});

export default store;

