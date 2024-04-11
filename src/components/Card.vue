<template>
  <div
    class="relative bg-white border border-slate-200 rounded-2xl p-4 cursor-pointer transition duration-200 ease-in-out hover:-translate-y-2 hover:shadow-2xl flex flex-col h-80"
  >
    <img v-if="showFavoriteBtn" src="/like-1.svg" alt="like1" class="filter grayscale absolute top-4 left-4"/>
    <img v-if="showFavoriteBtn" :src="!isFavorite ? './like-1.svg' : './like-2.svg'" alt="like2"
         class="absolute top-4 left-4 cursor-pointer" @click="onClickFavorite" />
    <div class="foto" style="max-height: 70%; width: 70%;">
      <img :src="imageUrl" alt="sneakers" class="mt-2 ml-8" />
    </div>    

    <div class="flex-grow flex flex-col justify-between">
      <div class="s"></div>
      <div>
        <p class="mt-2">{{ title }}</p>
        <div class="flex justify-between mt-4">
          <div class="flex flex-col">
            <span class="text-slate-500">Price: <b>{{ price }} $</b></span>
          </div>
          <img v-if="showFavoriteBtn" @click="onClickAdd" :src="!isAdded ? './plus.svg' : './checked.svg'" alt="add" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  id: Number,
  title: String,
  imageUrl: String,
  price: Number,
  isFavorite: Boolean,
  isAdded: Boolean,
  onClickFavorite: Function,
  onClickAdd: Function
})

const showFavoriteBtn = Boolean(props.onClickAdd)
</script>

<style scoped>

.grayscale {
  filter: grayscale(100%);
}
</style>