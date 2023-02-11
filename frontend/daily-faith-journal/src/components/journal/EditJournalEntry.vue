<template>
    <section>
      <h2 class="text-center text-xl my-10">Edit Journal Entry</h2>
        <default-card class="">
        <form @submit.prevent="submitForm">
        <!--these form controls are for the user to update journal entry information
        v-model binds with data in return statement, trim gets rid of excess whitespace-->
        <div class="flex flex-col items-center text-center">
        <div class="mb-3 xl:w-96">
         <label for="title" class="form-label text-brand-gray text-l mr-1 ">Title: </label>
         <br/>
         <input type="text" id="title" v-model.trim="entry.title" class= "form-control outline outline-1 outline-brand-darkpurple rounded-md mb-2" placeholder=""/>    
        </div>

        <div class="mb-3 xl:w-96" >
        <label for="entryBody" class="form-label text-brand-gray text-l mr-1 ">Entry Body: </label>
        <br/>
         <textarea id="entryBody" v-model.trim="entry.entryBody" rows="10" class= "form-control outline outline-1 outline-brand-darkpurple rounded-md mb-2" placeholder=""> </textarea>  
        </div>

        
       <div >
        <default-button link :to="'/journalentries'" text="Go Back" buttonType="secondary" class="m-2"/>
        <default-button text="Update" buttonType="primary" class="m-2 ml-4"/>
       </div>
      </div>
    </form>
        </default-card>
        
    </section>
</template>
<script>
import api from '../../services/api';

     export default {
       data(){
       return {
        formIsValid: true,
        editResponse: null,
        entryId: this.$route.params.id,
        errorOccurred: null,
        entry: []
       }
     },
     mounted() {
      this.loadEntry();
     },
     methods: {
      //get one entry by its ID
      async loadEntry() {
        await api().get(`/journalentry/${this.entryId}`)
        .then(response => {
          this.entry = response.data;
          console.log('entry response: ' + JSON.stringify(response.data));
        }).catch(error => {
          this.errorOccurred = error.message;
          console.log('error has occurred: ' + this.errorOccurred)
        });

      },
      async updateEntry(formData) {
        await api().put(`/journalentry/${this.entryId}`, formData)
        .then(response => {
          this.editResponse = response.data;
          //console.log('edit response: ' + JSON.stringify(response.data));
          this.$router.push('/journalentries');
        }).catch(error => {
          this.errorMessage = error.message;
          //console.log('edit failed: ' + this.errorMessage);
        })
      },
      clearValidity(input) {
        this[input].isValid = true;
      },
      //validate form information
      validateForm() {
        this.formIsValid = true;
        //title must be between 1 and 25 characters
        if(this.entry.title.length < 1 || this.entry.title.length > 25) {
          //this.title.isValid = false;
          this.formIsValid = false;
        }
        //entry body must be between 1 and 3,000 characters
        if(this.entry.entryBody.length < 1 || this.entry.entryBody.length > 3000) {
          //this.entryBody.isValid = false;
          this.formIsValid = false;
        }

    },
    //user submits the entry update form
      submitForm() {
        this.validateForm();
        //if invalid, do a return to prevent rest of method from executing
        if(!this.formIsValid) {
          return;
        }
        //at this point the form should be valid
        const formData = {
                title: this.entry.title,
                entryBody: this.entry.entryBody
            }; 
        //call method to update the entry
        this.updateEntry(formData);
         
      },
     }
    }
</script>

