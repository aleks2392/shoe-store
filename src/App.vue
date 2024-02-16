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
          <CardList :items="items" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref, watch } from 'vue'
import axios from 'axios'

import Header from './components/Header.vue'
import CardList from './components/CardList.vue'
// import Drawer from './components/Drawer.vue'

const filters = reactive({
  searchQuery: '',
  sortBy: 'title'
})

const items = ref([])

const onChangeSearchInput = (event) => {
  filters.searchQuery = event.target.value
}

const onChangeSelect = (event) => {
  filters.sortBy = event.target.value
}

const fetchItems = async () => {
  try {
    const params = {
      sortBy: filters.sortBy
      // searchQuery: filters.searchQuery
    }

    if (filters.searchQuery) {
      params.title = `*${filters.searchQuery}*`
    }
    const { data } = await axios.get(`https://3f3ba82986701b54.mokky.dev/items`, { params })
    items.value = data
  } catch (err) {
    console.log(err)
  }
}

onMounted(fetchItems())

watch(filters, fetchItems)
</script>

<style scoped></style>
