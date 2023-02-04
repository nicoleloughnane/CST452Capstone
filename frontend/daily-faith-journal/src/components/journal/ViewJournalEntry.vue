<template>
  <h2 class="text-xl mb-5 mt-5 text-center">Journal Entry</h2>
  <div v-if="(!!entry)">
    <default-card class="m-4">
                <!-- <h3 class="text-sm">{{ entry.id }}</h3> -->
                <div class="m-6">
                  <h3 class="text-xl">{{ entry.title }}</h3>
                  <h4 class="text-base">{{ entry.entryBody }}</h4>
                  <h4 class="text-sm">{{ entry.entryDate }}</h4>
                </div>
                <div class="actions">
                  <default-button link :to="'/journalentries/edit/' + entry.id" text="Edit" class="m-2" />
                  <default-button link :to="'/journalentries/delete/' + entry.id" text="Delete" buttonType="delete" class="m-2" />
                </div>
    </default-card>
  </div>
  <div v-else>
    <h3 class="text-center">An error has occurred</h3>
  </div>
  <!--TODO: style properly-->
  <div>
  <default-button link :to="'/journalentries'" text="Go Back" buttonType="secondary" class=""/>
  </div>
</template>
<script>

import api from '../../services/api';
export default {
  //props: ['entry'],
  components: {
  },

  data() {
    return {
      entryId: this.$route.params.id,
      errorOccurred: null,
      entry: []

    }
  },
  mounted() {
    this.loadEntry();
  },
  methods: {
    async loadEntry() {
      await api().get(`/journalentry/${this.entryId}`)
        .then(response => {
          this.entry = response.data;
          console.log('entry response: ' + JSON.stringify(response.data));
        }).catch(error => {
          this.errorOccurred = error.message;
          console.log('error has occurred: ' + this.errorOccurred)
        });
    }
  }
}
</script>
<style>

</style>