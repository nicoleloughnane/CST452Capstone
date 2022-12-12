<template>
    <img src="../assets/dailyfaithjournallogo.png" class="logo">
    <h3>Welcome!</h3>
</template>
<script>
export default {
  computed: {
    loggedInUser() {
      console.log(this.$store.state.user);
      return this.$store.state.user;
    }
  },
  mounted() {
   /* if(!this.loggedInUser) {
      this.$router.replace('/login');
    } */
  },
  methods: {
  
  }
}

</script>
<style scoped>
* {
  text-align: center;
}
.logo {
  display: flex;
  margin-left: auto;
  margin-right: auto;
  width: 300px;
  height: 300px;
}
</style>