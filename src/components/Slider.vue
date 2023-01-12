<template>
  <div
    class="border border-slate-100 rounded-lg flex justify-around relative h-10 align-middle items-center"
  >
    <div
      v-for="(item, index) in sliderValues"
      :key="index"
      @click="handleSliderSelection(index)"
      class="w-1/2 text-center"
    >
      {{ item }}
    </div>
    <div
      class="h-5/6 w-1/2 bg-gray-700 absolute left-0 -z-10 rounded-lg ml-0.5 transition delay-75"
      :style="optionSelectedStyle"
    ></div>
  </div>
</template>
<script lang="ts" setup>
import { computed, defineProps, onMounted, ref } from 'vue';

const { sliderValues, leftOptionSelected } = defineProps([
  'sliderValues',
  'leftOptionSelected',
]);

const currentSelection = ref(0);
const handleSliderSelection = (index: number) =>
  (currentSelection.value = index);

onMounted(() => {
  if (leftOptionSelected) {
    handleSliderSelection(0);
  }
});

const optionSelectedStyle = computed(() => ({
  transform: `translateX(${currentSelection.value ? '100%' : 0})`,
}));
</script>
