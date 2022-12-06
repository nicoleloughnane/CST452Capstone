<template>
  <default-card>
    <form @submit.prevent="submitForm">
      <h2>Login</h2>  
        <div class="form-control">
            <label for="email">Email</label>
            <input type="email" id="email" v-model.trim="email" />
        </div>
        <div class="form-control">
            <label for="password">Password</label>
            <input type="password" id="password" v-model.trim="password"/>
        </div>
        <p class = "errors" v-if="!validForm">Your email or password was incorrect. Please try again.</p>
        <default-button>Login</default-button>
          <h4>Need an account?</h4>
          <default-button link to="/signup" mode="outline">Sign up</default-button>
      
    </form>
  </default-card>
</template>

<script>
//import axios from 'axios';
export default {
  data() {
    //data to be returned
    return {
      email: '',
      password: '',
      validForm: true,
      mode: 'login'
    }
  },

  methods: {
    submitForm() {
      this.validForm = true;
      //if the email is blank or greater than 40 characters - invalid
      //if password is less than 6 characters or greater than 30 characters - invalid
      if(this.email === '' || this.email.length > 40 || this.password.length < 6 || this.password.length > 30) {
        this.validForm = false;
        return;
      }
      //login the user
      
      let userCredentials = this
      this.$store.dispatch("login", userCredentials)
      .then(() => this.$router.replace('/home'))
      .catch(err => console.log(err));


      const formData = {
                e: this.email,
                p: this.password
            };
          console.log(formData);
      //take user to home page upon login
      //this.$router.replace('/home');
    },
    switchMode() {
      if(this.mode === 'login') {
        this.mode = 'signup';
        this.$router.replace('/signup');
      } else {
        this.mode = 'login';
      }
    }
  }

}
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
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}

.errors {
  font-weight: bold;
  color: red;
}

.actions {
  text-align: center;
}
h2{
  text-align: center;
}
</style>