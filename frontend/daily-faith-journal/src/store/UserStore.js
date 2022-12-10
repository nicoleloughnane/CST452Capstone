import { createStore } from 'vuex';
import UserAuthService from "@/services/UserAuthService";
//import api from '../services/api';
//import axios from 'axios';
//import {authModule} from './UserAuthModule';

const user = JSON.parse(localStorage.getItem('user'));
const stateOfAuth = user   ? { status: { loggedIn: true }, user }
: { status: { loggedIn: false }, user: null };

//store starts here
const store = createStore({
    modules: {
      //authModule
    },
    state: stateOfAuth,
    actions: {
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
      //logout here
  },
  mutations: {
      loginSuccess(state, user) {
          state.status.loggedIn = true;
          state.user = user;
        },
        loginFail(state) {
          state.status.loggedIn = false;
          state.user = null;
        },
  }
});

export default store;
       /* status: '',
        token: localStorage.getItem('token') || '',
        user: {} */
     /*
    mutations: {
        auth_request(state) {
            state.status = 'loading'
          },
          auth_success(state, token, user) {
            state.status = 'success'
            state.token = token
            state.user = user
          },
          auth_error(state) {
            state.status = 'error'
          },
          logout(state) {
            state.status = ''
            state.token = ''
          },
    }, 
    actions: {
        login({commit}, user) {
            return new Promise((resolve, reject) => {
                commit('auth_request')
                axios({ url: api+`user/login`, data: user, method: 'POST' })
                .then(resp => {
                  const token = resp.data.token
                  const user = resp.data.user
                  localStorage.setItem('token', token)
                  // Add the following line:
                  axios.defaults.headers.common['Authorization'] = token
                  commit('auth_success', token, user)
                  resolve(resp)
                })
                .catch(err => {
                  commit('auth_error')
                  localStorage.removeItem('token')
                  reject(err)
                })
            }) 
        }, //end of login
        register({ commit }, user) {
          return new Promise((resolve, reject) => {
            commit('auth_request')
            axios({ url: api+`user/register`, data: user, method: 'POST' })
              .then(resp => {
                const token = resp.data.token
                const user = resp.data.user
                localStorage.setItem('token', token)
                // Add the following line:
                axios.defaults.headers.common['Authorization'] = token
                commit('auth_success', token, user)
                resolve(resp)
              })
              .catch(err => {
                commit('auth_error', err)
                localStorage.removeItem('token')
                reject(err)
              })
          })
        },
    },
    getters: {
        isLoggedIn: state => !!state.token,
        authStatus: state => state.status,
    } */

