<template>
  <div class="flex justify-center">
    <div class="block rounded-2xl shadow-xl bg-white w-4/5">
      <div class="p-6 text-center">
        <div class="m-4">
          <!--Entry properties-->
          <h3 class="text-xl font-bold mb-4">{{ entry.title }}</h3>
          <h4 class="text-sm mb-4">{{ entry.entryDate }}</h4>
          <h4 class="text-base">{{ entry.entryBody }}</h4>
        </div>

        <div class="actions">
          <default-button link :to="this.$route.path + '/view/' + entry.id" text="View" buttonType="primary"
            class="m-2" />
          <default-button link :to="this.$route.path + '/edit/' + entry.id" text="Edit" class="m-2" />
          <default-button link :to="this.$route.path + '/delete/' + entry.id" text="Delete" buttonType="delete"
            class="m-2" />
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

