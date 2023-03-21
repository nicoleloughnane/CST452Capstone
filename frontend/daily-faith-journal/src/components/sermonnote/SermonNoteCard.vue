<template>
  <div class="flex justify-center">
    <div class="block rounded-2xl shadow-xl bg-white w-full">
      <div class="p-6 text-center">
        <div class="m-4">
          <div class="flex justify-end">
          <router-link :to="`/sermonnotes/edit/${entry._id}`"> <font-awesome-icon icon="fa-pencil-square" class="text-3xl mr-6 text-brand-darkpurple" /> </router-link>
          <router-link :to="`/sermonnotes/delete/${entry._id}`"> <font-awesome-icon icon="fa-trash" class="text-3xl  text-brand-darkpurple" /> </router-link>
        </div>
          <!--this allows the card to be clickable to view the details of a specific entry-->
        <div class="card cursor-pointer" @click="this.$router.push('/sermonnotes/view/' + entry._id)">
              <!--Entry properties-->
              <h4 hidden>{{ entry._id }}</h4>
          <h3 class="text-xl font-bold mb-4 mt-2">{{ entry.title }}</h3>
          <h4 class="text-sm mb-4">{{ entry.pastor }}</h4>
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
  name: "SermonNoteCard",
  components: {

  },
  //Each card requires a sermon note object
  props: {
    entry: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {};
  },
};
</script>

