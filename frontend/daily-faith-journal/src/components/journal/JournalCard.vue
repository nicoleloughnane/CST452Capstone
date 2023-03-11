<template>
  <div class="flex justify-center">
    <div class="block rounded-2xl shadow-xl bg-white w-4/5">
      <div class="p-6 text-center">
        <div class="m-4">
          <div class="flex justify-end">
          <router-link :to="`${this.$route.path}/edit/${entry._id}`"> <font-awesome-icon icon="fa-pencil-square" class="text-3xl mr-6" /> </router-link>
          <router-link :to="`${this.$route.path}/delete/${entry._id}`"> <font-awesome-icon icon="fa-trash" class="text-3xl mr-2" /> </router-link>
        </div>
          <!--this allows the card to be clickable to view the details of a specific entry-->
        <div class="card cursor-pointer" @click="this.$router.push(this.$route.path + '/view/' + entry._id)">
              <!--Entry properties-->
          
          <h3 class="text-xl font-bold mb-4">{{ entry.title }}</h3>
          <h4 hidden>{{ entry._id }}</h4>
          <h4 class="text-sm mb-4">{{ entry.entryDate }}</h4>
          <h4 class="text-base">{{ entry.entryBody }}</h4>
        </div>
        </div>

      </div>
    </div>
  </div>

</template>
<script>

export default {
  name: "JournalCard",
  components: {

  },
  //Each card requires an instrument object
  props: {
    entry: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {};
  },
  //Method to emit delete event to parent component
  //Utilizes the instrument's id to delete the instrument
  methods: {

  },
};
</script>

