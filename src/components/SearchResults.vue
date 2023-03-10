<template>
  <div class="md:mt-2 mt-12">
    <div class="flex justify-between">
      <Input @searchText="inputCallback" :placeholder="'Serie o nombre'" />
      <button @click="triggerQuery" type="button"
        class="ml-4 text-purple-500 border border-purple-500 rounded-lg py-1 px-4">
        Buscar
      </button>
    </div>

    <template v-if="loading">
      <Loading />
    </template>
    <FloatMenu />
    <template v-if="productProperties && !productProperties.length && !loading">
      <NotFound />
    </template>
    <section v-if="productProperties && productProperties.length"
      class="m-auto mt-4 flex flex-wrap justify-center w-fit max-w-fit">
      <Card v-for="item in productProperties" :item="item" class="md:mr-8 mr-2" />
    </section>
  </div>
</template>
<script lang="ts" setup>
import { useStore } from '@nanostores/vue';
import { ref, watch } from 'vue';
import { Product, SearchResponse } from '../model/product';
import {
  addSearchResults,
  countrySelected,
  orderByPrice,
  searchResults,
  storeIndexSelected,
} from '../store/results.store';
import { orderProductsByPrice } from '../common/util';
import Card from './Card.vue';
import FloatMenu from './FloatMenu.vue';
import Input from './Input.vue';
import Loading from './Loading.vue';
import NotFound from './NotFound.vue';


const loading = ref(false);
const inputText = ref('');
const productProperties = ref<Product[]>();
const $storeIndexSelected = useStore(storeIndexSelected);
const $searchResults = useStore(searchResults);
const $orderByPrice = useStore(orderByPrice);

const extractProductsFromPayload = () =>
  $searchResults.value.map((item) => item.results).flat();

const getStoreNameSelected = (index: number): string => {
  try {
    return $searchResults.value[index].store;
  } catch (error) {
    return '';
  }
};

const getProductsByStoreName = (name: string): Product[] => {
  try {
    return $searchResults.value
      .filter((item) => item.store === name)
      .map((item) => item.results)
      .flat();
  } catch (error) {
    return [];
  }
};

watch($orderByPrice, () => {
  productProperties.value = orderProductsByPrice(
    productProperties.value as Product[],
    $orderByPrice.value
  );
});
watch($storeIndexSelected, () => {
  const indexSelected = Object.values($storeIndexSelected.value);
  if (indexSelected.some((item) => String(item) === '0')) {
    productProperties.value = extractProductsFromPayload();
  } else {
    productProperties.value = indexSelected
      .map((item) => {
        const storeName = getStoreNameSelected(item - 1);
        return getProductsByStoreName(storeName);
      })
      .flat();
  }
});
const txtValidation = (txt: string) => txt.length > 3;
const inputCallback = (txt: string) => (inputText.value = txt);

const triggerQuery = async () => {
  try {
    if (!txtValidation(inputText.value)) {
      return;
    }
    loading.value = true;
    const response = await fetch(`/product/${inputText.value}/${countrySelected.get().code}.json`);
    const { search } = (await response.json()) as {
      search: SearchResponse[];
    };
    addSearchResults(search);
    productProperties.value = orderProductsByPrice(extractProductsFromPayload(), $orderByPrice.value);
    console.log(productProperties.value.length);

    loading.value = false;
  } catch (error) {
    loading.value = false;
    productProperties.value = [];
  }
  finally {
    loading.value = false;
  }

};
</script>
