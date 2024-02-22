<template>
  <div class="flex items-center border border-slate-300 p-4 rounded-2xl gap-4">
    <img class="w-16 h-16" :src="imageUrl" :alt="title" />

    <div class="flex flex-col flex-1">
      <p>{{ title }}</p>
      <div class="flex justify-between items-center mt-2">
        <b class="flex-1">{{ price }}$</b>
        <img
          @click="emit('onClickRemove')"
          class="opacity-50 cursor-pointer hover:opacity-100 transition ml-auto"
          src="/close.svg"
          alt="asdas"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(['onClickRemove'])

defineProps({
  id: Number,
  title: String,
  imageUrl: String,
  price: Number
})
</script>
