<template>
  <div :class="`fixed z-10 top-0 left-0 ${templateHeight}`">
    <div
      class="pt-10 transition-transform delay-75 h-screen w-screen p-4 rounded bg-purple-1000 text-white overflow-hidden"
      :style="menuStyleTransition">
      <Slider @handleSliderClicked="handleSliderClicked" :sliderValues="['Menor Precio', 'Mayor Precio']"
        :leftOptionSelected="$orderByPrice" />
      <Accordion :items="accordionItems">
        <template v-slot:countries>
          <div v-for="(item, index) in countries" :key="index"
            class="flex ml-16 align-middle items-center w-full border-l border-gray-400"
            @click="handleLabelSelectedCountry(index)">
            <p :class="`text-gray-400 font-bold ml-8 p-2 mt-1 w-auto h-auto ${selectedStyle(
              index,
              'country'
            )} flex align-middle content-center`">
              {{ item.name }}
            </p>

            <Icon :icon="item.icon" class="w-10 h-10 m-auto mr-0" />
          </div>
        </template>
        <template v-slot:stores>
          <div v-if="search" v-for="(item, index) in search" :key="index" :id="`${index}`"
            class="flex ml-16 align-middle items-center w-full border-l border-gray-400">
            <div @click="handleLabelSelectedStore" :class="[
              'text-gray-400 font-bold ml-8 p-2 mt-1 w-auto h-auto flex align-middle content-center',
              { 'rounded-lg bg-slate-700 text-white': item.selected },
            ]" :key="index + 'store'" :id="`${index}`">
              {{ item.store }}
              <p class="text-gray-400 text-xs m-auto pl-1">
                ({{ item.totalProducts }})
              </p>
            </div>
          </div>
        </template>
      </Accordion>
    </div>
    <!-- FLoating Icon -->
    <div class="m-auto z-10">
      <div class="absolute top-0 right-2 m-auto w-11 h-11 rounded-full text-white z-10" style="margin-right: 0">
        <Icon :fill="'white'" class="w-11 h-11 fixed -right-2 z-10" :icon="showCloseOrStoreIcon"
          @click="handleMenuClick" />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, reactive, ref, watch } from 'vue';
import Icon from '../icons/Icon.vue';
import { ICON_TYPE } from '../const/enum';
import { COUNTRIES } from '../const/countries';
import Slider from './Slider.vue';
import Accordion from './Accordion.vue';
import {
  orderByPrice,
  searchResults,
  storeIndexSelected,
} from '../store/results.store';
import { useStore } from '@nanostores/vue';
import { SearchResponse, SearchResults } from '../model/product';
import { getTotalProductsFromResponse } from '../common/util';

export default defineComponent({
  name: 'FloatMenu',
  components: {
    Icon,
    Slider,
    Accordion,
  },
  setup() {
    const templateHeight = ref('h-0 overflow-hidden w-0');
    const indexCountrySelected = ref();
    const storesResults = ref<SearchResults[]>([]);
    const $searchResults = useStore(searchResults);
    const $orderByPrice = useStore(orderByPrice);
    const accordionItems = reactive([
      {
        section: 'countries',
        label: 'Pais',
        icon: ICON_TYPE.LOCATION,
        open: false,
      },
      {
        section: '',
        label: 'Arma tu Pc',
        icon: ICON_TYPE.LAPTOP,
        open: false,
      },
      {
        section: '',
        label: 'Califica una tienda',
        icon: ICON_TYPE.THUMBS_UP,
        open: false,
      },
    ]);

    const handleSliderClicked = (index: number) => {
      console.log('Se guardo', Boolean(index));

      orderByPrice.set(Boolean(index));
    };
    const handleLabelSelectedCountry = (index: number) => {
      indexCountrySelected.value = index;
    };

    const handleLabelSelectedStore = (event: any) => {
      const { id } = event.target;
      if (typeof id === 'undefined' || !id) {
        return;
      }
      if (id === '0') {
        const newResult = storesResults.value.map((item) => ({
          ...item,
          selected: false,
        }));
        storeIndexSelected.set([]);
        storesResults.value = newResult;
      } else {
        const newResult = storesResults.value;
        newResult[0].selected = false;
        storesResults.value = newResult;
      }
      if (storeIndexSelected.get().includes(id)) {
        const newResult = storesResults.value;
        newResult[id].selected = false;
        storesResults.value = newResult;
        storeIndexSelected.set(
          storeIndexSelected.get().filter((item) => item !== id)
        );
      } else {
        const newResult = storesResults.value;
        newResult[id].selected = true;
        storesResults.value = newResult;
        storeIndexSelected.set([...storeIndexSelected.get(), id]);
      }
    };

    const selectedStyle = (index: number, type: string) => {
      return index === indexCountrySelected.value
        ? 'rounded-lg bg-slate-700 text-white'
        : '';
    };

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

    const handleMenuClick = () => {
      menu.open = !menu.open;
      if (menu.open) {
        templateHeight.value = 'h-screen w-0';
      }
    };

    watch($searchResults, () => {
      const storeAlreadyExists = accordionItems.some(
        (item) => item.label === 'Tiendas'
      );
      if ($searchResults.value && !storeAlreadyExists) {
        accordionItems.push({
          section: 'stores',
          label: 'Tiendas',
          icon: ICON_TYPE.STORE,
          open: false,
        });
        const finalResults = $searchResults.value.map(
          ({ store, results, totalProducts }) => ({
            store,
            results,
            totalProducts,
            selected: false,
          })
        );
        finalResults.unshift({
          store: 'Ver Todos',
          results: [],
          selected: true,
          totalProducts: getTotalProductsFromResponse(
            $searchResults.value as SearchResponse[]
          ),
        });
        storesResults.value = finalResults as SearchResults[];
      }
    });

    return {
      showCloseOrStoreIcon,
      handleMenuClick,
      menuStyleTransition,
      countries: COUNTRIES,
      handleLabelSelectedCountry,
      handleLabelSelectedStore,
      selectedStyle,
      accordionItems,
      templateHeight,
      search: storesResults,
      $orderByPrice,
      handleSliderClicked,
    };
  },
});
</script>
