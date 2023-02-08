<!--Component made using tailwind css for a search bar and search icon, along with input to enter search query-->
<template>
    <form class="flex h-10 w-full mb-6 items-center rounded-2xl border border-solid border-brand-darkpurple">
        <font-awesome-icon :icon="['fas', 'search']" class="mx-3"/>

        <div class="flex flex-1 flex-nowrap h-full text-base font-light">
            <div class="flex h-full flex-1 relative items-center pr-3 mx-3 just">
                <label class="absolute -top-10 ">Search For An Entry</label>
                <input type="text" placeholder="keywords" class="w-full text-lg font-normal focus:outline-none "/>
            </div>
        </div>

        <!--submit the form to search for an entry-->
    <default-button text="Search" buttonType="search" class="rounded-r-2xl"  />

    </form>
</template>
<script>
    export default {
        name: "MySearchBar"
    }
</script>
