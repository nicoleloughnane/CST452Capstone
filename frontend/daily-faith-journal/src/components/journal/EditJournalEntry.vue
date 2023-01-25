<template>
    <section>
        <h2>Edit Journal Entry</h2>
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
        <router-link to="/journalentries" class="newpagebutton">Go Back</router-link>
        <button class="mybutton">Update</button>
       </div>
       
    </form>
        </default-card>
    </section>
</template>
<script>
//import {mapState} from 'vuex';
     export default {
      computed: {
      },
       data(){
       return {
        //values will need to be set to the title and entry body of the existing entry
        //journalentry: [],
        entryId: this.$route.params.id,
         title: {
          val: '',
          isValid: true
        },
        entryBody: {
          val: '',
          isValid: true
        }, 
        formData: {},
        formIsValid: true,
        errorMessage: null,
       }
     },
     mounted() {
      this.loadEntry();
     },
     methods: {
      //get one entry by its ID
      async loadEntry() {
         console.log('id: '+ this.entryId);
        const response = this.$store.getters['journalentries/getterJournalEntryById', this.entryId];
        
        this.formData = response;
        console.log('formData: ' + this.formData);
      },
      async updateEntry() {
        console.log(this.formData); 
        this.$store
        .dispatch('journalentries/updateJournalEntry', this.entryId, this.formData)
        .then(
          () => {
           /* if (this.$store.state.errorOccurred != null) {
              //error has occurred, form is invalid
              this.errorMessage = this.$store.state.errorOccurred;
              //this.formIsValid = false;
              //console.log("error message: " + this.errorMessage);
              return this.errorMessage;
            } */
            //send user back to login to log in with newly created account
           // this.$router.replace("/login");
           this.$router.push('/journalentries');
          },
          //for any errors that may occur within the component
          (error) => {
            this.errorMessage = error.message;
          }
        );
      },
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
    //user submits the entry update form
      submitForm() {
        this.validateForm();
        //if invalid, do a return to prevent rest of method from executing
        if(!this.formIsValid) {
          return;
        }
        //at this point the form should be valid
        //references journal entries module from vuex store
        this.updateEntry();
         
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