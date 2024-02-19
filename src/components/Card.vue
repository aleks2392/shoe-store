<template>
  <div
    class="relative bg-white border border-slate-200 rounded-2xl p-4 cursor-pointer transition hover:-translate-y-2 hover:shadow-2xl"
  >
    <div>
      <img src="/like-1.svg" alt="like1" />
      <img
        :src="!isFavorite ? './like-1.svg' : './like-2.svg'"
        alt="like1"
        class="absolute top-4 left-4"
        @click="onClickFavorite"
      />

      <img :src="imageUrl" alt="sneakers" />
      <p class="mt-2">{{ title }}</p>

      <div class="flex justify-between mt-4">
        <div class="flex flex-col">
          <span class="text-slate-500">Price:</span>
          <b>{{ price }} $</b>
        </div>
        <img @click="onClickAdd" :src="!isAdded ? './plus.svg' : './checked.svg'" alt="add" />
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  id: Number,
  title: String,
  imageUrl: String,
  price: Number,
  isFavorite: Boolean,
  isAdded: Boolean,
  onClickFavorite: Function,
  onClickAdd: Function
})
</script>
