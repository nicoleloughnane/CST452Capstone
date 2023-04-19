<!--This component handles the deletion of an existing sermon note-->
<template>
    <section>
      <div class="text-center">
        <h2 class="text-xl mb-5 mt-5 ">Delete Sermon Note</h2>
      <h3 class="text-lg mb-5  ">Are you sure you want to delete?</h3>

        <div v-if="(!!entry)">
          <!--beginning of card-->
          <div class="p-6">
          <div class="block rounded-2xl shadow-xl bg-white w-full text-center md:max-w-lg mx-auto">
          <div class="card-header flex items-center">
            <h3 class="text-xl font-medium my-3 text-white text-center grow ">{{ entry.title }}</h3>
        </div>
        
          <!--this allows the card to be clickable to view the details of a specific entry-->
        <div class="p-6">
              <!--Entry properties-->
          <h4 hidden>{{ entry._id }}</h4>
          <h4 class="text-sm mb-4">{{ entry.pastor }}</h4>
            <!--Bible verses-->
            <h4 v-if="entry.verses.length > 0">
            <h4 class="text-sm mb-4">{{ entry.verses }}</h4>
          </h4>
          <h4 class="text-base">{{ entry.entryBody }}</h4>
        </div>
        <h4 class="text-sm mb-4 ml-6 italic text-left">{{ entry.entryDate }}</h4>

    </div>
    <!--end of card-->
        </div>
      </div>
        <div v-else>
          <h3 class="text-center">An error has occurred</h3>
        </div>
  

      <!--actions to go back or delete-->
      <div>
          <default-button link :to="'/sermonnotes'" text="Go Back" buttonType="secondary" class="m-2" />
          <default-button text="Delete" buttonType="delete" class="m-2" @click="deleteEntry" />
        </div>
      </div> 
    </section>
  </template>
  
  <script>
  import api from '../../services/api';

  const { DateTime } = require("luxon");
  export default {
    components: {
      
    },
    data() {
      return {
        entryId: this.$route.params.id,
        errorOccurred: null,
        entry: null,
        userID : this.$store.state.userId,
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
          //convert date to user friendly format from ISO to LocaleString
          this.entry.entryDate = DateTime.fromISO(
            this.entry.entryDate
          ).toLocaleString(DateTime.DATE_FULL);
          this.entry.verses = this.entry.verses.join(', ')
          }).catch(error => {
            this.errorOccurred = error.message;
            console.log('error has occurred: ' + this.errorOccurred)
          });
      },
      //called when the user presses delete button, confirming they want to delete
      async deleteEntry() {
        await api().delete(`/sermonnote/delete/${this.entryId}`, {
          headers: {
          Authorization: `Bearer ${this.userToken}`,
        },
        })
          .then(response => {
            this.entry = response.data;
            //console.log('entry response: ' + JSON.stringify(response.data));
            this.$router.push('/sermonnotes');
          }).catch(error => {
            this.errorOccurred = error.message;
            console.log('error has occurred: ' + this.errorOccurred)
          });
  
      }
    }
  }
  </script>

  <style scoped>
  .card-header {
  border-radius: 16px;
  background-color: #775dab;
  padding-left: 6px;
  padding-right: 6px;

}
</style>