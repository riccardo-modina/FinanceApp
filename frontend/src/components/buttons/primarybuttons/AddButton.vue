<script setup>
import PrimaryButton from '@/components/buttons/primarybuttons/PrimaryButton.vue';
import { RouterLink } from 'vue-router';

const props = defineProps({
  to: { type: [String, Object], default: null }
});

</script>

<template>
  <PrimaryButton
    :as="to ? RouterLink : 'button'"
    :to="to"
  >
    <i class="pi pi-plus group-hover:rotate-90 duration-500" />
    <slot />
  </PrimaryButton>
</template>
