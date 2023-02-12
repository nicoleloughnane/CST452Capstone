<!--display results of the users search-->
<template>
  <div class="flex flex-col items-center text-center">
    <h2 class="text-xl mb-16 mt-6">Search Results</h2>

    <section>
      <div class="entries">
        <!--if entries exist-->
        <div v-if="(filteredEntries.length > 0)">
          <h3>{{ filteredEntries.length }} results were found from your search of '{{ userSearchQuery }}'</h3>
          <ul>
            <li v-for="entry in filteredEntries" :key="entry.id">

              <default-card class="m-4">
                <div class="m-6">
                  <h3 class="text-xl">{{ entry.title }}</h3>
                  <h4 class="text-base">{{ entry.entryBody }}</h4>
                  <h4 class="text-sm">{{ entry.entryDate }}</h4>
                </div>
                <!--actions the user can take: view, edit, or delete-->
                <div class="actions">
                  <default-button link :to="'/journalentries/view/' + entry.id" text="View" buttonType="primary"
                    class="m-2" />
                  <default-button link :to="'/journalentries/edit/' + entry.id" text="Edit" class="m-2" />
                  <default-button link :to="'/journalentries/delete/' + entry.id" text="Delete" buttonType="delete"
                    class="m-2" />
                </div>
              </default-card>
            </li>
          </ul>
        </div>
        <!--if an error has occurred: network-->
        <div v-if="errorOccurred === 'Network Error'">
          <h3>There is an error on our end. Please try again later! </h3>
        </div>
        <!--if an entry is not found based on the users search term-->
        <div v-else-if="(filteredEntries.length === 0)">
          <h3>0 entries found for your search of '{{ userSearchQuery }}'</h3>
        </div>
      </div>
      <!--go back to the main journal home-->
      <div class="flex justify-center my-8">
        <default-button text="Go Back" buttonType="secondary" link :to="'/journalentries'" />
      </div>
    </section>
  </div>
</template>

<script>
import api from '../../services/api';
export default {
  name: "JournalEntryResults",
  data() {
    return {
      entries: [],
      filteredEntries: [],
      userSearchQuery: this.$route.params.userSearchQuery,
      errorOccurred: null
    }
  },
  mounted() {
    this.loadFilteredEntries();
  },
  methods: {
    //called upon the form load.
    loadFilteredEntries() {
      //get all journal entries
      api().get(`/journalentry/`)
        .then(response => {
          this.entries = response.data;
          //filter the entries based on search term
          this.filteredEntries = this.entries.filter(entry => {
            return entry.title.toLowerCase().includes(this.userSearchQuery.toLowerCase() || entry.entryBody.toLowerCase().includes(this.userSearchQuery.toLowerCase()));
          })
        }).catch(error => {
          this.errorOccurred = error.message;
          console.log('error has occurred: ' + this.errorOccurred)
        })

    }
  }
}

</script>