import { createStore } from 'vuex';
//import api from '../services/api';
import axios from 'axios';


let api = 'http://localhost:3000/api/v1/';

const store = createStore({
    state: {
        status: '',
        token: localStorage.getItem('token') || '',
        user: {}
    },
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
    }

});

export default store;