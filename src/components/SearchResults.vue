<template>
  <div class="">
    <Input
      @searchText="inputCallback"
      :placeholder="'Serie o nombre del producto'"
    />
    <template v-if="loading">
      <Loading />
    </template>
    <FloatMenu />
    <template v-if="productProperties && !productProperties.length">
      <NotFound />
    </template>
    <section
      v-if="productProperties && productProperties.length"
      class="m-auto mt-4 flex flex-wrap justify-center w-fit max-w-fit"
    >
      <Card v-for="item in productProperties" :item="item" class="mr-2" />
    </section>
  </div>
</template>
<script lang="ts">
import { useStore } from '@nanostores/vue';
import { defineComponent, ref, watch } from 'vue';
import { Product, SearchResponse } from '../model/product';
import {
  addSearchResults,
  lowerPriceFirst,
  searchResults,
  storeIndexSelected,
} from '../store/results.store';
import Card from './Card.vue';
import FloatMenu from './FloatMenu.vue';
import Input from './Input.vue';
import Loading from './Loading.vue';
import NotFound from './NotFound.vue';

export default defineComponent({
  name: 'SearchResultsComponent',
  components: {
    Input,
    FloatMenu,
    Card,
    Loading,
    NotFound,
  },
  setup() {
    const loading = ref(false);
    const inputText = ref('');
    const productProperties = ref<Product[]>();
    const $storeIndexSelected = useStore(storeIndexSelected);
    const $searchResults = useStore(searchResults);
    const $lowerPriceFirst = useStore(lowerPriceFirst);

    const extractProductsFromPayload = () =>
      $searchResults.value.map((item) => item.results).flat();
    watch($lowerPriceFirst, () => {});
    watch($storeIndexSelected, () => {
      if (Object.values($storeIndexSelected.value).includes(0)) {
        productProperties.value = extractProductsFromPayload();
      } else {
        productProperties.value = extractProductsFromPayload().filter(
          (_item, index: number) =>
            Object.values($storeIndexSelected.value).some(
              (item) => Number(item) === Number(index + 1)
            )
        );
      }
      console.log(productProperties.value, $storeIndexSelected.value);
    });
    const txtValidation = (txt: string) => txt.length > 3;
    const inputCallback = (txt: string) => {
      inputText.value = txt;
      if (txtValidation(txt)) {
        loading.value = true;
        triggerQuery(txt);
      }
    };

    const triggerQuery = async (txt: string) => {
      const response = await fetch(`/product/${txt}.json`);
      const { search } = (await response.json()) as {
        search: SearchResponse[];
      };
      addSearchResults(search);
      productProperties.value = extractProductsFromPayload();
      loading.value = false;
    };

    return {
      loading,
      inputCallback,
      productProperties,
    };
  },
});
</script>
