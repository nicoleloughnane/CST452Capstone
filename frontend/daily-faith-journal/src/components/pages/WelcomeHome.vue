<!--this is the main home page that user is taken to once they have logged in-->
<template>
  <img src="../../assets/dailyfaithjournallogo.png" class="logo">
  <div class="home">
    <h2 class="text-xl m-2 font-medium">Welcome!</h2>
    <h4 class="text-base mb-2">Today is: </h4>
    <h4 class="text-base mb-6">{{todayDate}} </h4>

    <default-button link :to="'/journalentries'" text="Journal" buttonType="primary" class="m-2" />
    <default-button link :to="'/sermonnotes'" text="Sermon Notes" buttonType="primary" class="m-2" />

    <h4 class="text-base my-6">Need help?</h4>
    <default-button link :to="'/help'" text="Help Center" buttonType="primary" class="m-2" />
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