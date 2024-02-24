<template>
  <div>
    <Drawer
      v-if="drawerOpen"
      @createOrder="createOrder"
      :totalPrice="totalPrice"
      :taxPrice="taxPrice"
      :cartButtonDisabled="cartButtonDisabled"
    />
    <div class="bg-white shadow-2xl w-4/5 m-auto rousnded-xl mt-14">
      <Header :total-price="totalPrice" @open-drawer="openDrawer" />
      <div class="p-5">
        <router-view> </router-view>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, provide, ref } from 'vue'
import axios from 'axios'

import Header from './components/Header.vue'
import Drawer from './components/Drawer.vue'

const items = ref([])

/* cart (start)*/
const cart = ref([])
const isCreatingOrder = ref(false)

const drawerOpen = ref(false)

const totalPrice = computed(() => cart.value.reduce((acc, item) => acc + item.price, 0))
const taxPrice = computed(() => Math.round(totalPrice.value * 0.12))

const cartIsEmty = computed(() => cart.value.length === 0)
const cartButtonDisabled = computed(() => isCreatingOrder.value || cartIsEmty.value)

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

const createOrder = async () => {
  try {
    isCreatingOrder.value = true
    const { data } = await axios.post('https://3f3ba82986701b54.mokky.dev/orders', {
      items: cart.value,
      totalPrice: totalPrice.value
    })
    cart.value = []
    return data
  } catch (err) {
    console.error(err)
  } finally {
    isCreatingOrder.value = false
  }
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
