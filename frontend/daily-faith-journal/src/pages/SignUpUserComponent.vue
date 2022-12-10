<template>
    <default-card>
      <form @submit.prevent="submitForm">
        <h2>Sign Up</h2>  
          <div class="form-control" :class="{invalid: !email.isValid}">
              <label for="email">Email</label>
              <input type="email" id="email" v-model.trim="email.val" @blur="clearValidity('email')"/>
              <p class = "errors" v-if="!email.isValid">Email must not be empty and between 1 and 40 characters with @ sign</p>
          </div>
          <div class="form-control" :class="{invalid: !password.isValid}">
              <label for="password">Password</label>
              <input type="password" id="password" v-model.trim="password.val" @blur="clearValidity('password')"/>
              <p class = "errors" v-if="!password.isValid">Password must not be empty and between 8 and 30 characters</p>
          </div>
          <div class="form-control" :class="{invalid: !firstName.isValid}">
              <label for="firstName">First Name</label>
              <input type="firstName" id="firstName" v-model.trim="firstName.val" @blur="clearValidity('firstName')"/>
              <p class = "errors" v-if="!firstName.isValid">First name must not be empty and between 1 and 50 characters</p>
          </div>
          <div class="form-control" :class="{invalid: !lastName.isValid}">
              <label for="lastName">Last Name</label>
              <input type="lastName" id="lastName" v-model.trim="lastName.val" @blur="clearValidity('lastName')"/>
              <p class = "errors" v-if="!lastName.isValid">Last name must not be empty and between 1 and 50 characters</p>
          </div>
          <default-button>Continue</default-button>
        
      </form>
      <h4>Already have an account?</h4>
          <default-button link to="/login" mode="outline">Login</default-button>
    </default-card>
  </template>

<script>
export default {
  data() {
    //data to be returned
    return {
      email: {
        val: '',
        isValid: true
      },
      password: {
        val: '',
        isValid: true
      },
      firstName: {
        val: '',
        isValid: true
      },
      lastName: {
        val: '',
        isValid: true
      },
    }
  },
  methods: {
    clearValidity(input) {
        this[input].isValid = true;
      },
      //validate form information
      validateForm() {
        this.formIsValid = true;
        //email must be between 1 and 40 characters with @ sign
        if(!this.email.val.includes('@') || this.email.val.length < 1 || this.email.val.length > 40) {
          this.email.isValid = false;
          this.formIsValid = false;
        }
        //password must be between 8 and 30 characters
        if(this.password.val.length < 8 || this.password.val.length > 30) {
          this.password.isValid = false;
          this.formIsValid = false;
        }
        //first name must be between 1 and 50 characters 
        if(this.firstName.val.length < 1 || this.firstName.val.length > 50) {
          this.firstName.isValid = false;
          this.formIsValid = false;
        }
        //last name must be between 1 and 50 characters 
        if(this.lastName.val.length < 1 || this.lastName.val.length > 50) {
          this.lastName.isValid = false;
          this.formIsValid = false;
        }

    },
    //called upon form submit, calls validateForm 
    submitForm() {
      this.validateForm();

      if(!this.formIsValid) {
        console.log(this.formIsValid)
        return;
      }
      let userCredentials = this
      this.$store.dispatch("register", userCredentials)
      .then(() => this.$router.replace('/login'))
      .catch(err => console.log(err));


      //for testing purposes
      const formData = {
                e: this.email.val,
                p: this.password.val,
                f: this.firstName.val,
                l: this.lastName.val
            };
          console.log(formData);
            //send user back to login to login with new account
          this.$router.push('/login');


    },
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