<template>
  <div class="">
    <Input @searchText="inputCallback" />
    <template v-if="loading">
      <Loading />
    </template>

    <FloatMenu />
    <section
      v-if="productProperties && productProperties.results.length"
      class="m-auto mt-4 flex flex-wrap justify-center"
    >
      <Card
        v-for="item in productProperties.results"
        :item="item"
        class="mr-2"
      />
    </section>
  </div>
</template>
<script lang="ts">
import { useStore } from '@nanostores/vue';
import { defineComponent, ref, watch } from 'vue';
import { SearchResponse } from '../model/product';
import {
  addSearchResults,
  searchResults,
  storeIndexSelected,
} from '../store/results.store';
import Card from './Card.vue';
import FloatMenu from './FloatMenu.vue';
import Input from './Input.vue';
import Loading from './Loading.vue';

export default defineComponent({
  name: 'SearchResultsComponent',
  components: {
    Input,
    FloatMenu,
    Card,
    Loading,
  },
  setup() {
    const loading = ref(false);
    const inputText = ref('');
    const productProperties = ref();
    const $storeIndexSelected = useStore(storeIndexSelected);
    const $searchResults = useStore(searchResults);

    watch($storeIndexSelected, () => {
      productProperties.value = $searchResults.value[$storeIndexSelected.value];
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
