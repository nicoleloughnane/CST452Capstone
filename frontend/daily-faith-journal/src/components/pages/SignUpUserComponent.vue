<!--this component handles the signup of a new user and will take back to login upon a successful sign up
if the user ended up here by mistake they can go back to login-->
<template>
  <default-card>
    <form @submit.prevent="submitForm">
      <h2 class="text-center text-xl mb-5">Sign Up</h2>
      <!--Email validation-->
      <div class="mb-3 xl:w-96" :class="{ invalid: !email.isValid }">
        <label for="email" class="form-label text-brand-gray text-l mr-14">Email:</label>
        <input type="email" id="email" v-model.trim="email.val" @blur="clearValidity('email')" class= "form-control outline outline-1 outline-brand-darkpurple rounded-md mb-4" placeholder="johndoe@gmail.com"/>
        <!--PENDING BUG: form prevents user from signing in if they use an email that already exists-->
        <!--if the form is invalid or the email is already in use, error message is displayed-->
        <p class="text-brand-red text-md" v-if="!email.isValid || errorMessage != null">Email must not be empty or an account with this email already exists</p>
      </div>
      <!--Password validation-->
      <div class="mb-3 xl:w-96" :class="{ invalid: !password.isValid }">
        <label for="password" class="form-label text-brand-gray text-l mr-6">Password:</label>
        <input type="password" id="password" v-model.trim="password.val" @blur="clearValidity('password')" class= "form-control outline outline-1 outline-brand-darkpurple rounded-md mb-4" placeholder="*********"/>
        <p class="text-brand-red text-md" v-if="!password.isValid">
          Password must not be empty and at least 8 characters
        </p>
      </div>
        <!--First name validation-->
      <div class="mb-3 xl:w-96" :class="{ invalid: !firstName.isValid }">
        <label for="firstName" class="form-label text-brand-gray text-l mr-4">First Name:</label>
        <input type="firstName" id="firstName" v-model.trim="firstName.val" @blur="clearValidity('firstName')" class="form-control outline outline-1 outline-brand-darkpurple rounded-md mb-4" placeholder="John"/>
        <p class="text-brand-red text-md" v-if="!firstName.isValid">
          First name must not be empty
        </p>
      </div>
        <!--Last name validation-->
      <div class="mb-3 xl:w-96" :class="{ invalid: !lastName.isValid }">
        <label for="lastName" class="form-label text-brand-gray text-l mr-4">Last Name:</label>
        <input type="lastName" id="lastName" v-model.trim="lastName.val" @blur="clearValidity('lastName')" class="form-control outline outline-1 outline-brand-darkpurple rounded-md mb-4" placeholder="Doe"/>
        <p class="text-brand-red text-md" v-if="!lastName.isValid">
          Last name must not be empty
        </p>
      </div>
      <!--Options the user can take: buttons-->
      <div class="flex flex-col items-center text-center">
      <default-button text="Continue" buttonType="primary" class="my-4 "/>
      <h4 class="text-center mb-4">Already have an account?</h4>
      <default-button text="Go Back" buttonType="secondary" link :to="loginLink" />
    </div>
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
    loginLink() {
        //take user to the login page
        return '/login'
      },
  },
  mounted() {
    
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
      if (!this.email.val.includes("@") || this.email.val.length < 1 || this.email.val.length > 40) {
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
              console.log("error message: " + this.errorMessage);
              return this.errorMessage;
            }
            //send user back to login to log in with newly created account
            this.formIsValid = true;
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
