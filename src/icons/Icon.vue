<template>
  <svg :viewBox="`0 0 36 20`" :fill="fill" xmlns="http://www.w3.org/2000/svg">
    <component v-bind:is="icon"></component>
  </svg>
</template>
<script>
import { defineComponent } from 'vue';
import ArgentinaIcon from './ArgentinaIcon.vue';
import ArrowDownIcon from './ArrowDownIcon.vue';
import ArrowUpIcon from './ArrowUpIcon.vue';
import ChileIcon from './ChileIcon.vue';
import CloseIcon from './CloseIcon.vue';
import ColombiaIcon from './ColombiaIcon.vue';
import HamburgerIcon from './HamburgerIcon.vue';
import LocationIcon from './LocationIcon.vue';
import LogoIcon from './LogoIcon.vue';
import LookupIcon from './LookupIcon.vue';
import MexicoIcon from './MexicoIcon.vue';
import PeruIcon from './PeruIcon.vue';
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
    ArgentinaIcon,
    MexicoIcon,
    PeruIcon,
    ChileIcon,
    ColombiaIcon,
    LocationIcon,
    LookupIcon,
  },
  setup() {
    return {};
  },
});
</script>
