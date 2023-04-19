<!--display results of the users search-->
<template>
  <div class="flex flex-col items-center text-center">
    <h2 class="text-xl mb-4 mt-6">Search Results</h2>
    <!--go back to the main journal home-->
    <div class="flex justify-center mb-4">
      <default-button text="Go Back" buttonType="secondary" link :to="'/sermonnotes'" />
    </div>
    <section>
      <div class="entries">
        <!--if entries exist-->
        <div v-if="(filteredEntries.length > 1)">
          <h3>{{ filteredEntries.length }} results were found from your search of '{{ userSearchQuery }}'</h3>
          <div class="px-10 py-20">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-10">
              <SermonNoteCard v-for="entry in filteredEntries" :key="entry._id" :entry="entry" class="" />
            </div>
          </div>
        </div>

         <!--if ONE entry found based on the users search term-->
         <div v-else-if="(filteredEntries.length === 1)">
          <h3>1 entry found for your search of '{{ userSearchQuery }}'</h3>
          <div class="p-6">
      <div class="md:max-w-lg mx-auto ">
          <SermonNoteCard v-for="entry in filteredEntries" :key="entry._id" :entry="entry"  />
          </div>
          </div>
        </div>

        <!--if an entry is not found based on the users search term-->
        <div v-else-if="(filteredEntries.length === 0)">
          <h3>0 entries found for your search of '{{ userSearchQuery }}'</h3>
        </div>

        <!--if an error has occurred: network-->
        <div v-if="errorOccurred === 'Network Error'">
          <h3>There is an error on our end. Please try again later! </h3>
        </div>

      </div>
    </section>
  </div>
</template>
  
<script>
import api from '../../services/api';
import SermonNoteCard from './SermonNoteCard.vue';
const { DateTime } = require('luxon');

export default {
  name: "JournalEntryResults",
  components: {
    SermonNoteCard,
  },
  data() {
    return {
      entries: [],
      filteredEntries: [],
      userSearchQuery: this.$route.params.userSearchQuery,
      errorOccurred: null,
      userID: this.$store.state.userId,
      userToken: this.$store.state.token
    }
  },
  mounted() {
    this.loadFilteredEntries();
  },
  methods: {
    //called upon the form load.
    loadFilteredEntries() {
      //get all sermon notes
      api().get(`/sermonnote/getByUserId/${this.userID}`, {
        headers: {
          Authorization: `Bearer ${this.userToken}`,
        },
      })
        .then(response => {
          //grab the sermon note response data
          this.entries = response.data;
          //for each entry in entries
          for(let i = 0; i < this.entries.length; i++) {
            //sort the array of entries from newest to oldest
            this.entries.sort(function(a,b) {
              return DateTime.fromISO(b.entryDate) - DateTime.fromISO(a.entryDate);
            })
            //convert date to user friendly format from ISO to LocaleString
            this.entries[i].entryDate =  DateTime.fromISO(this.entries[i].entryDate).toLocaleString(DateTime.DATE_FULL);

            //format verses in a user friendly format
            this.entries[i].verses = this.entries[i].verses.join(', ')
          }
          //console.log('entry response: ' + JSON.stringify(response.data));

          //filter the entries based on search term
          this.filteredEntries = this.entries.filter(entry => {
            return entry.title.toLowerCase().includes(this.userSearchQuery.toLowerCase()) ||
              entry.entryBody.toLowerCase().includes(this.userSearchQuery.toLowerCase()) ||
              entry.pastor.toLowerCase().includes(this.userSearchQuery.toLowerCase()) ||
              entry.entryDate.toLowerCase().includes(this.userSearchQuery.toLowerCase())
          })
        }).catch(error => {
          this.errorOccurred = error.message;
          console.log('error has occurred: ' + this.errorOccurred)
        })

    }
  }
}

</script>
