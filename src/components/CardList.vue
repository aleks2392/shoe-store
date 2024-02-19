<template>
  <div class="grid grid-cols-4 gap-5">
    <Card
      v-for="item in items"
      :key="item.id"
      :id="item.id"
      :isAdded="true"
      :title="item.title"
      :price="item.price"
      :imageUrl="item.imageUrl"
      :isFavorite="item.isFavorite"
      :onClickAdd="onClickAdd"
      :onClickFavorite="() => emit('addToFavorite', item)"
    />
  </div>
</template>

<script setup>
import Card from './Card.vue'
defineProps({
  items: Array
})

const emit = defineEmits(['addToFavorite'])
const onClickAdd = () => {
  alert('add')
}
</script>
