<!--displays just one journal entry-->
<template>
  <h2 class="text-xl mb-5 mt-5 text-center">Journal Entry</h2>
  <div v-if="(!!entry)">
    <default-card class="flex text-center m-4">
      <div class="flex justify-end">
          <router-link :to="`/journalentries/edit/${entry.id}`"> <font-awesome-icon icon="fa-pencil-square" class="text-3xl mr-6" /> </router-link>
          <router-link :to="`/journalentries/delete/${entry.id}`"> <font-awesome-icon icon="fa-trash" class="text-3xl " /> </router-link>
        </div>
      <div class="m-6">
        <h3 class="text-xl mb-4 font-bold">{{ entry.title }}</h3>
        <h4 class="text-sm mb-4">{{ entry.entryDate }}</h4>
        <h4 class="text-base">{{ entry.entryBody }}</h4>
      </div>
    </default-card>
  </div>
  <div v-else>
    <h3 class="text-center">An error has occurred</h3>
  </div>

  <!--let user go back to home page-->
  <div class="flex justify-center">
    <default-button link :to="'/journalentries'" text="Go Back" buttonType="secondary" class="" />
  </div>
</template>

<script>
import api from '../../services/api';
export default {
  data() {
    return {
      entryId: this.$route.params._id,
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
      await api().get(`/journalentry/byEntryId/${this.userID}/${this.entryId}`)
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
