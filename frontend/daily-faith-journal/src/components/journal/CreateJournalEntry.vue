<template>
   <div class="flex flex-col items-center text-center">
     
      <h2 class="text-xl mb-5 mt-5">Create Journal Entry</h2>
    <section>
        <default-card>
        <form @submit.prevent="submitForm">
        <!--these form controls are for the user to input journal entry information
        v-model binds with data in return statement, trim gets rid of excess whitespace-->
        <div class="form-control" :class="{invalid: !title.isValid}">
         <label for="title">Title:</label>
         <input type="text" id="title" v-model.trim="title.val" @blur="clearValidity('title')" />
         <p v-if="!title.isValid">Title of entry must not be empty</p>
        </div>

        <div class="form-control" :class="{invalid: !entryBody.isValid}">
         <label for="entryBody">My Entry:</label>
         <textarea id="entryBody" rows="5" v-model.trim="entryBody.val" @blur="clearValidity('entryBody')"></textarea>
         <p v-if="!entryBody.isValid">Body of entry must not be empty</p>
        </div>

       <div class="actions">
        <default-button link :to="'/journalentries'" text="Go Back" buttonType="Go Back" class="m-2" />
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
<style scoped>
 .form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input[type='checkbox'] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}

input:focus,
textarea:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #3d008d;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}
p {
  color:red;
}

.invalid label {
  color: red;
}
.invalid textarea {
  border: 1px solid red;
}
</style>