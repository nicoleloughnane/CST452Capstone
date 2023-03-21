<!--This component handles the creation of a new journal entry-->
<template>
  <div class="flex flex-col items-center">

    <h2 class="text-xl mb-5 mt-5">Create Journal Entry</h2>
    <h4 class="text-lg mb-8">What is God doing in your life today?</h4>
    <section>
      <default-card>
        <!--on form submit, calls submitForm method, located in scripts-->
        <form @submit.prevent="submitForm">
          <!--select a mood: optional-->
          <!--TODO: best user experience: user clicks from a list of emojis - look on font awesome for them
          user clicks a check box, invisible to user but way for me to assign a value clicked programmatically 
          moods: happy, sad, content, angry, inspired 
         -->
          <div class="mood">

          </div>
          
          <!--these form controls are for the user to input journal entry information
        v-model binds with data in return statement, trim gets rid of excess whitespace-->
          <!--Title-->
          <div class="form-control" :class="{ invalid: !title.isValid }">
            <label for="title" class="form-label text-brand-gray text-l mr-1 ">Title:</label>
            <br />
            <input type="text" class="form-control outline outline-1 outline-brand-darkpurple rounded-md mb-2"
              v-model.trim="title.val" @blur="clearValidity('title')" />
            <p class="text-brand-red text-md" v-if="!title.isValid">Title of entry must not be empty</p>
          </div>

          <!--Entry Body-->
          <div class="form-control" :class="{ invalid: !entryBody.isValid }">
            <label for="entryBody" class="form-label text-brand-gray text-l mr-1 ">My Entry:</label>
            <br />
            <textarea id="entryBody" rows="10"
              class="form-control outline outline-1 outline-brand-darkpurple rounded-md mb-2"
              v-model.trim="entryBody.val" @blur="clearValidity('entryBody')"></textarea>
            <p class="text-brand-red text-md" v-if="!entryBody.isValid">Body of entry must not be empty</p>
          </div>

          <!--Actions for user to take - go back or submit the form-->
          <div class="actions">
            <default-button link :to="'/journalentries'" text="Go Back" buttonType="secondary" class="m-2" />
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
      mood: {
        val: '',
      },
      formIsValid: true,
      errorMessage: null,
      createResponse: null,
      userID : this.$store.state.userId
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

    },
    //called by the submitForm method to attempt a creation of an entry
    async createJournalEntry(data) {
      await api().post(`/journalentry/create/${this.userID}`, data)
        .then(response => {
          this.createResponse = response;
          //console.log('creation success')
          this.$router.push('/journalentries');

        }).catch(error => {
          this.errorOccurred = error.message;
          console.log('error has occurred: ' + this.errorOccurred)
        })

    },
    //user submits the entry creation form
    submitForm() {
      //console.log('form has been submitted ')
      this.validateForm();
      //if invalid, do a return to prevent rest of method from executing
      if (!this.formIsValid) {
        return;
      }

      //TODO
      //some sort of if statement
      //if {emote} was checked, this.mood.val === {emote}

      //at this point the form should be valid
      const formData = {
        title: this.title.val,
        entryBody: this.entryBody.val,
        userId: this.$store.state.userId,
        mood: this.mood.val
      };
      //call journal entries api to create journal entry
      this.createJournalEntry(formData);
    },
  }
}
</script>
