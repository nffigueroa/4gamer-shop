<template>
  <div class="relative w-screen">
    <Icon :icon="lookup" :fill="'white'" class="w-8 h1-8 absolute left-2 top-3 text-xs opacity-50 z-0" />
    <input type="text" :placeholder="placeholder"
      class="w-full mr-4 rounded h-10 bg-gray-700 pl-10 text-lg text-white z-0" @input="handleInputTxt" />
  </div>
</template>
<script lang="ts" setup>
import { defineEmits } from 'vue';
import { ICON_TYPE } from '../const/enum';
import Icon from '../icons/Icon.vue';
const lookup = ICON_TYPE.LOOKUP;
const emit = defineEmits(['searchText']);

const { placeholder } = defineProps(['placeholder']);

const handleInputTxt = (event: Event | any) => {
  emit('searchText', event.target?.value);
};
</script>
