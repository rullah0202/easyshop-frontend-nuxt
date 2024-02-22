<template>

    <div id="OrdersPage" class="mt-4 max-w-[1200px] mx-auto px-2 min-h-[50vh]">
        <div class="bg-white w-full p-6 min-h-[150px]">
            <div class="flex items-center text-xl">
                <Icon name="carbon:delivery" color="#5FCB04" size="35"/>
                <span class="pl-4">Orders</span>
            </div>
            <div 
                v-if="orders && orders.data.orders" 
                v-for="order in orders.data.orders" 
                class="text-sm pl-[50px]"
            >
                <div class="border-b py-1">
                    <p>Stripe ID: {{ order.payment_intent }}</p>
                    <p>Name: {{ order.user.name }}</p>


                    <div class="pt-2"></div>

                    <div v-for="item in JSON.parse(order.items)">
                        <NuxtLink 
                            class="flex items-center gap-3 p-1 hover:underline hover:text-blue-500" 
                            :to="`/item/${item.id}`"
                        >
                            <img width="40" :src="`${userStore.appApiURL}` + item.url">
                            {{ item.title }}
                        </NuxtLink>
                    </div>

                    <div class="pt-2 pb-5" v-if="orders && orders.data.address" >
                        Delivery Address: {{ orders.data.address.name }}, {{ orders.data.address.address }}, {{ orders.data.address.zipcode }}, {{ orders.data.address.city }}, {{ orders.data.address.country }}
                    </div>
                </div>
            </div>

            <div v-else class="flex items-center justify-center">
                You have no order history
            </div>
        </div>
    </div>

</template>

<script setup>

import { useUserStore } from '~/stores/user';
const userStore = useUserStore()

const {$axios} = useNuxtApp()

let orders = ref(null)

onBeforeMount(async () => {
    orders.value = await $axios.get(`/api/get-orders-by-user`)
})

onMounted(() => {
    if (!userStore.id) {
        return navigateTo('/auth')
    }

    setTimeout(() => userStore.isLoading = false, 200)
})
</script>