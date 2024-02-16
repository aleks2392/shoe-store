<template>
  <div class="grid grid-cols-4 gap-5">
    <Card
      v-for="item in items"
      :key="item.id"
      :isAdded="true"
      :title="item.title"
      :price="item.price"
      :imageUrl="item.imageUrl"
      :isFavorite="true"
      :onClickAdd="onClickAdd"
    />
  </div>
</template>

<script setup>
import Card from './Card.vue'
const props = defineProps({
  items: Array
})
const onClickAdd = () => {
  alert('add')
}
</script>
