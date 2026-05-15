<script setup>
import ChartCard from './ChartCard.vue';
import { useSettingsStore } from '../../../stores/settings';

const settings = useSettingsStore();

const props = defineProps({
  // riceve oggetti { component: Component, props: Object } dal genitore
  leftChart: { type: Object, required: true },
  rightChart: { type: Object, required: true },
  height: { type: String, default: 'h-80' }
})

</script>

<template>
    <div 
      :class="[
        'gap-4 w-full', 
        settings.chartsLayout === 'stack' ? 'flex flex-col h-auto' : ['grid grid-cols-1 lg:grid-cols-2', height]
      ]"
    >
        <div 
          :class="[
            'w-full',
            settings.chartsLayout === 'stack' ? 'h-[400px] lg:h-[450px]' : 'h-full min-h-80'
          ]"
        >
            <ChartCard
                :chart="leftChart.component"
                :chartProps="leftChart.props || {}"
                :chartEvents="leftChart.on || {}"
            />
        </div>
        <div 
          :class="[
            'w-full',
            settings.chartsLayout === 'stack' ? 'h-[400px] lg:h-[450px]' : 'h-full min-h-80'
          ]"
        >
            <ChartCard
                :chart="rightChart.component"
                :chartProps="rightChart.props || {}"
                :chartEvents="rightChart.on || {}"
            />
        </div>    
    </div>
</template>