<template>
  <div v-auto-animate class="grid grid-cols-4 gap-5">
    <Card
      v-for="item in items"
      :key="item.id"
      :id="item.id"
      :isAdded="item.isAdded"
      :title="item.title"
      :price="item.price"
      :imageUrl="item.imageUrl"
      :isFavorite="item.isFavorite"
      :onClickAdd="isFavorites ? null : () => emit('addToCart', item)"
      :onClickFavorite="isFavorites ? null : () => emit('addToFavorite', item)"
    />
  </div>
</template>

<script setup>
import Card from './Card.vue'
defineProps({
  items: Array,
  isFavorites: Boolean
})

const emit = defineEmits(['addToFavorite', 'addToCart'])
</script>
