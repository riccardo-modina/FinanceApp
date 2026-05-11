import { defineStore } from "pinia";
import { ref, watch, computed } from 'vue';
import { getUserProfile, updateUserProfile } from '../apicalls/apiCalls';

export const useSettingsStore = defineStore('settings', () => {
  const currencyFormat = ref(localStorage.getItem('currencyFormat') || 'it-IT')
  const currencySymbol = ref(localStorage.getItem('currencySymbol') || 'EUR')
  const defaultMenuOpen = ref(localStorage.getItem('defaultMenuOpen') === 'true')
  const dataPeriod = ref(localStorage.getItem('dataPeriod') || new Date().getFullYear().toString())

  const loading = ref(false)
  const initialized = ref(false)

  async function fetchSettings() {
    if (!localStorage.getItem('authToken')) return
    
    loading.value = true
    try {
      const profile = await getUserProfile()
      if (profile && profile.ui_settings) {
        const s = profile.ui_settings
        if (s.currencyFormat) currencyFormat.value = s.currencyFormat
        if (s.currencySymbol) currencySymbol.value = s.currencySymbol
        if (s.defaultMenuOpen !== undefined) defaultMenuOpen.value = s.defaultMenuOpen
        if (s.dataPeriod) dataPeriod.value = s.dataPeriod
        
        // sync to localstorage for offline/initial load fallback
        syncToLocalStorage()
      }
    } catch (err) {
      console.error("Error loading user settings from DB:", err)
    } finally {
      loading.value = false
      initialized.value = true
    }
  }

  let saveTimeout = null;
  async function saveSettings() {
    // Only save to DB if we are already initialized (don't overwrite DB with local defaults during boot)
    if (!initialized.value || !localStorage.getItem('authToken')) return
    
    if (saveTimeout) clearTimeout(saveTimeout);
    
    saveTimeout = setTimeout(async () => {
      try {
        await updateUserProfile({
          ui_settings: {
            currencyFormat: currencyFormat.value,
            currencySymbol: currencySymbol.value,
            defaultMenuOpen: defaultMenuOpen.value,
            dataPeriod: dataPeriod.value
          }
        })
        syncToLocalStorage()
      } catch (err) {
        // Axios might throw an error if the request is canceled, though we handle it with debounce
        if (err.name !== 'CanceledError') {
          console.error("Error saving user settings to DB:", err)
        }
      } finally {
        saveTimeout = null;
      }
    }, 500); // 500ms debounce to avoid spamming the backend
  }

  function syncToLocalStorage() {
     localStorage.setItem('currencyFormat', currencyFormat.value)
     localStorage.setItem('defaultMenuOpen', defaultMenuOpen.value)
     localStorage.setItem('dataPeriod', dataPeriod.value)
     localStorage.setItem('currencySymbol', currencySymbol.value)
  }

  // Watch for changes to save them to DB
  watch([currencyFormat, defaultMenuOpen, dataPeriod, currencySymbol], () => {
    saveSettings()
  }, { deep: true })

  const displayCurrencySymbol = computed(() => {
    const formatter = new Intl.NumberFormat(currencyFormat.value, {
      style: 'currency',
      currency: currencySymbol.value,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });
    const parts = formatter.formatToParts(1);
    return parts.find(p => p.type === 'currency')?.value || currencySymbol.value;
  })

  return { 
    currencyFormat, 
    defaultMenuOpen, 
    dataPeriod, 
    currencySymbol, 
    displayCurrencySymbol,
    fetchSettings,
    loading
  }
})