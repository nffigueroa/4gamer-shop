<template>
  <div class="relative">
    <img :src="lookup" class="absolute left-1 top-2 text-xs z-10 opacity-50" />
    <input
      type="text"
      class="rounded absolute h-10 w-full bg-gray-700 pl-10 text-lg text-white"
      @input="$emit('searchText')"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent, defineEmits } from 'vue';
import Lookup from '../icons/lookup.svg';
export default defineComponent({
  setup(props: { callback: (txt: any) => Event }) {
    const { callback } = props;
    const emitText = defineEmits(['searchText']);
    console.log(props);
    const handleInputTxt = (event: Event) => {
      console.log(callback);
      callback(event);
    };

    return { lookup: Lookup, handleInputTxt, emitText };
  },
});
</script>
<style lang=""></style>
