<!--default card with little customization-->
<!--referenced from https://tailwind-elements.com/docs/standard/components/cards/-->
<template>
    <div class="flex justify-center">
        <div class="block rounded-2xl shadow-xl bg-white max-w-sm ">
            <div class="p-6">
                <h5 class="text-gray-900 font-medium mb-2">
                    <slot></slot>
                </h5>
            </div>
        </div>
    </div>
</template> 