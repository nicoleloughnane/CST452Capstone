<!--this is the help center for if a user needs help using the application-->
<template>
    <div class="flex flex-col items-center text-center">
      <h2 class="text-xl mt-16 font-medium">Help Center</h2>
      <p class="text-lg mt-6">Welcome to the help center. If you need help using Daily Faith Journal, you are in the right place. Please read below for guidance. Thanks! </p>
      <h3 class="text-lg mt-6 font-medium">Journal Entries</h3>
      <img
                src="../../assets/journalentrycard.png"
                class="card"
            />
      <p class="text-sm mt-2 mx-6">This is an example of a journal entry that you can create. It can be created using the green "create entry"
        button on the journal entry home page. Selecting a mood is optional. The title and body must not be empty. You can press the green create button to create 
      or if at any time you want to cancel the process, you can press go back to be taken back to the home. If you made a mistake, you can press the "pencil and paper" icon
    to edit the entry. If you no longer want to keep an entry, you can press the "trash can" icon to remove it. You will be prompted with a confirmation and options to "delete" or "go back,"
  in case you pressed the trash can by accident. The date that the journal entry was created cannot be changed. </p>
        <h3 class="text-lg mt-6 font-medium ">Sermon Notes</h3>
      <img
                src="../../assets/sermonnotecard.png"
                class="card"
            />
            <p class="text-sm mt-2 mx-6 mb-6">This is an example of a sermon note that you can create. It can be created using the green "create entry"
        button on the sermon note home page. The title and body must not be empty but the pastor is optional. You can press the green create button to create 
      or if at any time you want to cancel the process, you can press go back to be taken back to the home. If you made a mistake, you can press the "pencil and paper" icon
    to edit the entry. If you no longer want to keep an entry, you can press the "trash can" icon to remove it. You will be prompted with a confirmation and options to "delete" or "go back,"
  in case you pressed the trash can by accident. The date that the sermon note was created cannot be changed. </p>
    </div>
  </template>
  <script>

  export default {
    data() {
      return {

      }
    },
    computed: {
     
    },
    mounted() {
  
    
    },
    methods: {
 
    }
  }
  
  </script>
  <style scoped>
   .help{
    text-align: center;
    margin: 24px;
  }
  .card {
  width: 450px;
  height: 280px;
}
  </style>