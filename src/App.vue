<template>
  <div>
    <Drawer
      v-if="drawerOpen"
      @createOrder="createOrder"
      :totalPrice="totalPrice"
      :taxPrice="taxPrice"
    />
    <div class="bg-gray-100 shadow-2xl w-4/5 m-auto rousnded-xl mt-14 rounded-xl mb-12">
      <Header :total-price="totalPrice" @open-drawer="openDrawer" />
      <div class="p-5">
        <router-view> </router-view>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, provide, ref } from 'vue'

import Header from './components/Header.vue'
import Drawer from './components/Drawer.vue'

const items = ref([])

/* cart (start)*/
const cart = ref([])
const drawerOpen = ref(false)

const totalPrice = computed(() => cart.value.reduce((acc, item) => acc + item.price, 0))
const taxPrice = computed(() => Math.round(totalPrice.value * 0.12))

const closeDrawer = () => {
  drawerOpen.value = false
}
const openDrawer = () => {
  drawerOpen.value = true
}

const addToCart = (item) => {
  cart.value.push(item)
  item.isAdded = true
  localStorage.setItem('cart', JSON.stringify(cart.value))
}

const removeFromCart = (item) => {
  cart.value.splice(cart.value.indexOf(item), 1)
  item.isAdded = false

  localStorage.setItem('cart', JSON.stringify(cart.value))
}

const updateIsAdded = () => {
  items.value.forEach((item) => {
    item.isAdded = cart.value.some((cartItem) => cartItem.id === item.id)
  })
}

/* cart (end)*/

provide('cart', {
  cart,
  closeDrawer,
  openDrawer,
  addToCart,
  updateIsAdded,
  removeFromCart
})
</script>

<style scoped></style>
