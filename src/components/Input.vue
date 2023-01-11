<template>
  <div class="relative">
    <Icon
      :icon="lookup"
      :fill="'white'"
      class="w-8 h1-8 absolute left-2 top-3 text-xs opacity-50 z-10"
    />
    <input
      type="text"
      class="rounded h-10 w-full bg-gray-700 pl-10 text-lg text-white z-0"
      @input="handleInputTxt"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent, defineEmits } from 'vue';
import { ICON_TYPE } from '../const/enum';
import Icon from '../icons/Icon.vue';

export default defineComponent({
  components: {
    Icon,
  },

  setup(_props, ctx) {
    const inputTxt = '';
    const handleInputTxt = (event: Event | any) => {
      ctx.emit('searchText', event.target?.value);
    };

    return { lookup: ICON_TYPE.LOOKUP, handleInputTxt, inputTxt };
  },
});
</script>
<style lang=""></style>
