<!--displays just one sermon note-->
<template>
    <h2 class="text-xl mb-5 mt-5 text-center">Sermon Note</h2>
    <div v-if="(!!entry)">
      <SermonNoteCard :key="entry._id" :entry="entry" class="" />
    </div>
    <div v-else>
      <h3 class="text-center">An error has occurred</h3>
    </div>
  
    <!--let user go back to home page-->
    <div class="flex justify-center">
      <default-button link :to="'/sermonnotes'" text="Go Back" buttonType="secondary" class="mt-3"  />
    </div>
  </template>
  
  <script>
  import api from '../../services/api';
import SermonNoteCard from './SermonNoteCard.vue';
  export default {
    components: {
    SermonNoteCard
},
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
      //called upon the form load
      async loadEntry() {
        await api().get(`/sermonnote/byEntryId/${this.userID}/${this.entryId}`)
          .then(response => {
            this.entry = response.data;
            //console.log('entry response: ' + JSON.stringify(response.data));
          }).catch(error => {
            this.errorOccurred = error.message;
            console.log('error has occurred: ' + this.errorOccurred)
          });
      }
    }
  }
  </script>
  