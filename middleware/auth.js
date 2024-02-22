import { useUserStore } from '~/stores/user';
export default defineNuxtRouteMiddleware((from, to) => {
    // const user = useSupabaseUser()
    
    const userStore = useUserStore()

    if (!userStore.id && to.fullPath == '/checkout') {
        return navigateTo('/auth')
    }
})