<!--this component handles the login of an existing user and will take to home page upon successful login
user can also click link to signup if they do not have an account-->
<template>
   <div class="mt-6">
  <default-card>
    <form @submit.prevent="submitForm">
      <h2 class="text-center text-xl mb-5">Login</h2>
      <!--Email validation-->
      <div class="mb-3 xl:w-96">
        <label for="email" class="form-label text-brand-gray text-l mr-10">Email:</label>
        <input type="email" id="email" v-model.trim="email" class="form-control outline outline-1 outline-brand-darkpurple rounded-md mb-4 px-2 " placeholder="johndoe@gmail.com" />
      </div>
      <!--Password validation-->
      <div class="mb-3 xl:w-96">
        <label for="password" class="form-label text-brand-gray text-l mr-1 ">Password: </label>
        <input type="password" id="password" v-model.trim="password" class= "form-control outline outline-1 outline-brand-darkpurple rounded-md mb-4 px-2" placeholder="*******"/>
      </div>
      <!--if the form is invalid or the an error exists, error message is displayed accordingly-->
      <div class="flex flex-col items-center">
      <p class="text-brand-red text-md" v-if="!validForm">
       Fields cannot be left blank. Please try again. 
      </p>
      <p class="text-brand-red text-md" v-if="errorMessage === 'Request failed with status code 400'">
        Your email or password was incorrect. Please try again.
      </p>
      <p class="text-brand-red text-md" v-if="errorMessage === 'Network Error'">
        An error has occurred on our end. Please try again later!
      </p>
      <!--Actions the user can take: login or sign up-->
      <div class="flex flex-col items-center text-center">
      <default-button text="Login" buttonType="primary" class="my-2"/>
      <h4 class="text-center my-4">Need an account?</h4>
      <default-button text="Sign Up" buttonType="secondary" class="my-2" link :to="signupLink" />
    </div>
    </div>
    </form>
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
    };
  },
  computed: {
    signupLink() {
        //take user to the signup page
        return '/signup'
      },
       //check if user is logged in already
       isLoggedIn() {
      return this.$store.state.isLoggedIn;
    },
    
  },
  mounted() {
    //if user is logged in, replace current route with home page
    if(this.isLoggedIn) {
      this.$router.replace('/home');
    }
  
  },

  methods: {
    async submitForm() {
      this.validForm = true;
      this.errorMessage = null;
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
      //let userCredentials = this;
      //at this point the form should be valid
      const formData = {
        email: this.email,
        password: this.password,
      };
      //console.log('in submit form, formData is: ' + JSON.stringify(formData));

      //calls store from vuex to login
      this.$store.dispatch("login", formData).then(
        () => {
          if (this.$store.state.errorOccurred != null) {
            this.errorMessage = this.$store.state.errorOccurred;
            console.log("error message: " + this.errorMessage);
            return this.errorMessage;
          }
          //send to home upon logging in
          this.$router.replace("/home");
        },
      );
    },
  },
};
</script>

<style scoped>

</style>
