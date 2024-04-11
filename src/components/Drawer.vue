<template>
  <div>
    <div class="fixed top-0 left-0 w-full h-full w-full bg-black z-10 opacity-70"></div>
    <div class="bg-white w-96 h-full fixed right-0 top-0 z-20 p-5">
      <DrawerHead />

      <div v-if="!totalPrice || orderId" class="flex items-center h-full">
        <InfoBlock
          v-if="!totalPrice && !orderId"
          title="Your cart is empty"
          description="Please add at least one pair of sneakers to order."
          imageUrl="./package-icon.png"
        />
        <InfoBlock
          v-if="orderId"
          title="Order shipped"
          :description="`Your order #${orderId} will soon be transferred to the courier service.`"
          imageUrl="./order-success-icon.png"
        />
      </div>

      <div v-else>
        <CartItemList />

        <div сlass="flex flex-col gap-4 ">
          <div class="flex gap-2 mb-2 my-7">
            <span>Total price: </span>
            <div class="flex-1 border-b border-dashed"></div>
            <b> {{ totalPrice }} $</b>
          </div>

          <div class="flex gap-2">
            <span>Tax: 12%: </span>
            <div class="flex-1 border-b border-dashed"></div>
            <b> {{ taxPrice }} $</b>
          </div>
          <button
            :disabled="ButtonDisabled"
            @click="createOrder"
            class="cursor-pointer transition bg-blue-500 w-full rounded-xl py-3 text-white disabled:bg-slate-300 mt-5 hover:bg-blue-600 active:bg-blue-700"
          >
            Payment
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import DrawerHead from './DrawerHead.vue'
import CartItemList from './CartItemList.vue'
import InfoBlock from './InfoBlock.vue'
import axios from 'axios';
import { ref, computed, inject } from 'vue'

const props = defineProps({
  totalPrice: Number,
  taxPrice: Number
})

const { cart } = inject('cart')

const isCreatingOrder = ref(false)
const orderId = ref(null)


const createOrder = async () => {
  if(cart.value.length === 0) return; 

  isCreatingOrder.value = true
  try {
    const { data } = await axios.post('https://3f3ba82986701b54.mokky.dev/orders', {
      items: cart.value,
      totalPrice: props.totalPrice
    })
    orderId.value = data.id
    cart.value = []
  } catch (err) {
    console.error(err)
  } finally {
    isCreatingOrder.value = false
  }
}

const cartIsEmty = computed(() => cart.value.length === 0)
const ButtonDisabled = computed(() => isCreatingOrder.value || cartIsEmty.value)

</script>
