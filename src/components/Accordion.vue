<template>
  <div class="mt-6">
    <div v-for="(item, index) in accordionItems" class="">
      <div class="flex align-middle items-center" @click="handleLabelClicked(index)">
        <!-- Arrow Icon for accordion section -->
        <Icon :fill="'white'" class="w-8 h-8 mb-2" :icon="item.icon" />
        <p :class="labelStyleHighlight(index)">
          {{ item.label }}
        </p>
        <template v-if="item.section">
          <Icon :fill="'white'" :icon="arrowDown" :class="['w-8 h-8 m-auto mr-0']" />
        </template>
      </div>
      <!-- Accordion Content -->
      <div class="flex justify-between transition-max-height overflow-hidden" :style="contentHeight(item.open)">
        <section class="transition-max-height overflow-y-scroll overflow-x-hidden" :style="contentHeight(item.open)">
          <slot :name="item.section"></slot>
        </section>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, defineProps, reactive, ref } from 'vue';
import { ICON_TYPE } from '../const/enum';
import Icon from '../icons/Icon.vue';

export default defineComponent({
  name: 'AccordionComponent',
  components: {
    Icon,
  },
  props: ['items'],
  setup({ items }) {
    const labelActive = ref(-1);
    const accordionItems = reactive(items);
    const handleLabelClicked = (index: number) => {
      if (labelActive.value === index) {
        labelActive.value = -1;
      } else {
        labelActive.value = index;
      }

      accordionItems[index].open = !accordionItems[index].open;
    };
    const contentHeight = (open: boolean) => {
      return open ? { maxHeight: '500px' } : { maxHeight: 0 };
    };
    const labelStyleHighlight = (index: number) => {
      return index === labelActive.value
        ? 'text-white font-bold capitalize'
        : 'text-gray-400 font-bold capitalize';
    };

    defineProps({
      items: {
        type: [],
        required: true,
      },
    });
    return {
      accordionItems,
      contentHeight,
      handleLabelClicked,
      arrowUp: ICON_TYPE.ARROW_UP,
      arrowDown: ICON_TYPE.ARROW_DOWN,
      labelStyleHighlight,
    };
  },
});
</script>
