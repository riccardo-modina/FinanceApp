<script setup>
import AdminSettings from '../components/maincomponents/settings/AdminSettings.vue';
import MainComponent from '../components/maincomponents/MainComponent.vue';
</script>

<template>
    <MainComponent
        :mainComponent="AdminSettings"
        :showTopSection="true"
        topSectionTitle="Amministrazione"
    />
</template>

<style scoped>
</style>
