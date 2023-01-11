<template>
  <div class="bg-purple-1100 p-2 mt-5 w-44 rounded-lg">
    <img :src="item.image" :alt="item.name" class="w-40 h-44" />
    <p class="text-white uppercase text-xs font-bold w-40 indent-px">
      {{ item.name }}
    </p>
    <p class="text-gray-400 text-xs mt-2">Precio</p>
    <p class="text-white font-bold text-sm">
      ${{ Number(item.price).toLocaleString() }}
    </p>
    <p class="text-gray-400 text-xs mt-2">Tienda</p>
    <p class="text-white font-bold text-sm">{{ item.seller.name }}</p>
    <footer class="flex justify-center w-full mt-2">
      <button
        @click="handleCardClick(item.itemUrl)"
        type="button"
        class="text-purple-500 border border-purple-500 rounded-lg py-1 px-3"
      >
        Ir a la tienda
      </button>
    </footer>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Product } from '../model/product';

export default defineComponent({
  name: 'CardComponent',
  props: {
    item: {
      type: Object as PropType<Product>,
      required: true,
    },
  },
  setup() {
    const handleCardClick = (url: string) => {
      const confirm = window.confirm('Estas saliendo de 4Gamingshop');
      if (confirm) {
        window.open(url, '_blank');
      }
    };

    return { handleCardClick };
  },
});
</script>
