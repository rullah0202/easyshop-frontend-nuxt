<template>
    <div id="MainLayout" class="w-full fixed z-50">
        <div 
            id="TopMenu"
            class="w-full bg-[#FAFAFA] border-b md:block hidden"
        >
            <ul 
                class="
                    flex 
                    items-center 
                    justify-end
                    text-xs 
                    text-[#333333]
                    font-light 
                    px-2 
                    h-10
                    bg-[#FAFAFA] 
                    max-w-[1200px] 
                "
            >
                <li class="border-r border-r-gray-400 px-3 hover:text-[#FF4646] cursor-pointer">
                    Sell on EasyShop
                </li>
                <li class="border-r border-r-gray-400 px-3 hover:text-[#FF4646] cursor-pointer">
                    Cookie Preferences
                </li>
                <li class="border-r border-r-gray-400 px-3 hover:text-[#FF4646] cursor-pointer">
                    Help
                </li>
                <li class="border-r border-r-gray-400 px-3 hover:text-[#FF4646] cursor-pointer">
                    Buyer Protection
                </li>
                <li class="px-3 hover:text-[#FF4646] cursor-pointer">
                    <Icon name="ic:sharp-install-mobile" size="17"/>
                    App
                </li>
                <li class="px-3 hover:text-[#FF4646] cursor-pointer">
                    <NuxtLink to="/search">
                        Search
                    </NuxtLink>
                    
                </li>
                <li 
                    @mouseenter="isAccountMenu = true"
                    @mouseleave="isAccountMenu = false"
                    class="relative flex items-center px-2.5 hover:text-[#FF4646] h-full cursor-pointer"
                    :class="isAccountMenu ? 'bg-white border z-40 shadow-[0_15px_100px_40px_rgba(0,0,0,0.3)]' : 'border border-[#FAFAFA]'"
                >
                    <Icon name="ph:user-thin" size="17"/>
                    Account
                    <Icon name="mdi:chevron-down" size="15" class="ml-5"/>

                    <div 
                        id="AccountMenu" 
                        v-if="isAccountMenu"
                        class="absolute bg-white w-[220px] text-[#333333] z-40 top-[38px] -left-[100px] border-x border-b"
                    >
                        <div v-if="!userStore.id">
                            <div class="text-semibold text-[15px] my-4 px-3">Welcome to EasyShop!</div>
                            <div class="flex items-center gap-1 px-3 mb-3">
                                <NuxtLink 
                                    to="/auth"
                                    class="bg-[#FF4646] text-center w-full text-[16px] rounded-sm text-white font-semibold p-2"
                                >
                                    Login / Register
                                </NuxtLink>
                            </div>
                        </div>
                        <div class="border-b"/>
                        <ul class="bg-white ">
                            <li 
                                @click="navigateTo('/orders')"
                                class="text-[13px] py-2 px-4 w-full hover:bg-gray-200"
                            >
                            My Orders
                            </li>
                            <li 
                                v-if="userStore.id" 
                                @click="logout()"
                                class="text-[13px] py-2 px-4 w-full hover:bg-gray-200"
                            >
                                Sign out
                            </li>
                        </ul>
                        
                    </div>
                </li>
            </ul>
        </div>
        <div 
            id="MainHeader" 
            class="flex items-center w-full bg-white"
        >
            <div class="flex lg:justify-start justify-between gap-10 max-w-[1150px] w-full px-3 py-5 mx-auto">
                <NuxtLink to="/" class="min-w-[170px]">
                    <img 
                        width="170"
                        src="/EasyShop-logo.png"
                    >
                </NuxtLink>

                <div class="max-w-[700px] w-full md:block hidden">
                    <div class="relative">
                        <div class="flex items-center mt-1.5 border-2 border-[#FF4646] rounded-md w-full">
                            <input 
                                class="
                                    w-full
                                    placeholder-gray-400
                                    text-sm
                                    pl-3
                                    focus:outline-none
                                "
                                placeholder="kitchen accessories"
                                type="text"
                                v-model="searchItem"
                                @blur="searchItem=''"
                            >
                            <Icon 
                                v-if="isSearching" 
                                name="eos-icons:loading" 
                                size="25" 
                                class="mr-2"
                            />
                            <button class="flex items-center h-[100%] p-1.5 px-2 bg-[#FF4646]">
                                <Icon name="ph:magnifying-glass" size="20" color="#ffffff"/>
                            </button>
                        </div>

                        <div class="absolute bg-white max-w-[700px] h-auto w-full">
                            <div 
                                v-if="items && items.data"
                                v-for="item in items.data"
                                class="p-1"
                            >
                                <NuxtLink 
                                    :to="`/item/${item.id}`" 
                                    class="flex items-center justify-between w-full cursor-pointer hover:bg-gray-100"
                                >
                                    <div class="flex items-center">
                                        <img @click="searchItem=''" class="rounded-md" width="40" :src="item.url">
                                        <div @click="searchItem=''" class="truncate ml-2">{{ item.title }}</div>
                                    </div>
                                    <div class="truncate">${{ item.price }}</div>
                                </NuxtLink>
                            </div>
                        </div>
                    </div>
                </div>
                
                <NuxtLink 
                    to="/shoppingcart"
                    class="flex items-center"
                >
                    <button 
                        class="relative md:block hidden"
                        @mouseenter="isCartHover = true"
                        @mouseleave="isCartHover = false"
                    >
                        <span 
                            class="
                                absolute 
                                flex 
                                items-center 
                                justify-center 
                                -right-[3px] 
                                top-0 
                                bg-[#FF4646] 
                                h-[17px] 
                                min-w-[17px] 
                                text-xs 
                                text-white
                                px-0.5 
                                rounded-full
                            "
                        >
                            {{ userStore.cart.length }}
                        </span>
                        <div class="min-w-[40px]">
                            <Icon 
                                name="ph:shopping-cart-simple-light" 
                                size="33" 
                                :color="isCartHover ? '#FF4646' : ''"
                            />
                        </div>
                    </button>
                </NuxtLink>

                <button 
                    @click="userStore.isMenuOverlay = true"
                    class="md:hidden block rounded-full p-1.5 -mt-[4px] hover:bg-gray-200"
                >
                    <Icon name="radix-icons:hamburger-menu" size="33" />
                </button>
            </div>
        </div>
    </div>

    <Loading v-if="userStore.isLoading" />

    <div class="lg:pt-[150px] md:pt-[130px] pt-[80px]" />
    <slot />

    <Footer v-if="!userStore.isLoading"/>

</template>

<script setup>
import Swal from '@/sweetalert2'
import { useUserStore } from '@/stores/user';
const userStore = useUserStore()

const {$axios} = useNuxtApp()

// const user = ref(userStore.id)

// const route = useRoute()
// const router = useRouter()

let isAccountMenu = ref(false)
let isCartHover = ref(false)
let isSearching = ref(false)
let searchItem = ref('')
let items = ref(null)

const logout = async () => {
    // let res = confirm('Are you sure you want to sign out');
    let res = await Swal.fire({
        title: 'Are you sure you want to sign out?',
        text: 'You can log in again!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, sign out!',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
    });
    try {
        if (res.isConfirmed) {
            await userStore.logout()
            Swal.fire(
                        'Logged Out!',
                        'You have been logged out.',
                        'success'
                    )
            window.location.href = '/';
        }

        } catch (error) {
            console.log(error)
    }
}

const searchByName = useDebounce(async () => {
    try {
        isSearching.value = true
        items.value = await $axios.get(`/api/search-by-name/${searchItem.value}`)
        isSearching.value = false
    } catch (error) {
        console.log(error)
    }

}, 100)

watch(() => searchItem.value, async () => {
    if (!searchItem.value) { 
        setTimeout(() => {
            items.value = ''
            isSearching.value = false
            return
        }, 500)
    }
    searchByName() 
})
</script>