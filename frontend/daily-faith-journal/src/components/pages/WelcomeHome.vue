<template>
    <img src="../../assets/dailyfaithjournallogo.png" class="logo">
    <h3>Welcome!</h3>
</template>
<script>
export default {
  computed: {
    isLoggedIn() {
      return this.$store.state.isLoggedIn;
    },
  },
  mounted() {
    if(!this.isLoggedIn) {
      this.$router.replace('/login');
    } 
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