<template>
  <svg :viewBox="`0 0 36 20`" :fill="fill" xmlns="http://www.w3.org/2000/svg">
    <component v-bind:is="icon"></component>
  </svg>
</template>
<script>
import { defineComponent } from 'vue';
import ArrowDownIcon from './ArrowDownIcon.vue';
import ArrowUpIcon from './ArrowUpIcon.vue';
import CloseIcon from './CloseIcon.vue';
import HamburgerIcon from './HamburgerIcon.vue';
import LogoIcon from './LogoIcon.vue';
import StoreIcon from './StoreIcon.vue';

export default defineComponent({
  name: 'IconComponent',
  props: ['width', 'height', 'fill', 'icon'],
  components: {
    LogoIcon,
    StoreIcon,
    CloseIcon,
    ArrowDownIcon,
    ArrowUpIcon,
    HamburgerIcon,
  },
  setup() {
    return {};
  },
});
</script>
