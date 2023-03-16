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
          <div v-if="(filteredEntries.length > 0)">
            <h3>{{ filteredEntries.length }} results were found from your search of '{{ userSearchQuery }}'</h3>
            <ul>
              <li v-for="entry in filteredEntries" :key="entry.id">
  
                  <default-card class="m-4">
                    <div class="flex justify-end">
                        <router-link :to="`/sermonnotes/edit/${entry.id}`"> <font-awesome-icon icon="fa-pencil-square"
                            class="text-3xl mr-6" /> </router-link>
                        <router-link :to="`/sermonnotes/delete/${entry.id}`"> <font-awesome-icon icon="fa-trash"
                            class="text-3xl mr-2" /> </router-link>
                      </div>
                      <div class="card cursor-pointer" @click="this.$router.push(this.$route.path + '/view/' + entry.id)">
                    <div class="m-6">
                      <h3 class="text-xl font-bold mb-4">{{ entry.title }}</h3>
                      <h4 class="text-sm mb-4">{{ entry.pastor }}</h4>
                      <h4 class="text-sm mb-4">{{ entry.entryDate }}</h4>
                      <h4 class="text-base">{{ entry.entryBody }}</h4>
                    </div>
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
        //get all sermon notes
          api().get(`/sermonnote/getByUserId/${this.userID}`)
        .then(response => {
          this.entries = response.data;
          //console.log('entry response: ' + JSON.stringify(response.data));
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
