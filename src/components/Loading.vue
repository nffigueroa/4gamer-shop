<template>
  <div class="text-gray-400 font-bold">
    <div class="flex justify-center content-center align-middle m-auto mt-40">
      <svg
        class="animate-spin -ml-1 mr-3 h-5 w-5 text-purple-500"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
      <div class="animate-pulse">Consultando resultados....</div>
    </div>
  </div>
</template>
<script>
import { defineComponent } from 'vue';

export default defineComponent({ name: 'LoadingComponent' });
</script>
