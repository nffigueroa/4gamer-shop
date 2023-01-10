<template>
  <div class="flex w-full justify-center border-b border-white">
    <div class="pr-1">
      <IconComponent :fill="'white'" class="h-5 w-9" :icon="icon" />
    </div>
    <h4 class="text-white font-title uppercase text-tl">{{ title }}</h4>
  </div>
</template>
<script>
import { defineComponent } from 'vue';
import { ICON_TYPE } from '../const/enum';
import IconComponent from '../icons/Icon.vue';

export default defineComponent({
  name: 'HeaderComponent',
  components: { IconComponent },

  data() {
    return {
      title: '4gamingshop',
      icon: ICON_TYPE.LOGO,
    };
  },
});
</script>
