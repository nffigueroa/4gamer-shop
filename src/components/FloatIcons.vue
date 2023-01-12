<template>
  <div>
    <Icon
      v-for="(item, index) in icons"
      :key="index"
      class="animation-float w-10 h-10 fixed"
      :icon="item.icon"
      :fill="'white'"
      :style="{ bottom: item.bottom, right: item.right }"
    />
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { ICON_TYPE } from '../const/enum';
import Icon from '../icons/Icon.vue';

const icons = ref<
  { icon: ICON_TYPE; bottom?: string; right: string; top?: string }[]
>([
  { icon: ICON_TYPE.SONY_PS, bottom: '', right: '' },
  { icon: ICON_TYPE.GAMEPAD, bottom: '', right: '' },
  { icon: ICON_TYPE.GAME_BOY, bottom: '', right: '' },
  { icon: ICON_TYPE.CONTROL, bottom: '', right: '' },
  { icon: ICON_TYPE.XBOX, bottom: '', right: '' },
  { icon: ICON_TYPE.LAPTOP, bottom: '', right: '' },
]);
const randomNumberBottom = () => Math.random() * (60 - 0) + 0;
const randomNumber = () => Math.random() * (100 - 0) + 0;
icons.value = icons.value.map((item) => ({
  icon: item.icon,
  bottom: String(`${randomNumberBottom().toFixed(0)}%`),
  right: String(`${randomNumber().toFixed(0)}%`),
}));
</script>
<style scoped>
@keyframes float-bubble {
  0% {
    opacity: 0.8;
  }

  100% {
    bottom: 100%;
    opacity: 0;
  }
}
.animation-float {
  opacity: 0;
  z-index: -10;
  animation: 6s 2s infinite float-bubble;
}
</style>
