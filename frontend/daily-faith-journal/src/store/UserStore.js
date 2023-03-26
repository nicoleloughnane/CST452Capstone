import { createStore } from "vuex";
import api from "../services/api";

//store starts here
const store = createStore({
  state: {
    isLoggedIn: false,
    user: null,
    token: null,
    userId: null,
    errorOccurred: null,
  },
  //actions to login, logout, and register a user
  actions: {
    //login
    login({ commit }, user) {
      return api()
        .post("/user/login", {
          email: user.email,
          password: user.password,
        })
        .then((response) => {
          //check if a token has been received
          if (response.data.token) {
            //console.log("in login JSON response data is " + JSON.stringify(response.data));
            commit("setUser", response.data.user);
            commit("setToken", response.data.token);
            commit("setUserId", response.data.userId);
            this.state.isLoggedIn = true;
            console.log(
              "i am here in login action. user is: " +
                this.state.user +
                " and token is: " +
                this.state.token +
                " and ID is: " +
                this.state.userId
            );
            return response.data;
          }
        })
        .catch((error) => {
          commit("errorOccurred", error.message);
        });
    },
    //logout
    logout({ commit }) {
      //clear states of the user with mutations
      commit("setUser", null);
      commit("setToken", null);
      commit("setUserId", null);
      this.state.isLoggedIn = false;
    },

    //register
    register({ commit }, user) {
      return api()
        .post("/user/register", {
          email: user.email,
          password: user.password,
          firstName: user.firstName,
          lastName: user.lastName,
        })
        .then((response) => {
          commit("setUser", response.data.user);
        })
        .catch((error) => {
          commit("errorOccurred", error.message);
        });
    },
    tryLogin({ commit }) {
      const user = localStorage.getItem("user");
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");
      console.log(
        "I am here in try login, the data is: " +
          user +
          " userId: " +
          userId +
          " token: " +
          token
      );
      if (localStorage.getItem("user")) {
        console.log(
          "I am here in try login, the user exists and user is: " +
            user +
            " userId: " +
            userId +
            " token: " +
            token
        );
        commit("setUser", user);
        commit("setToken", token);
        commit("setUserId", userId);
        console.log(
          "state store data is: " +
            this.state.user +
            " userId: " +
            this.state.userId +
            " token: " +
            this.state.token
        );
        this.state.isLoggedIn = true;
      } else if(user === null){
        console.log("i am here in try login, user is not signed in");
      }
    },
  },
  //change the state: set user and token, notify if error has occurred
  mutations: {
    setUser(state, user) {
      state.user = user;
      localStorage.setItem("user", user);
    },
    setToken(state, token) {
      state.token = token;
      localStorage.setItem("token", token);
    },
    setUserId(state, userId) {
      state.userId = userId;
      localStorage.setItem("userId", userId);
    },
    errorOccurred(state, error) {
      state.errorOccurred = error;
    },
  },
});

export default store;
