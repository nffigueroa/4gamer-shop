<template>
  <div>
    <div v-for="item in items">
      <span>{{ item.title }}</span>
      <Icon :fill="'white'" :icon="arrowUp" class="w-11 h-11" />
      <section class=""></section>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, defineProps } from 'vue';
import { ICON_TYPE } from '../const/enum';
import Icon from '../icons/Icon.vue';

export default defineComponent({
  name: 'AccordionComponent',
  components: {
    Icon,
  },
  props: ['items'],
  setup({ items }) {
    defineProps({
      items: {
        type: [],
        required: true,
      },
    });
    return {
      arrowUp: ICON_TYPE.ARROW_UP,
      arrowDown: ICON_TYPE.ARROW_DOWN,
    };
  },
});
</script>
