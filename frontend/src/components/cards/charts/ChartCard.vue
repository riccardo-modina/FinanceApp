<script setup>

const props = defineProps({
  chart: Object,
  chartProps: {
    type: Object,
    default: () => ({})
  },
  chartEvents: {
    type: Object,
    default: () => ({})
  }
})
</script>

<template>
  <div 
    @click="props.chartEvents.click?.()"
    class="bg-card-background rounded-2xl flex items-center justify-center h-full min-h-80 shadow-sm border border-menuborder/50 cursor-pointer hover:border-primary/30 transition-colors"
  >
    <!-- We use @click.stop on the component to avoid double clicks if both capture the event, 
         but we ensure that clicking on the chart itself opens the modal -->
    <component 
      :is="chart" 
      class="flex w-full h-full p-6"  
      v-bind="chartProps" 
      @click.stop="props.chartEvents.click?.()"
    />
  </div>
</template>
