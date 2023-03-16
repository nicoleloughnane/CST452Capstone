<!--display results of the users search-->
<template>
  <div class="flex flex-col items-center text-center">
    <h2 class="text-xl mb-4 mt-6">Search Results</h2>
    <!--go back to the main journal home-->
    <div class="flex justify-center mb-4">
      <default-button text="Go Back" buttonType="secondary" link :to="'/journalentries'" />
    </div>
    <section>
      <div class="entries">
        <!--if entries were found-->
        <div v-if="(filteredEntries.length > 0)">
          <h3>{{ filteredEntries.length }} results were found from your search of '{{ userSearchQuery }}'</h3>
          <journal-card v-for="entry in filteredEntries" :key="entry._id" :entry="entry" class="m-4" />
        </div>

         <!--if an entry is not found based on the users search term-->
         <div v-else-if="(filteredEntries.length === 0)">
          <h3>0 entries found for your search of '{{ userSearchQuery }}'</h3>
        </div>

        <!--if an error has occurred: network-->
        <div v-if="errorOccurred === 'Network Error'">
          <h3>There is an error on our end. Please try again later! </h3>
        </div>

        <!--else if no entries exist-->
        <div v-else-if="(entries.length === 0)">
          <h3>No journal entries were found. How about creating one? </h3>
        </div>

       
      </div>
    </section>
  </div>
</template>

<script>
import api from '../../services/api';
import JournalCard from './JournalCard.vue';

export default {
  name: "JournalEntryResults",
  components: {
    JournalCard,
  },
  data() {
    return {
      entries: [],
      filteredEntries: [],
      userSearchQuery: this.$route.params.userSearchQuery,
      errorOccurred: null,
      userID: this.$store.state.userId 
    }
  },
  mounted() {
    this.loadFilteredEntries();
  },
  methods: {
    //called upon the form load.
    loadFilteredEntries() {
      //get all journal entries
        api().get(`/journalentry/getByUserId/${this.userID}`)
        .then(response => {
          this.entries = response.data;
         //filter the entries based on search term
         this.filteredEntries = this.entries.filter(entry => {
            return entry.title.toLowerCase().includes(this.userSearchQuery.toLowerCase()) ||
             entry.entryBody.toLowerCase().includes(this.userSearchQuery.toLowerCase()) ||
             entry.entryDate.toLowerCase().includes(this.userSearchQuery.toLowerCase())
          })
          //console.log('filtered entries: ' + JSON.stringify(this.filteredEntries))
        }).catch(error => {
          this.errorOccurred = error.message;
          console.log('error has occurred: ' + this.errorOccurred)
        })

    } 
  }
}

</script>