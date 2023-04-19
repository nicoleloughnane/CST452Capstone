<template>
    <div class="block rounded-2xl shadow-xl bg-white w-full text-center">
          <div class="card-header">
 
            <h3 class="text-xl font-medium mt-4 mb-4 text-white text-center grow ml-24">{{ entry.title }}</h3>

            <div class="header-icons">
          <router-link :to="`/sermonnotes/edit/${entry._id}`"> <Icon icon="material-symbols:edit-square-outline" class=" mr-6 text-white" width="32"
                  height="30" /> </router-link>
          <router-link :to="`/sermonnotes/delete/${entry._id}`"> <Icon icon="ion:trash-outline" width="32" height="32" class=" mr-4 text-white" /> </router-link>
        </div>
        </div>
        
          <!--this allows the card to be clickable to view the details of a specific entry-->
        <div class="card cursor-pointer p-6" @click="this.$router.push('/sermonnotes/view/' + entry._id)">
              <!--Entry properties-->
          <h4 hidden>{{ entry._id }}</h4>

          <h4 class="text-sm mb-4">{{ entry.pastor }}</h4>

          <!--Bible verses-->
          <h4 v-if="entry.verses.length > 0">
            <h4 class="text-sm mb-4">{{ entry.verses }}</h4>
          </h4>

          <h4 class="text-base">{{ entry.entryBody }}</h4>
        </div>
        <h4 class="text-sm mb-4 ml-6 italic text-left">{{ entry.entryDate }}</h4>


    </div>


</template>
<script>
import { Icon } from '@iconify/vue';

export default {
  name: "SermonNoteCard",
  components: {
    Icon
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
}

</script>

<style scoped>
  .card-header {
    display: flex;
    border-radius: 16px;
    background-color: #775DAB;
    justify-content: space-between; 
    align-items: center;
    
  }

  .header-icons {
    display:flex;
  }
</style>

