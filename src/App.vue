<template>
  <div>
    <!-- <Drawer /> -->
    <div class="bg-white shadow-2xl w-4/5 m-auto rousnded-xl mt-14">
      <Header />
      <div class="p-5">
        <div class="flex justify-between items-center">
          <h2 class="text-3xl font-bold px-8 mb-8">All shoes</h2>
          <div class="flex gap-4">
            <select @change="onChangeSelect" class="px-3 border rounded-md outline-none py-2">
              <option value="name">Search by name</option>
              <option value="price">Search by price(cheap)</option>
              <option value="-price">Search by price(expensive)</option>
            </select>

            <div class="relative">
              <img class="absolute left-3 top-3" src="/search.svg" />
              <input
                @input="onChangeSearchInput"
                class="border py-2 pl-10 pr-4 outline-none rounded-md focus:border-gray-500"
                type="text"
                placeholder="search..."
              />
            </div>
          </div>
        </div>
        <div class="mt-8">
          <CardList :items="items" @addToFavorite="addToFavorite" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, provide, reactive, ref, watch } from 'vue'
import axios from 'axios'

import Header from './components/Header.vue'
import CardList from './components/CardList.vue'
// import Drawer from './components/Drawer.vue'

const filters = reactive({
  searchQuery: '',
  sortBy: 'title'
})
const items = ref([])

const addToFavorite = async (item) => {
  try {
    if (!item.isFavorite) {
      const obj = {
        parentId: item.id
      }
      item.isFavorite = true
      const { data } = await axios.post('https://3f3ba82986701b54.mokky.dev/favorites', obj)
      item.favoriteId = data.id
    } else {
      await axios.delete(`https://3f3ba82986701b54.mokky.dev/favorites/${item.favoriteId}`)
      item.isFavorite = false
      item.favoriteId = null
    }
  } catch (err) {
    console.error(err)
  }
}

const onChangeSearchInput = (event) => {
  filters.searchQuery = event.target.value
}

const onChangeSelect = (event) => {
  filters.sortBy = event.target.value
}
const fetchFavorites = async () => {
  try {
    const { data: favoritesData } = await axios.get('https://3f3ba82986701b54.mokky.dev/favorites')
    items.value = items.value.map((item) => {
      const favorite = favoritesData.find((favorite) => favorite.parentId === item.id)
      if (favorite) {
        return { ...item, isFavorite: true, favoriteId: favorite.id }
      }
      return item
    })
  } catch (err) {
    console.log(err)
  }
}

const fetchItems = async () => {
  try {
    const params = {
      sortBy: filters.sortBy
    }

    if (filters.searchQuery) {
      params.title = `*${filters.searchQuery}*`
    }
    const { data } = await axios.get(`https://3f3ba82986701b54.mokky.dev/items`, { params })
    items.value = data.map((obj) => ({
      ...obj,
      isFavorite: false,
      favoriteId: null,
      isAdded: false
    }))
    console.log(items.value)
  } catch (err) {
    console.log(err)
  }
}

onMounted(async () => {
  await fetchItems()
  await fetchFavorites()
})

watch(filters, fetchItems)
provide('addToFavorite', addToFavorite)
</script>

<style scoped></style>
