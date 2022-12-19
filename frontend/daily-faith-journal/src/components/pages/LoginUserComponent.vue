<template>
   <div>
  <default-card>
    <form @submit.prevent="submitForm">
      <h2>Login</h2>
      <div class="form-control">
        <label for="email">Email</label>
        <input type="email" id="email" v-model.trim="email" />
      </div>
      <div class="form-control">
        <label for="password">Password</label>
        <input type="password" id="password" v-model.trim="password" />
      </div>
      <!--if the form is invalid or the an error exists, error message is displayed-->
      <p class="errors" v-if="!validForm || errorMessage != null">
        Your email or password was incorrect, or left blank. Please try again.
      </p>
      <default-button>Login</default-button>
      <h4>Need an account?</h4>
      <default-button link to="/signup" mode="outline">Sign up</default-button>
    </form>
   <!-- <div class="loading" v-if="formLoading">
    <p>Logging in...</p> 
  </div> -->
  </default-card>
</div>
</template>

<script>
export default {
  data() {
    //data to be returned
    return {
      email: "",
      password: "",
      validForm: true,
      errorMessage: null,
      formLoading : false
    };
  },
  methods: {
    async submitForm() {
      this.validForm = true;
      //if the email is blank or greater than 40 characters - invalid
      //if password is less than 6 characters or greater than 30 characters - invalid
      if (
        this.email === "" ||
        this.email.length > 40 ||
        this.password.length < 6 ||
        this.password.length > 30
      ) {
        this.validForm = false;
        return;
      }

      //user credentials
      let userCredentials = this;

      //calls store from vuex to login
      this.$store.dispatch("login", userCredentials).then(
        () => {
          if (this.$store.state.errorOccurred != null) {
            this.errorMessage = this.$store.state.errorOccurred;
            //console.log("error message: " + this.errorMessage);
            return this.errorMessage;
          }
          //send to home upon logging in
          this.$router.replace("/home");
        },
        //for any errors that may occur within this component
        (error) => {
          this.errorMessage = error.message;
        }
      );
      this.formLoading = true;
    },
  },
};
</script>
<style scoped>
form {
  margin: 1rem;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #775dab;
  background-color: #faf6ff;
  outline: none;
}

.errors {
  font-weight: 900;
  color: red;
}

h2 {
  text-align: center;
}
</style>
