<template>
  <div>
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
      <CardList :items="items" @add-to-favorite="addToFavorite" @add-to-cart="onClickAddPlus" />
    </div>
  </div>
</template>

<script setup>
import CardList from '../CardList.vue'
import axios from 'axios'
import { inject, reactive, watch, ref, onMounted } from 'vue'

const emit = defineEmits(['update:items'])

const items = ref([])

const { cart, addToCart, removeFromCart, updateIsAdded } = inject('cart')
const filters = reactive({
  searchQuery: '',
  sortBy: 'title'
})

const onChangeSearchInput = (event) => {
  filters.searchQuery = event.target.value
}

const onClickAddPlus = (item) => {
  if (!item.isAdded) {
    addToCart(item)
  } else {
    removeFromCart(item)
  }
}

const onChangeSelect = (event) => {
  filters.sortBy = event.target.value
}

const addToFavorite = async (item) => {
  try {
    if (!item.isFavorite) {
      const obj = {
        item_id: item.id
      }
      item.isFavorite = true
      const { data } = await axios.post('https://3f3ba82986701b54.mokky.dev/favorites', obj)
      item.favoriteId = data.id
    } else {
      item.isFavorite = false
      await axios.delete(`https://3f3ba82986701b54.mokky.dev/favorites/${item.favoriteId}`)
      item.favoriteId = null
    }
  } catch (err) {
    console.error(err)
  }
}
const fetchItems = async () => {
  emit('update:items', items.value)
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
const fetchFavorites = async () => {
  try {
    const { data: favoritesData } = await axios.get('https://3f3ba82986701b54.mokky.dev/favorites')
    items.value = items.value.map((item) => {
      const favorite = favoritesData.find((favorite) => favorite.item_id === item.id)
      if (favorite) {
        return { ...item, isFavorite: true, favoriteId: favorite.id }
      }
      return item
    })
  } catch (err) {
    console.log(err)
  }
}

onMounted(async () => {
  const localCart = localStorage.getItem('cart')
  cart.value = localCart ? JSON.parse(localCart) : []

  await fetchItems()

  await fetchFavorites()

  updateIsAdded()
})

watch(filters, fetchItems)

watch(
  cart,
  () => {
    updateIsAdded()
    localStorage.setItem('cart', JSON.stringify(cart.value))
  },
  { deep: true }
)

watch(cart, () => {
  items.value = items.value.map((item) => ({
    ...item,
    isAdded: cart.value.some((cartItem) => cartItem.id === item.id)
  }))
})
</script>
