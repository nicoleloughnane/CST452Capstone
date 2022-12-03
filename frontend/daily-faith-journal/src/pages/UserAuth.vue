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
        <default-button>{{submitButton}}</default-button>
        <h4>Need an account?</h4>
        <default-button type="button" mode="outline" @click="switchMode">{{switchModeButton}}</default-button>
      
    </form>
  </default-card>
</template>

<script>
import * as auth from '../services/UserAuthService';
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
  computed: {
    submitButton() {
      if(this.mode === 'login') {
        return 'Login'
      } else {
        return 'Sign Up'
      }
    },
    switchModeButton() {
      if(this.mode === 'login') {
        return 'Sign Up Here'
      } else {
        return 'Login Here'
      }
    }
  },
  methods: {
    submitForm() {
      this.validForm = true;
      //if the email is blank, does not have an @ symbol - invalid
      //to be added: is smaller than _ characters or longer than _ characters
      //if password is less than 6 characters or to be added - greater than _ characters - invalid
      if(this.email === '' || !this.email.includes('@') || this.password.length < 6) {
        this.validForm = false;
        return;
      }
      //login the user
      auth.login();
      //take user to home page upon login
      this.$router.replace('/home');
    },
    switchMode() {
      if(this.mode === 'login') {
        this.mode = 'signup';
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