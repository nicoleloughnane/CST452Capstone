import UserAuthService from "@/services/UserAuthService";

const user = JSON.parse(localStorage.getItem('user'));
const stateOfAuth = user   ? { status: { loggedIn: true }, user }
: { status: { loggedIn: false }, user: null };

export const authModule = {
    namespaced: true,
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
}