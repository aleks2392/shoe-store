<template>
  <div>
    <h2 class="text-3xl font-bold px-8 mb-8">My Favorites Shoes</h2>
    <CardList :items="favorites" is-favorites />
  </div>
</template>

<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'
import CardList from '../CardList.vue'

const favorites = ref([])
onMounted(async () => {
  try {
    const { data } = await axios.get('https://3f3ba82986701b54.mokky.dev/favorites?_relations=items')

    favorites.value = data.map((obj) => obj.item);
  } catch (err) {
    console.error(err)
  }
})
</script>
