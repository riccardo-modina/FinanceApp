<script setup>
import { ref } from 'vue';

const authorName = ref('Riccardo Modina'); 
</script>

<template>
  <footer class="text-gray-600 text-center">
    <p class="text-sm mb-2 mt-2 inline-block">
        @FinanceApp - {{ authorName }}
    </p>
  </footer>
</template>