<!--This component handles updating an existing journal entry-->
<template>
  <section>
    <h2 class="text-center text-xl my-10">Edit Sermon Note</h2>
    <default-card>
      <!--on form submit, calls submitForm method, located in scripts-->
      <form @submit.prevent="submitForm">
      <!--these form controls are for the user to update journal entry information
            v-model binds with data in return statement, trim gets rid of excess whitespace-->
        <div class="flex flex-col items-center text-center">
          <div class="mb-3 xl:w-96">
            <label for="title" class="form-label text-brand-gray text-l mr-1 ">Title: </label>
            <br />
            <input type="text" id="title" v-model.trim="entry.title"
              class="form-control outline outline-1 outline-brand-darkpurple rounded-md mb-2 px-2" placeholder="" />
          </div>

          <!--Pastor Name-->
          <div class="mb-3 xl:w-96">
            <label for="pastor" class="form-label text-brand-gray text-l mr-1 ">Pastor:</label>
            <br />
            <input type="text" class="form-control outline outline-1 outline-brand-darkpurple rounded-md mb-2 px-2"
              v-model.trim="entry.pastor" />
          </div>

                <!--Bible Verses-->
                <div class="mb-3 xl:w-96" >
            <label for="verses" class="form-label text-brand-gray text-l mr-1 ">Bible Verses:</label>
            <br />
            <textarea rows="2" class=" form-control outline outline-1 outline-brand-darkpurple rounded-md px-2"
              v-model.trim="entry.verses"> </textarea>
            <p class="text-sm">Enter in verses separated by commas</p>

          </div>
          <br />

          <div class="mb-3 xl:w-96">
            <label for="entryBody" class="form-label text-brand-gray text-l mr-1 ">Entry Body: </label>
            <br />
            <textarea id="entryBody" v-model.trim="entry.entryBody" rows="10"
              class="form-control outline outline-1 outline-brand-darkpurple rounded-md mb-2 px-2" placeholder=""> </textarea>
          </div>

          <!--displays if an error has occurred-->
          <p class="text-brand-red text-md" v-if="!formIsValid">Body of title and entry body not be empty. Pastor name must be less than 25 characters</p>

          <!--actions the user can take - go back or submit the form-->
          <div>
            <default-button link :to="'/sermonnotes'" text="Go Back" buttonType="secondary" class="m-2" />
            <default-button text="Update" buttonType="primary" class="m-2 ml-4" />
          </div>
        </div>
      </form>
    </default-card>

  </section>
</template>
  
<script>
import api from '../../services/api';
export default {
  data() {
    return {
      formIsValid: true,
      entryId: this.$route.params.id,
      errorOccurred: null,
      entry: [],
      userID: this.$store.state.userId,
      userToken: this.$store.state.token

    }
  },
  //when component is loaded, call loadEntry
  mounted() {
    this.loadEntry();
  },
  methods: {
    //get one entry by its ID
    async loadEntry() {
      await api().get(`/sermonnote/byEntryId/${this.userID}/${this.entryId}`, {
        headers: {
          Authorization: `Bearer ${this.userToken}`,
        },
      })
        .then(response => {
          this.entry = response.data;
          //console.log('entry response: ' + JSON.stringify(response.data));
        }).catch(error => {
          this.errorOccurred = error.message;
          console.log('error has occurred: ' + this.errorOccurred)
        });

    },
    //submitForm calls updateEntry if the form is valid
    async updateEntry(formData) {
      await api().put(`/sermonnote/update/${this.userID}/${this.entryId}`, formData, {
        headers: {
          Authorization: `Bearer ${this.userToken}`,
        },
      })
        .then(response => {
          this.editResponse = response.data;
          //console.log('edit response: ' + JSON.stringify(response.data));
          this.$router.push('/sermonnotes');
        }).catch(error => {
          this.errorMessage = error.message;
          console.log('edit failed: ' + this.errorMessage);
        })
    },

    //validate form information
    validateForm() {
      this.formIsValid = true;
      //title must be between 1 and 25 characters
      if (this.entry.title.length < 1 || this.entry.title.length > 25) {
        this.formIsValid = false;
      }
      //entry body must be between 1 and 3,000 characters
      if (this.entry.entryBody.length < 1 || this.entry.entryBody.length > 3000) {
        this.formIsValid = false;
      }
      //pastor must not be greater than 25 characters if user decides to enter
      if (this.entry.pastor.length > 25) {
        this.formIsValid = false;
      }
      //verses cannot be longer than 50 characters
      if(this.entry.verses.length > 50) {
        this.formIsValid = false;
      }

    },
    //user submits the entry update form
    submitForm() {
      this.validateForm();
      //if invalid, do a return to prevent rest of method from executing
      if (!this.formIsValid) {
        return;
      }
      //at this point the form should be valid
      const formData = {
        title: this.entry.title,
        entryBody: this.entry.entryBody,
        pastor: this.entry.pastor,
        verses: this.entry.verses,
      };
      //call method to update the entry
      this.updateEntry(formData);

    },
  }
}
</script>
