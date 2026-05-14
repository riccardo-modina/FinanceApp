<script setup>
import { ref, computed, watch } from 'vue'
import DatePicker from 'primevue/datepicker'

const props = defineProps({
  timeFrame: String
})

const selectedDate = ref(new Date())

const mode = ref(props.timeFrame?.includes('/') ? 'monthYear' : 'year') 

watch(() => props.timeFrame, (newVal) => {
  if (!newVal || newVal === 'Totale') {
    selectedDate.value = null
    return
  }
  if (newVal.includes('/')) {
    const [month, year] = newVal.split('/')
    selectedDate.value = new Date(parseInt(year), parseInt(month) - 1, 1)
  } else {
    // Check if it's a valid year string
    const year = parseInt(newVal)
    if (!isNaN(year)) {
      selectedDate.value = new Date(year, 0, 1)
    } else {
      selectedDate.value = null
    }
  }
}, { immediate: true })

const currentYear = computed (() => new Date().getFullYear());
const currentMonth = computed (()=> new Date().getMonth() + 1);
const timeFrameError = ref(false);

const emit = defineEmits(['updateYear', 'updateMonthYear'])

function isFutureTimeFrame(timeFrame, source) {
    if (source === 'year') {
        const year = parseInt(timeFrame);
        return year > currentYear.value
    }

    if (source === 'monthYear') {
        const year = parseInt(timeFrame.year);
        const month = parseInt(timeFrame.month);

        if (year > currentYear.value) {
            return true;
        }
        if (year === currentYear.value && month > currentMonth.value) {
            return true;
        }
    }
    return false;
}

// --- event emit functions ---
function confirmYear(date) {
  if(isFutureTimeFrame(date.getFullYear(), 'year')) {
    
    timeFrameError.value = true;
    return;
  }

  if (timeFrameError.value) {
    timeFrameError.value = false;
  }

  if (date instanceof Date) {
    emit('updateYear', date.getFullYear())
  }
}

function confirmMonthYear(date) {

  if(isFutureTimeFrame({ month: date.getMonth() + 1, year: date.getFullYear() }, 'monthYear')) {
    timeFrameError.value = true;
    return;
  }

  if (timeFrameError.value) {
    timeFrameError.value = false;
  }

  if (date instanceof Date) {
    emit('updateMonthYear', {
      month: date.getMonth() + 1,
      year: date.getFullYear()
    })
  }
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <!-- Switch modalità -->
    <div class="flex gap-2">
      <button
        class="px-4 py-2 rounded-lg text-sm font-medium cursor-pointer hover:bg-primary-clear"
        :class="mode === 'year' ? 'bg-primary text-white' : ' text-gray-600'"
        @click="mode = 'year'"
      >
        Seleziona Anno
      </button>
      <button
        class="px-4 py-2 rounded-lg cursor-pointer hover:bg-primary-clear text-sm font-medium"
        :class="mode === 'monthYear' ? 'bg-primary text-white' : ' text-gray-600'"
        @click="mode = 'monthYear'"
      >
        Seleziona Mese/Anno
      </button>
    </div>

    <!-- Picker Dinamico -->
    <div>
      <DatePicker
        :key="mode"
        v-model="selectedDate"
        :view="mode === 'year' ? 'year' : 'month'"
        :dateFormat="mode === 'year' ? 'yy' : 'mm/yy'"
        append-to="body"
        :placeholder="props.timeFrame === 'Totale' ? 'Totale' : (mode === 'year' ? 'Seleziona Anno' : 'Mese/Anno')"
        @update:modelValue="mode === 'year' ? confirmYear($event) : confirmMonthYear($event)"
        input-class="w-full px-3 py-2 focus:outline-none text-center text-lg font-medium cursor-pointer bg-primary-light/80 border border-gray-200 rounded-lg shadow-sm"
        :pt="{
          panel: 'bg-white shadow-2xl border border-gray-200 rounded-2xl p-6 w-[320px]',
          header: 'flex justify-between items-center text-text mb-4',
          title: 'text-xl font-bold flex items-center gap-1',
          prevbutton: 'text-gray-500 hover:text-primary hover:bg-gray-100 rounded-full p-2 transition',
          nextbutton: 'text-gray-500 hover:text-primary hover:bg-gray-100 rounded-full p-2 transition',
          yearView: 'flex flex-wrap justify-center gap-1',
          monthView: 'flex flex-wrap justify-center gap-1',
          year: 'w-[85px] py-2 flex items-center justify-center hover:bg-primary hover:text-white rounded-xl cursor-pointer transition text-center text-lg font-normal',
          month: 'w-[85px] py-2 flex items-center justify-center hover:bg-primary hover:text-white rounded-xl cursor-pointer transition text-center text-lg font-normal',
          yearSelected: 'bg-primary text-white font-bold rounded-xl',
          monthSelected: 'bg-primary text-white font-bold rounded-xl'
        }"
      />
    </div>

    <div
      v-if="timeFrameError" 
      class="text-negative text-sm flex">
         impossibile selezionare periodi futuri - RIPROVARE
    </div>
  </div>
</template>
