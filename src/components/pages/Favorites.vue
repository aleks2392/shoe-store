<template>
  <div>
    <CardList :items="items" @add-to-favorite="addToFavorite" @add-to-cart="onClickAddPlus" />
  </div>
</template>

<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'
import CardList from '../CardList.vue'

const favorites = ref([])
onMounted(async () => {
  try {
    const { data } = await axios.get('https://3f3ba82986701b54.mokky.dev/favorites_relations=items')

    favorites.value = data
  } catch (err) {
    console.error(err)
  }
})
</script>
