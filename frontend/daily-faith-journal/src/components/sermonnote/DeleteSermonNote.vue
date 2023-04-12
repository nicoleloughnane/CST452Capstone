<!--This component handles the deletion of an existing sermon note-->
<template>
    <section>
      <div class="flex flex-col items-center text-center">
        <h2 class="text-xl mb-5 mt-5 ">Delete Sermon Note</h2>
      <h3 class="text-lg mb-5  ">Are you sure you want to delete?</h3>
        <div v-if="(!!entry)">
          <default-card class="m-4">
            <div class="m-6">
              <h3 class="text-xl font-bold mb-4 mt-2">{{ entry.title }}</h3>
              <h4 class="text-sm mb-4">{{ entry.pastor }}</h4>
              <h4 class="text-sm mb-4">{{ entry.entryDate }}</h4>
              <h4 class="text-base">{{ entry.entryBody }}</h4>
            </div>
            <div>

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
    components: {
      
    },
    data() {
      return {
        entryId: this.$route.params.id,
        errorOccurred: null,
        entry: [],
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
            //console.log('entry response: ' + JSON.stringify(response.data));
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