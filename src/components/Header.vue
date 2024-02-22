<template>
  <header class="flex justify-between border-b border-slate-300 px-8 py-4">
    <div class="flex items-center gap-4">
      <img src="/logo.png" alt="logo" class="w-14" />
      <div>
        <h2 class="text-xl font-bold uppercase">Shoe Store</h2>
        <p class="text-slate-400">Discription</p>
      </div>
    </div>

    <ul class="flex items-center gap-8">
      <li
        @click="() => emit('openDrawer')"
        class="flex items-center cursor-pointer gap-3 text-gray-500 hover:text-black"
      >
        <img src="/cart.svg" alt="cart" />
        <b>{{ totalPrice }} $</b>
      </li>

      <li class="flex items-center cursor-pointer gap-3 text-gray-500 hover:text-black">
        <img src="/heart.svg" alt="alt" />
        <span>Favorite</span>
      </li>

      <li class="flex items-center cursor-pointer gap-3 text-gray-500 hover:text-black">
        <img src="/profile.svg" alt="alt" />
        <span>Profile </span>
      </li>
    </ul>
  </header>
</template>

<script setup>
const emit = defineEmits(['openDrawer'])

defineProps({
  totalPrice: Number
})
</script>
