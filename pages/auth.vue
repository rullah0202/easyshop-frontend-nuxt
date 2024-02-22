<template>
    <div>
        <div class="w-full flex items-center bg-[#FAFAFA] justify-center p-5 border-b border-b-gray-300">
            <NuxtLink to="/" class="min-w-[170px]">
                <img width="170" src="/EasyShop-logo.png">
            </NuxtLink>
        </div>

        <div class="mt-4 max-w-[500px] mx-auto px-2">
            <div class="mx-auto bg-white rounded-lg p-3">
                <div class="text-xl text-bold mb-2">Login / Register</div>

                <!-- <button 
                    @click="login('google')"
                    class="
                        flex 
                        items-center 
                        justify-center 
                        gap-3
                        p-1.5
                        w-full 
                        border 
                        hover:bg-gray-100
                        rounded-full
                        text-lg
                        font-semibold
                    "
                >
                    <img class="w-full max-w-[30px]" src="/google-logo.png">
                    <div>Google</div>
                </button>

                <button 
                    @click="login('github')"
                    class="
                    mt-4
                        flex 
                        items-center 
                        justify-center 
                        gap-3
                        p-1.5
                        w-full 
                        border 
                        hover:bg-gray-100
                        rounded-full
                        text-lg
                        font-semibold
                    "
                >
                    <img class="w-full max-w-[30px]" src="/github-logo.png">
                    <div>Github</div>
                </button> -->
                <Login v-if="isRegister" />
                <Register v-else />

                <div class="absolute flex items-center justify-center py-5 left-0 bottom-0 border-t w-full">
                    <span class="text-[14px] text-gray-600">Dont have an account?</span>
                    <button 
                        @click="isRegister = !isRegister" 
                        class="text-[14px] text-[#F02C56] font-semibold pl-1"
                    >
                        <span v-if="isRegister">Sign up</span>
                        <span v-else>Log in</span>
                    </button>
            </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useUserStore } from '~~/stores/user';
const userStore = useUserStore()

// const user = ref(userStore.id)

let isRegister = ref(true)

definePageMeta({
    layout: 'auth'
})
watchEffect(() => {
    if (userStore.id) {
        return navigateTo('/')
    }
})

const login = async (prov) => {
//   const { data, error } = await client.auth.signInWithOAuth({
//     provider: prov,
//     redirectTo: window.location.origin
//   })
}
</script>