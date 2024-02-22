<template>
    <div class="text-center text-[28px] mb-4 font-bold">Sign up</div>

    <div class="px-6 pb-2">
        <TextInput 
            placeholder="Full name"
            v-model:input="name"
            inputType="text"
            :autoFocus="true"
            :error = "errors && errors.name ? errors.name[0]: ''"
        />
    </div>

    <div class="px-6 pb-2">
        <TextInput 
            placeholder="Email address"
            v-model:input="email"
            inputType="email"
            :error = "errors && errors.email ? errors.email[0]: ''"
        />
    </div>

    <div class="px-6 pb-2">
        <TextInput 
            placeholder="Password"
            v-model:input="password"
            inputType="password"
            :error = "errors && errors.password ? errors.password[0]: ''"
        />
    </div>

    <div class="px-6 pb-2">
        <TextInput 
            placeholder="Confirm password"
            v-model:input="confirmPassword"
            inputType="password"
        />
    </div>
    <div class="px-6 text-[12px] text-gray-600">Forgot password?</div>

    <div class="px-6 pb-2 mt-6">
        <button 
            :disabled="(!name || !email || !password || !confirmPassword)"
            :class="(!name || !email || !password || !confirmPassword) ? 'bg-gray-200' : 'bg-[#F02C56]'"
            @click="register()" 
            class="w-full text-[17px] font-semibold text-white bg-[#F02C56] py-3 rounded-sm"
        >
            Sign up
            <Icon v-if="isRegister" name="eos-icons:loading" size="25"/>
        </button>
    </div>
</template>

<script setup>
import { useUserStore } from '~~/stores/user';
const userStore = useUserStore()

const router = useRouter()

let isRegister = ref(false)

let name = ref(null)
let email = ref(null)
let password = ref(null)
let confirmPassword = ref(null)
let errors = ref(null)

const register = async () => {
    errors.value = null
    isRegister.value = true

    try {
        await userStore.getTokens()
        await userStore.register(
            name.value, 
            email.value, 
            password.value, 
            confirmPassword.value
        )
        isRegister.value = false
        await userStore.getUser()
        router.push('/')
    } catch (error) {
        console.log(error)
        isRegister.value = false
        errors.value = error.response.data.errors 
    }
}
</script>