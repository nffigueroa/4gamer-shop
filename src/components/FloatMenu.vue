<template>
  <div class="fixed z-10 h-screen w-screen top-0 left-0">
    <div
      class="pt-10 transition-transform delay-75 h-screen w-screen p-4 rounded bg-purple-1000 text-white overflow-hidden"
      :style="menuStyleTransition"
    >
      <Slider :sliderValues="['Mayor Precio', 'Menor Precio']" />
      <ul>
        <li>Pais</li>
        <li>Tiendas</li>
        <li>Arma tu pc</li>
        <li>Califica una tienda</li>
      </ul>
      <!-- <p class="capitalize" v-for="item in search.search">{{ item.store }}</p> -->
    </div>
    <!-- FLoating Icon -->
    <div class="m-auto z-10">
      <div
        class="absolute top-0 right-2 m-auto w-11 h-11 rounded-full text-white z-10"
        style="margin-right: 0"
      >
        <Icon
          :fill="'white'"
          class="w-11 h-11 absolute -right-2 z-10"
          :icon="showCloseOrStoreIcon"
          @click="handleMenuClick"
        />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, reactive, onMounted, ref, Ref } from 'vue';
import Icon from '../icons/Icon.vue';
import { ICON_TYPE } from '../const/enum';
import { SearchResponse } from '../model/product';
import Slider from './Slider.vue';

export default defineComponent({
  name: 'FloatMenu',
  components: {
    Icon,
    Slider,
  },
  setup() {
    const product: Ref<{ search: SearchResponse[] }> = ref({ search: [] });
    onMounted(async () => {
      const response = await fetch('/product/3070.json');
      const json = (await response.json()) as { search: SearchResponse[] };
      product.value.search = json.search;
    });

    const menu = reactive({
      open: false,
      icon: ICON_TYPE.STORE,
    });
    const showCloseOrStoreIcon = computed(() => {
      return menu.open ? ICON_TYPE.CLOSE : ICON_TYPE.HAMBURGER;
    });
    const menuStyleTransition = computed(() => {
      const menuOpenedStyle = { transform: 'translateX(0)' };
      const menuClosedStyle = { transform: 'translateX(200%)' };
      return menu.open ? menuOpenedStyle : menuClosedStyle;
    });

    const handleMenuClick = () => (menu.open = !menu.open);

    return {
      open: false,
      showCloseOrStoreIcon,
      handleMenuClick,
      menuStyleTransition,
      search: product.value,
    };
  },
});
</script>
