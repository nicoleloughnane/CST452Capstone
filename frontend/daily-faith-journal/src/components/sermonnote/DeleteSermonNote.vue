<!--This component handles the deletion of an existing sermon note-->
<template>
    <section>
      <h2 class="text-xl mb-5 mt-5 text-center">Delete Sermon Note</h2>
      <h3 class="text-lg mb-5 mt-5 text-center">Are you sure you want to delete?</h3>
      <div class="flex flex-col items-center text-center">
        <div v-if="(!!entry)">
          <default-card class="m-4">
            <div class="m-6">
              <h3 class="text-xl">{{ entry.title }}</h3>
              <h4 class="text-sm mb-4">{{ entry.pastor }}</h4>
              <h4 class="text-base">{{ entry.entryBody }}</h4>
              <h4 class="text-sm">{{ entry.entryDate }}</h4>
            </div>
            <div>
              <!--actions the user can take - go back or confirm the deletion of the entry-->
              <default-button link :to="'/sermonnotes'" text="Go Back" buttonType="secondary" class="m-2" />
              <default-button text="Delete" buttonType="delete" class="m-2" @click="deleteEntry" />
            </div>
          </default-card>
        </div>
        <div v-else>
          <h3 class="text-center">An error has occurred</h3>
        </div>
      </div>
    </section>
  </template>
  
  <script>
  import api from '../../services/api';
  export default {
    data() {
      return {
        entryId: this.$route.params.id,
        errorOccurred: null,
        entry: [],
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
        await api().get(`/sermonnote/byEntryId/${this.userID}/${this.entryId}`)
          .then(response => {
            this.entry = response.data;
            //console.log('entry response: ' + JSON.stringify(response.data));
          }).catch(error => {
            this.errorOccurred = error.message;
            console.log('error has occurred: ' + this.errorOccurred)
          });
      },
      //called when the user presses delete button, confirming they want to delete
      async deleteEntry() {
        await api().delete(`/sermonnote/delete/${this.entryId}`)
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