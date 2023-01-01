<template>
    <li>
        <h3>{{title}}</h3>
        <h4>{{entryBody}}</h4>
        <h4>{{entryDate}}</h4>
        <div class="actions">
          <default-button link :to="postDetailsLink">View Details</default-button>
          <default-button link :to="editPostLink">Edit Post</default-button>
          <default-button link :to="deletePostLink">Delete Post</default-button>
        </div>

    </li>
</template>

<script>
export default {
    props: ['id', 'title', 'entryBody', 'entryDate'],
    computed: {
      postDetailsLink() {
        //uses the current path and adds id of specific post to the route
        return this.$route.path + '/'+ this.id
      },
      editPostLink() {
        //uses the current path and adds id of specific post to the route
        return this.$route.path + '/edit/'+ this.id
      },
      deletePostLink() {
        //uses the current path and adds id of specific post to the route
        return this.$route.path + '/delete/'+ this.id
      }
    }
}
</script>

<style scoped>
li {
  margin: 1rem 0;
  border: 1px solid #424242;
  border-radius: 12px;
  padding: 1rem;
}

h3 {
  font-size: 1.5rem;
}

h3,
h4 {
  margin: 0.5rem 0;
}

div {
  margin: 0.5rem 0;
}

.actions {
  display: flex;
  justify-content: flex-end;
}
</style>