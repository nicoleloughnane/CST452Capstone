<!--This component handles the creation of a new sermon note-->
<template>
  <div class="flex flex-col items-center">

    <h2 class="text-xl mb-5 mt-5">Create Sermon Note</h2>
    <h4 class="text-lg mb-8">What did you learn in church today?</h4>
    <section>
      <default-card>
        <!--on form submit, calls submitForm method, located in scripts-->
        <form @submit.prevent="submitForm">
        <!--these form controls are for the user to input journal entry information
          v-model binds with data in return statement, trim gets rid of excess whitespace-->

          <!--Title-->
          <div class="form-control" :class="{ invalid: !title.isValid }">
            <label for="title" class="form-label text-brand-gray text-l mr-1 ">Title:</label>
            <br />
            <input type="text" class="form-control outline outline-1 outline-brand-darkpurple rounded-md mb-2 px-2"
              v-model.trim="title.val" @blur="clearValidity('title')" />
            <p class="text-brand-red text-md" v-if="!title.isValid">Title of entry must not be empty</p>
          </div>

          <!--Pastor Name-->
          <div class="form-control" :class="{ invalid: !pastor.isValid }">
            <label for="pastor" class="form-label text-brand-gray text-l mr-1 ">Pastor:</label>
            <br />
            <input type="text" class="form-control outline outline-1 outline-brand-darkpurple rounded-md mb-2 px-2"
              v-model.trim="pastor.val" @blur="clearValidity('pastor')" />
            <p class="text-brand-red text-md" v-if="!pastor.isValid">Pastor name must not be more than 25 characters</p>
          </div>

          
           <!--Bible Verses-->
           <div class="form-control" :class="{ invalid: !verses.isValid }">
            <label for="verses" class="form-label text-brand-gray text-l mr-1 ">Bible Verses:</label>
            <br />
            <textarea rows="2" class="form-control outline outline-1 outline-brand-darkpurple rounded-md px-2"
              v-model.trim="verses.val" @blur="clearValidity('verses')" > </textarea>
            <p class="text-sm">Enter in verses separated by spaces</p>
            <p class="text-brand-red text-md" v-if="!verses.isValid">You cannot have more than 10 Bible verses.</p>
          </div>
          <br />

          <!--Entry Body-->
          <div class="form-control" :class="{ invalid: !entryBody.isValid }">
            <label for="entryBody" class="form-label text-brand-gray text-l mr-1 ">Notes:</label>
            <br />
            <textarea id="entryBody" rows="10"
              class="form-control outline outline-1 outline-brand-darkpurple rounded-md mb-2 px-2" v-model.trim="entryBody.val"
              @blur="clearValidity('entryBody')"></textarea>
            <p class="text-brand-red text-md" v-if="!entryBody.isValid">Notes must not be empty</p>
          </div>

          <!--Actions for user to take - go back or submit the form-->
          <div class="actions">
            <default-button link :to="'/sermonnotes'" text="Go Back" buttonType="secondary" class="m-2" />
            <default-button text="Create" class="m-2" buttonType="create" />
          </div>
        </form>
      </default-card>
    </section>
  </div>
</template>

<script>
import api from '../../services/api';

export default {
  data() {
    return {
      //values are set to empty initially 
      //because new post hasn't been created yet
      title: {
        val: '',
        isValid: true
      },
      entryBody: {
        val: '',
        isValid: true
      },
      pastor: {
        val: '',
        isValid: true
      },
      verses: {
        val: '',
        isValid: true
      },
      parsedVerses: [],

      formIsValid: true,
      errorMessage: null,
      createResponse: null,
      userID: this.$store.state.userId, 
      userToken: this.$store.state.token
    }
  },
  methods: {
    //if user fixes a mistake they made, error message will not remain
    clearValidity(input) {
      this[input].isValid = true;
    },
    //validate form information
    validateForm() {
      this.formIsValid = true;
      //title must be between 1 and 25 characters
      if (this.title.val.length < 1 || this.title.val.length > 25) {
        this.title.isValid = false;
        this.formIsValid = false;
      }
      //entry body must be between 1 and 3,000 characters
      if (this.entryBody.val.length < 1 || this.entryBody.val.length > 3000) {
        this.entryBody.isValid = false;
        this.formIsValid = false;
      }
      //pastor must not be greater than 25 characters if user decides to enter
      if (this.pastor.val.length > 25) {
        this.pastor.isValid = false;
        this.formIsValid = false;
      }
      if(this.parsedVerses.length > 10){
        console.log('too long');
        this.verses.isValid = false;
        this.formIsValid = false;
      }
    },
    parseBibleVerses() {
      this.formIsValid = true;
       // Regex to match Bible verses
       const regex = /\b([1-3]?\s?[a-zA-Z]+\s[0-9]{1,3}(?::[0-9]{1,3})?(-[0-9]{1,3}(?::[0-9]{1,3})?)?(,\s*[0-9]{1,3}(?::[0-9]{1,3})?(-[0-9]{1,3}(?::[0-9]{1,3})?)?)*)\b/g;

      // Parse the input text and extract the verses
      const matches = this.verses.val.match(regex);
      
      // Update the data property with the parsed verses
      this.parsedVerses = matches || [];

    },
    //called by the submitForm method to attempt a creation of an entry
    async createSermonNote(data) {
      await api().post(`/sermonnote/create/${this.userID}`, data, {
        headers: {
          Authorization: `Bearer ${this.userToken}`,
        },
      })
        .then(response => {
          //console.log('creation success')
          this.createResponse = response.data;
          this.$router.push('/sermonnotes');

        }).catch(error => {
          //console.log('creation failed: ' + this.errorMessage);
          this.errorOccurred = error.message;
        })

    },
    //user submits the entry creation form
    submitForm() {
      //console.log('form has been submitted ')
        //call Bible verses method if the user entered in a value
        if(this.verses.val) {
        this.parseBibleVerses();
      }
      this.validateForm();

      //if invalid, do a return to prevent rest of method from executing
      if (!this.formIsValid) {
        return;
      }

      //at this point the form should be valid
      const formData = {
        title: this.title.val,
        entryBody: this.entryBody.val,
        pastor: this.pastor.val,
        verses: this.parsedVerses
      };
      //call sermon notes api to create sermon note
      this.createSermonNote(formData);
    },
  }
}
</script>
