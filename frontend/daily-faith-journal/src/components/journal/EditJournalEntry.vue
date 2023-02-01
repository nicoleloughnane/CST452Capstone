<template>
    <section>
        <default-card>
        <form @submit.prevent="submitForm">
        <!--these form controls are for the user to update journal entry information
        v-model binds with data in return statement, trim gets rid of excess whitespace-->
        <div class="mb-3 xl:w-96">
         <label for="title" class="form-label text-brand-gray text-l mr-1 ">Title: </label>
         <input type="text" id="title" v-model.trim="entry.title" class= "form-control outline outline-1 outline-brand-darkpurple rounded-md mb-2" placeholder=""/>    
        </div>

          <!--TODO: style properly-->
        <div class="mb-3 xl:w-96" >
        <label for="entryBody" class="form-label text-brand-gray text-l mr-1 ">Entry Body: </label>
         <textarea id="entryBody" v-model.trim="entry.entryBody" rows="10" class= "form-control outline outline-1 outline-brand-darkpurple rounded-md mb-2" placeholder=""> </textarea>  
        </div>

        
       <div >
        <default-button link :to="'/journalentries'" text="Go Back" buttonType="secondary" class=""/>
        <default-button text="Update" buttonType="primary" class="m-2"/>
       </div>
       
    </form>
        </default-card>
    </section>
</template>
<script>
import api from '../../services/api';
//import journalentriesapi from '@/services/journalentriesapi';
     export default {
      //props: ['id', 'title', 'entryBody', 'entryDate', 'entry_prop'],
      computed: {
      },
       data(){
       return {
        //values will need to be set to the title and entry body of the existing entry
        //journalentry: [],
      /*  entryId: this.$route.params.id,
         title: {
          val: '',
          isValid: true
        },
        entryBody: {
          val: '',
          isValid: true
        },  */
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
       /* journalentriesapi.updateJournalEntry( this.entryId, {
          title: this.entry.title,
          entryBody: this.entry.entryBody
        }).then(response => {
          this.editResponse = response.data;
          console.log('edit response: ' + JSON.stringify(response.data));
          this.$router.push('/journalentries');
        })
        .catch(error => {
          this.errorMessage = error.message;
          console.log('edit failed: ' + this.errorMessage);
        }) */
        await api().put(`/journalentry/${this.entryId}`, formData)
        .then(response => {
          this.editResponse = response.data;
          console.log('edit response: ' + JSON.stringify(response.data));
          this.$router.push('/journalentries');
        }).catch(error => {
          this.errorMessage = error.message;
          console.log('edit failed: ' + this.errorMessage);
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
        //call method to update the entry
        const formData = {
                title: this.entry.title,
                entryBody: this.entry.entryBody
            }; 
        this.updateEntry(formData);
         
      },
     }
    }
</script>
<style scoped>
/* .form-control {
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
} */
</style>