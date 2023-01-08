<template>
    <section>
        <h2>Create Journal Entry</h2>
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

       <div >
        <button class="mybutton">Create</button>
       </div>
       
    </form>
        </default-card>
    </section>
</template>
<script>
import journalentriesapi from '@/services/journalentriesapi';
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
        formIsValid: true
       }
     },
     methods: {
      clearValidity(input) {
        this[input].isValid = true;
      },
      //validate form information
      validateForm() {
        this.formIsValid = true;
        //if it is still left empty, invalid form input
        if(this.title.val === '') {
          this.title.isValid = false;
          this.formIsValid = false;
        }
        if(this.entryBody.val === '') {
          this.entryBody.isValid = false;
          this.formIsValid = false;
        }

    },
    //user submits the post creation form
      submitForm() {
        this.validateForm();
        //if invalid, do a return to prevent rest of method from executing
        if(!this.formIsValid) {
          return;
        }

        //create the journal entry
       try{
        journalentriesapi.createJournalEntry({
            title: this.title.val,
            entryBody: this.entryBody.val
        }) 
       } catch(error){
        console.log("error: " + error);
       }

        //for testing purposes
        const formData = {
                t: this.title.val,
                pb: this.entryBody.val
            };
          console.log(formData);
            //send user back to the list of posts page
          this.$router.push('/journalentries');
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