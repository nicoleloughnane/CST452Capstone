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
  //actions to login, logout, register a user, and tryLogin
  actions: {
    //login
    login({ commit }, user) {
      commit("errorOccurred", null);
      return api()
        .post("/user/login", {
          email: user.email,
          password: user.password,
        })
        .then((response) => {
          //check if a token has been received
          if (response.data.token) {
           // console.log("in login JSON response data is " + JSON.stringify(response.data));
            commit("setUser", response.data.user);
            commit("setToken", response.data.token);
            commit("setUserId", response.data.userId);
            commit("setIsLoggedIn", true);
           /* console.log(
              "i am here in login action. user is: " +
                this.state.user +
                " and token is: " +
                this.state.token +
                " and ID is: " +
                this.state.userId
            );  */
            return response.data;
          }
        })
        .catch((error) => {
          commit("errorOccurred", error.message);
        });
    },
    //logout
    logout({ commit }) {
      //clear state of the user with mutations
      commit("setIsLoggedIn", false);
      commit("setIsLoggedOut");

      
    },

    //register a new user
    register({ commit }, user) {
      this.state.errorOccurred = null;
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
    //this is called in App.vue to allow the user to stay logged in upon browser refresh if they are already signed in
    tryLogin({ commit }) {
      //get data from localStorage
      const user = localStorage.getItem("user");
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");
      /*console.log(
        "I am here in try login, the data is: " +
          user +
          " userId: " +
          userId +
          " token: " +
          token
      ); */
      //if the user exists, call the mutations
      if (user !== null) {
        commit("setUser", user);
        commit("setToken", token);
        commit("setUserId", userId);
        commit("setIsLoggedIn", true);
        /*console.log(
          "i am here in try login, user is not null state store data is: " +
            this.state.user +
            " userId: " +
            this.state.userId +
            " token: " +
            this.state.token
        ); */
        //else if the user is not in localStorage
      } else if(user === null){
       // console.log("i am here in try login, user is not signed in");
        commit("setIsLoggedIn", false);
      } 
    },
  },
  //change the state: set user, token, and userId,
  // set if they are logged in or logged out, notify if an error has occurred
  mutations: {
    setUser(state, user) {
      state.user = user;
      localStorage.setItem("user", user);

    },
    setToken(state, token) {
      state.token = token;
      localStorage.setItem("token", token)
    },
    setUserId(state, userId) {
      state.userId = userId;
      localStorage.setItem("userId", userId);
    },
    setIsLoggedIn(state, loggedIn) {
      state.isLoggedIn = loggedIn;
    },
    setIsLoggedOut() {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
    },
    errorOccurred(state, error) {
      state.errorOccurred = error;
    },
  },
});

export default store;
