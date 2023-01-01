<template>
  <default-card>
    <form @submit.prevent="submitForm()">
      <h2 style="text-align: center">Sign Up</h2>
      <div class="form-control" :class="{ invalid: !email.isValid }">
        <label for="email">Email</label>
        <input
          type="email"
          id="email"
          v-model.trim="email.val"
          @blur="clearValidity('email')"
        />
        <!--if the form is invalid or the email is already in use, error message is displayed-->
        <p class="errors" v-if="!email.isValid || errorMessage != null">Email must not be empty or an account with this email already exists</p>
      </div>
      <div class="form-control" :class="{ invalid: !password.isValid }">
        <label for="password">Password</label>
        <input
          type="password"
          id="password"
          v-model.trim="password.val"
          @blur="clearValidity('password')"
        />
        <p class="errors" v-if="!password.isValid">
          Password must not be empty and at least 8 characters
        </p>
      </div>
      <div class="form-control" :class="{ invalid: !firstName.isValid }">
        <label for="firstName">First Name</label>
        <input
          type="firstName"
          id="firstName"
          v-model.trim="firstName.val"
          @blur="clearValidity('firstName')"
        />
        <p class="errors" v-if="!firstName.isValid">
          First name must not be empty
        </p>
      </div>
      <div class="form-control" :class="{ invalid: !lastName.isValid }">
        <label for="lastName">Last Name</label>
        <input
          type="lastName"
          id="lastName"
          v-model.trim="lastName.val"
          @blur="clearValidity('lastName')"
        />
        <p class="errors" v-if="!lastName.isValid">
          Last name must not be empty
        </p>
      </div>
      <button class = "mybutton">Continue</button>
      <h4 style="text-align: center">Already have an account?</h4>
      <router-link to="/login" mode="outline" class="newpagebutton">Login</router-link>
    </form>
  </default-card>
</template>

<script>
export default {
  data() {
    //data to be returned
    return {
      email: {
        val: "",
        isValid: true,
      },
      password: {
        val: "",
        isValid: true,
      },
      firstName: {
        val: "",
        isValid: true,
      },
      lastName: {
        val: "",
        isValid: true,
      },
      errorMessage: null,
    };
  },
  computed: {
    isLoggedIn() {
      return this.$store.state.isLoggedIn;
    },
  },
  mounted() {
    if (this.isLoggedIn) {
      this.$router.replace("/home");
    }
  },
  methods: {
    clearValidity(input) {
      this[input].isValid = true;
    },
    //validate form information
    validateForm() {
      this.formIsValid = true;
      this.errorMessage = null;
      //email must be between 1 and 40 characters with @ sign
      if (
        !this.email.val.includes("@") ||
        this.email.val.length < 1 ||
        this.email.val.length > 40
      ) {
        this.email.isValid = false;
        this.formIsValid = false;
      }
      //password must be between 8 and 30 characters
      if (this.password.val.length < 8 || this.password.val.length > 30) {
        this.password.isValid = false;
        this.formIsValid = false;
      }
      //first name must be between 1 and 50 characters
      if (this.firstName.val.length < 1 || this.firstName.val.length > 50) {
        this.firstName.isValid = false;
        this.formIsValid = false;
      }
      //last name must be between 1 and 50 characters
      if (this.lastName.val.length < 1 || this.lastName.val.length > 50) {
        this.lastName.isValid = false;
        this.formIsValid = false;
      }
    },
    //called upon form submit, calls validateForm
    submitForm() {
      this.validateForm();

      //register the user, calls store from vuex
      this.$store
        .dispatch("register", {
          email: this.email.val,
          password: this.password.val,
          firstName: this.firstName.val,
          lastName: this.lastName.val,
        })
        .then(
          () => {
            if (this.$store.state.errorOccurred != null) {
              //error has occurred, form is invalid
              this.errorMessage = this.$store.state.errorOccurred;
              //this.formIsValid = false;
              //console.log("error message: " + this.errorMessage);
              return this.errorMessage;
            }
            //send user back to login to log in with newly created account
            this.$router.replace("/login");
          },
          //for any errors that may occur within the component
          (error) => {
            this.errorMessage = error.message;
          }
        );
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

</style>
