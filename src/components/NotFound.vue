<template>
  <div class="flex justify-center content-center align-middle m-auto mt-40">
    <div>
      <Icon :fill="'white'" :icon="icon" class="w-20 h-20 opacity-60 m-auto" />
      <p class="text-gray-600">
        {{ disclaimer }}
      </p>
    </div>
  </div>
</template>
<script setup>
import { ICON_TYPE } from '../const/enum';
import Icon from '../icons/Icon.vue';

const icon = ICON_TYPE.WARNING;
const disclaimer = 'No se encontraron coincidencias...';
</script>
