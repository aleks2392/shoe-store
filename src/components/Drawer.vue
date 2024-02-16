<template>
  <div>
    <div class="fixed top-0 left-0 w-full h-full w-full bg-black z-10 opacity-70"></div>
    <div class="bg-white w-96 h-full fixed right-0 top-0 z-20 p-5">
      <DrawerHead />
      <CartItemList />

      <div сlass="flex flex-col gap-4 ">
        <div class="flex gap-2 mb-2 my-7">
          <span>Сумма: </span>
          <div class="flex-1 border-b border-dashed"></div>
          <b> 1220 $</b>
        </div>

        <div class="flex gap-2">
          <span>НАЛОГ 17%: </span>
          <div class="flex-1 border-b border-dashed"></div>
          <b> 220 $</b>
        </div>
        <button
          disabled=""
          class="cursor-pointer transition bg-blue-500 w-full rounded-xl py-3 text-white disabled:bg-slate-300 mt-5 hover:bg-blue-600 active:bg-blue-700"
        >
          button
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import DrawerHead from './DrawerHead.vue'
import CartItemList from './CartItemList.vue'
</script>
