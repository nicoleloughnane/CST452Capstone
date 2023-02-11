<template>
   <div class="flex flex-col items-center">
     
      <h2 class="text-xl mb-5 mt-5">Create Journal Entry</h2>
      <h4 class="text-lg mb-8">What is God doing in your life today?</h4>
    <section>
        <default-card>
        <!--these form controls are for the user to input journal entry information
        v-model binds with data in return statement, trim gets rid of excess whitespace-->
        <form @submit.prevent="submitForm">
        <div class="form-control" :class="{invalid: !title.isValid}">
         <label for="title" class="form-label text-brand-gray text-l mr-1 ">Title:</label>
         <br/>
         <input type="text" class= "form-control outline outline-1 outline-brand-darkpurple rounded-md mb-2" v-model.trim="title.val" @blur="clearValidity('title')" />
         <p class="text-brand-red text-md" v-if="!title.isValid">Title of entry must not be empty</p>
        </div>

        <div class="form-control" :class="{invalid: !entryBody.isValid}">
         <label for="entryBody" class="form-label text-brand-gray text-l mr-1 ">My Entry:</label>
         <br/>
         <textarea id="entryBody" rows="10" class="form-control outline outline-1 outline-brand-darkpurple rounded-md mb-2" v-model.trim="entryBody.val" @blur="clearValidity('entryBody')"></textarea>
         <p class="text-brand-red text-md" v-if="!entryBody.isValid">Body of entry must not be empty</p>
        </div>

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
       data(){
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
        formIsValid: true,
        errorMessage: null,
        createResponse: null
       }
     },
     methods: {
      clearValidity(input) {
        this[input].isValid = true;
      },
      //validate form information
      validateForm() {
        this.formIsValid = true;
        //title must be between 1 and 25 characters
        if(this.title.val.length < 1 || this.title.val.length > 25) {
          this.title.isValid = false;
          this.formIsValid = false;
        }
        //entry body must be between 1 and 3,000 characters
        if(this.entryBody.val.length < 1 || this.entryBody.val.length > 3000) {
          this.entryBody.isValid = false;
          this.formIsValid = false;
        }

    },
    async createJournalEntry(data) {
      await api().post('/journalentry/', data)
        .then(response => {
          console.log('creation success')
            this.createResponse =  response.data;
            this.$router.push('/journalentries');
            
        }).catch(error => {
          console.log('creation failed: ' + this.errorMessage);
            this.errorOccurred = error.message;
        })
     
    },
    //user submits the post creation form
      submitForm() {
        console.log('form has been submitted ')
        this.validateForm();
        //if invalid, do a return to prevent rest of method from executing
        if(!this.formIsValid) {
          return;
        }
        //at this point the form should be valid
         const formData = {
                title: this.title.val,
                entryBody: this.entryBody.val
            }; 
          console.log('create form data: ' + formData);
          //call journal entries api to create journal entry
          this.createJournalEntry(formData);
       
      },
      
      
     }
    }
</script>
