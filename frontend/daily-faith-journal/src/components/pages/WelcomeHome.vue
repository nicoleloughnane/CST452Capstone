<template>
  <img src="../../assets/dailyfaithjournallogo.png" class="logo">
  <div class="home">
    <h2>Welcome!</h2>
    <h4>Today is: {{todayDate}}</h4>
    <router-link to="/journalentries" class="newpagebutton">Journal</router-link>
    <router-link to="/sermonnotes" class="newpagebutton">Sermon Notes</router-link>
  </div>
</template>
<script>
const { DateTime } = require('luxon');
export default {
  data() {
    return {
      todayDate: ''
    }
  },
  computed: {
    isLoggedIn() {
      return this.$store.state.isLoggedIn;
    },
  },
  mounted() {
    this.loadForm();
    if(!this.isLoggedIn) {
      this.$router.replace('/login');
    }
  
  },
  methods: {
    loadForm() {
    //calculate the date and time 
    const dt = DateTime.now();
    const calculateDate = dt.toLocaleString(DateTime.DATETIME_MED_WITH_WEEKDAY);
    this.todayDate = calculateDate;
    
    }
  }
}

</script>
<style scoped>
 .home{
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