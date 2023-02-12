<!--displays just one journal entry-->
<template>
  <h2 class="text-xl mb-5 mt-5 text-center">Journal Entry</h2>
  <div v-if="(!!entry)">
    <default-card class="m-4">
      <div class="m-6">
        <h3 class="text-xl">{{ entry.title }}</h3>
        <h4 class="text-base">{{ entry.entryBody }}</h4>
        <h4 class="text-sm">{{ entry.entryDate }}</h4>
      </div>

      <!--actions the user can take: edit, or delete-->
      <div>
        <default-button link :to="'/journalentries/edit/' + entry.id" text="Edit" class="m-2" />
        <default-button link :to="'/journalentries/delete/' + entry.id" text="Delete" buttonType="delete" class="m-2" />
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
      entryId: this.$route.params.id,
      errorOccurred: null,
      entry: []
    }
  },
  //when component is loaded, call loadEntry
  mounted() {
    this.loadEntry();
  },
  methods: {
    //called upon the form load
    async loadEntry() {
      await api().get(`/journalentry/${this.entryId}`)
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
