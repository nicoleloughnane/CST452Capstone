<!--this component handles the user input and assigns it to value-->
<template>
    <!--two way data binding: user inputs their search query here-->
    <input type="text" :value="value" class="w-full text-lg font-normal focus:outline-none bg-brand-background " @input="handleQuery" />
</template>

<script>
export default {
    name: "QueryInput",
    data() {
        return {
            //this is the value users search query, by default it is blank/empty
            value: ""
        }
    },
    methods: {
        //event emission
        handleQuery($event) {
            this.value = $event.target.value;
            this.$emit("handleQuery", this.value);
        }

    }
}
</script>