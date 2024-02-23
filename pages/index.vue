<template>
    <div id="IndexPage" class="mt-4 max-w-[1200px] mx-auto px-2">
        <div class="grid xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4 font-poppins">
            <div v-if="products" v-for="product in products.data" :key="product">
                <ProductComponent :product="product"/>
            </div>
        </div>
    </div>
</template>

<script setup>

import { useUserStore } from '~/stores/user';
const userStore = useUserStore()

const { $axios } = useNuxtApp()

let products = ref(null)

onBeforeMount( async() => {
    products.value = await $axios.get(`/api/get-all-products`)
    setTimeout(() => userStore.isLoading = false, 1000);
})
// const products = [
//     { id: 1 , title: 'First Product', description: 'First Product Description', url: 'https://picsum.photos/id/1/800/800' , price: 9999 },
//     { id: 2 , title: 'First Product', description: 'First Product Description', url: 'https://picsum.photos/id/2/800/800' , price: 9999 },
//     { id: 3 , title: 'First Product', description: 'First Product Description', url: 'https://picsum.photos/id/3/800/800' , price: 9999 },
//     { id: 4 , title: 'First Product', description: 'First Product Description', url: 'https://picsum.photos/id/4/800/800' , price: 9999 },
//     { id: 5 , title: 'First Product', description: 'First Product Description', url: 'https://picsum.photos/id/5/800/800' , price: 9999 },
//     { id: 6 , title: 'First Product', description: 'First Product Description', url: 'https://picsum.photos/id/6/800/800' , price: 9999 },
//     { id: 7 , title: 'First Product', description: 'First Product Description', url: 'https://picsum.photos/id/7/800/800' , price: 9999 },
//     { id: 8 , title: 'First Product', description: 'First Product Description', url: 'https://picsum.photos/id/8/800/800' , price: 9999 },
//     { id: 9 , title: 'First Product', description: 'First Product Description', url: 'https://picsum.photos/id/9/800/800' , price: 9999 },
//     { id: 10 , title: 'First Product', description: 'First Product Description', url: 'https://picsum.photos/id/10/800/800' , price: 9999 }
// ]
</script>
