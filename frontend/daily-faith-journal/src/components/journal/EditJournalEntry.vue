<!--This component handles updating an existing journal entry-->
<template>
    <div class="flex flex-col items-center">
    <h2 class="text-xl my-10">Edit Journal Entry</h2>
    <section>
    <default-card>
      <!--on form submit, calls submitForm method, located in scripts-->
      <form @submit.prevent="submitForm">
        <!--these form controls are for the user to update journal entry information -->
        <div class="mood">
            <label for="Mood" class="form-label text-brand-gray text-l mr-1 ">Mood:</label>
            <br />
            <div class="flex flex-row">
              <!--happy-->
              <div v-if="entry.mood == 'happy'">
              <input type="radio" id="happy" name="emotionradio" value="happy" @change="onChange($event)" checked >
              <label for="happy"><Icon icon="tabler:mood-happy" width="32" height="32" class="text-brand-darkpurple" /></label>
              </div>
              <div v-else>
                <input type="radio" id="happy" name="emotionradio" value="happy" @change="onChange($event)" >
              <label for="happy"><Icon icon="tabler:mood-happy" width="32" height="32" class="text-brand-darkpurple" /></label>
              </div>

              <!--content-->
              <div v-if="entry.mood == 'content'">
              <input type="radio" id="content" name="emotionradio" value="content" @change="onChange($event)" checked>
              <label for="content"><Icon icon="tabler:mood-smile" width="32" height="32" class="text-brand-darkpurple" /></label>
              </div>
              <div v-else>
                <input type="radio" id="content" name="emotionradio" value="content" @change="onChange($event)">
              <label for="content"><Icon icon="tabler:mood-smile" width="32" height="32" class="text-brand-darkpurple" /></label>
              </div>

              <div v-if="entry.mood == 'okay'">
              <!--okay-->
              <input type="radio" id="okay" name="emotionradio" value="okay" @change="onChange($event)" checked>
              <label for="okay"><Icon icon="uil:meh" width="32" height="32" class="text-brand-darkpurple" /></label>
            </div>
            <div v-else>
              <input type="radio" id="okay" name="emotionradio" value="okay" @change="onChange($event)">
              <label for="okay"><Icon icon="uil:meh" width="32" height="32" class="text-brand-darkpurple" /></label>
            </div>
            </div>
            <br/>
            <div class="flex">
              <!--upset-->
              <div v-if="entry.mood == 'upset'">
              <input type="radio" id="upset" name="emotionradio" value="upset" @change="onChange($event)" checked >
              <label for="upset"><Icon icon="tabler:mood-sad-squint" width="32" height="32" class="text-brand-darkpurple"/></label>
            </div>
            <div v-else>
              <input type="radio" id="upset" name="emotionradio" value="upset" @change="onChange($event)"  >
              <label for="upset"><Icon icon="tabler:mood-sad-squint" width="32" height="32" class="text-brand-darkpurple"/></label>
            </div>
              <!--sad-->
              <div v-if="entry.mood == 'sad'">
              <input type="radio" id="sad" name="emotionradio" value="sad" @change="onChange($event)" checked>
              <label for="sad"><Icon icon="tabler:mood-sad" width="32" height="32" class="text-brand-darkpurple" /></label>
            </div>
            <div v-else>
              <input type="radio" id="sad" name="emotionradio" value="sad" @change="onChange($event)">
              <label for="sad"><Icon icon="tabler:mood-sad" width="32" height="32" class="text-brand-darkpurple" /></label>
            </div>
              <!--distressed-->
              <div v-if="entry.mood == 'distressed'">
              <input type="radio" id="distressed" name="emotionradio" value="distressed" @change="onChange($event)" checked>
              <label for="distressed"><Icon icon="tabler:mood-cry" width="32" height="32" class="text-brand-darkpurple"/></label>
            </div>
            <div v-else>
              <input type="radio" id="distressed" name="emotionradio" value="distressed" @change="onChange($event)">
              <label for="distressed"><Icon icon="tabler:mood-cry" width="32" height="32" class="text-brand-darkpurple"/></label>
            </div>
            </div>
           
          </div>
          <br/>
          
      <!--v-model binds with data in return statement, trim gets rid of excess whitespace-->

          <div class="mb-3">
            <label for="title" class="form-label text-brand-gray text-l mr-1 ">Title: </label>
            <br />
            <input type="text" id="title" v-model.trim="entry.title"
              class="form-control outline outline-1 outline-brand-darkpurple rounded-md mb-2" placeholder="" />
          </div>

          <div class="mb-3 ">
            <label for="entryBody" class="form-label text-brand-gray text-l mr-1 ">Entry Body: </label>
            <br />
            <textarea id="entryBody" v-model.trim="entry.entryBody" rows="10"
              class="form-control outline outline-1 outline-brand-darkpurple rounded-md mb-2"
              placeholder=""> </textarea>
          </div>

          <!--displays if an error has occurred-->
          <p class="text-brand-red text-md" v-if="!formIsValid">Body of title and entry body not be empty</p>

          <!--actions the user can take - go back or submit the form-->
          <div>
            <default-button link :to="'/journalentries'" text="Go Back" buttonType="secondary" class="m-2" />
            <default-button text="Update" buttonType="primary" class="m-2 ml-4" />
          </div>

      </form>
    </default-card>

  </section>
</div>
</template>

<script>
import api from '../../services/api';
import { Icon } from '@iconify/vue';
export default {
  components:{
    Icon
  },
  data() {
    return {
      formIsValid: true,
      entryId: this.$route.params._id,
      errorOccurred: null,
      entry: [],
      mood: {
        val: '',
      },
      userID : this.$store.state.userId
    }
  },
  //when component is loaded, call loadEntry
  mounted() {
    this.loadEntry();
  },
  methods: {
    //get one entry by its ID
    async loadEntry() {
      await api().get(`/journalentry/byEntryId/${this.userID}/${this.entryId}`)
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
      await api().put(`/journalentry/update/${this.userID}/${this.entryId}`, formData)
        .then(response => {
          this.editResponse = response.data;
          //console.log('edit response: ' + JSON.stringify(response.data));
          this.$router.push('/journalentries');
        }).catch(error => {
          this.errorMessage = error.message;
          console.log('edit failed: ' + this.errorMessage);
        })
    },
    onChange(event) {
      var emotion = event.target.value;
      this.mood.val = emotion;
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
        mood: this.mood.val
      };
      //call method to update the entry
      this.updateEntry(formData);

    },
  }
}
</script>

