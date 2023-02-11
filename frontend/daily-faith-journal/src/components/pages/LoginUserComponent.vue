<template>
   <div>
  <default-card>
    <form @submit.prevent="submitForm">
      <h2 class="text-center text-xl mb-5">Login</h2>
      <!--Email validation-->
      <div class="mb-3 xl:w-96">
        <label for="email" class="form-label text-brand-gray text-l mr-10">Email:</label>
        <input type="email" id="email" v-model.trim="email" class= "form-control outline outline-1 outline-brand-darkpurple rounded-md mb-4" placeholder="johndoe@gmail.com"/>
      </div>
      <!--Password validation-->
      <div class="mb-3 xl:w-96">
        <label for="password" class="form-label text-brand-gray text-l mr-1 ">Password: </label>
        <input type="password" id="password" v-model.trim="password" class= "form-control outline outline-1 outline-brand-darkpurple rounded-md mb-2" placeholder="*******"/>
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
      <!--Options the user can take: buttons-->
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
            console.log("error message: " + this.errorMessage);
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
    },
  },
};
</script>
<style scoped>

</style>
