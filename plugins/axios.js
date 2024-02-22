import axios from "axios"

export default defineNuxtPlugin((NuxtApp) => {

    axios.defaults.withCredentials = true;
    axios.defaults.withXSRFToken = true;
    axios.defaults.baseURL = import.meta.env.VITE_VUE_APP_API_URL
    
    return {
        provide: {
            axios: axios
        }
    }
})