<template>
    <div id="ItemPage" class="mt-4 max-w-[1200px] mx-auto px-2">
        <div class="md:flex gap-4 justify-between mx-auto w-full">
            <div class="md:w-[40%]">
                <img 
                    v-if="currentImage"
                    class="rounded-lg object-fit"
                    :src="currentImage"
                >
                <div v-if="images[0] !== ''" class="flex items-center justify-center mt-2">
                    <div v-for="image in images">
                        <img 
                            @mouseover="currentImage = image"
                            @click="currentImage = image"
                            width="70"
                            class="rounded-md object-fit border-[3px] cursor-pointer"
                            :class="currentImage === image ? 'border-[#FF5353]' : ''"
                            :src=image
                        >
                    </div>
                </div>
            </div>
            <div class="md:w-[60%] bg-white p-3 rounded-lg" v-if="product && product.data.product">
                <div >
                    <p class="mb-2">{{ product.data.product.title }}</p>
                    <p class="font-light text-[12px] mb-2">{{ product.data.product.description }}</p>
                </div>

                <div class="flex items-center pt-1.5">
                    <span class="h-4 min-w-4 rounded-full p-0.5 bg-[#FFD000] mr-2">
                        <Icon name="material-symbols:star-rounded" class="-mt-[17px]" size="12"/>
                    </span>
                    <p class="text-[#FF5353]">Extra 5% off</p>
                </div>

                <div class="flex items-center justify-start my-2">
                    <Icon name="ic:baseline-star" color="#FF5353"/>
                    <Icon name="ic:baseline-star" color="#FF5353"/>
                    <Icon name="ic:baseline-star" color="#FF5353"/>
                    <Icon name="ic:baseline-star" color="#FF5353"/>
                    <Icon name="ic:baseline-star" color="#FF5353"/>
                    <span class="text-[13px] font-light ml-2">5 213 Reviews 1,000+ orders</span>
                </div>

                <div class="border-b" />

                <div class="flex items-center justify-start gap-2 my-2">
                    <div class="text-xl font-bold">$ {{ product.data.product.price }}</div>
                    <span class="bg-[#F5F5F5] border text-[#C08562] text-[9px] font-semibold px-1.5 rounded-sm">70% off</span>
                </div>

                <p class="text-[#009A66] text-xs font-semibold pt-1">
                    Free 11-day delivery over ￡8.28
                </p>

                <p class="text-[#009A66] text-xs font-semibold pt-1">
                    Free Shipping
                </p>

                <div class="py-2"/>

                <button 
                    @click="addToCart()"
                    :disabled="isInCart"
                    class="
                        px-6 
                        py-2 
                        rounded-lg 
                        text-white 
                        text-lg 
                        font-semibold 
                        bg-gradient-to-r 
                        from-[#FF851A] 
                        to-[#FFAC2C]
                    "
                >
                    <div v-if="isInCart">Is Added</div>
                    <div v-else>Add to Cart</div>
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>

import { useUserStore } from '~/stores/user';

const {$axios} = useNuxtApp()
const userStore = useUserStore()

const route = useRoute()

let product = ref(null)
let currentImage = ref(null)

onBeforeMount(async () => {

    try {
        product.value = await $axios.get(`/api/get-product-by-id/${route.params.id}`)

        if (!product.value) {
            throw createError({
                statusCode: 404,
                statusMessage: 'Page Not Found',
                fatal: true
            })
        }
    } catch (error) {
        console.log(error)
    }

})

watchEffect(() => {
    if (product.value && product.value.data.product) {
        currentImage.value = `${userStore.appApiURL}` + product.value.data.product.url
        images.value[0] = `${userStore.appApiURL}` + product.value.data.product.url
        userStore.isLoading = false
    }
})


const isInCart = computed(() => {
    let res = false
    userStore.cart.forEach(prod => {
        if (route.params.id == prod.id) {
            res = true
        }
    })
    return res
})

// const priceComputed = computed(() => {
//     if (product.value && product.value.data.product) {
//         return product.value.data.product.price / 100
//     }
//     return '0.00'
// })

const images = ref([
    '',
    '/images/1.jpg',
    '/images/2.jpg',
    '/images/3.jpg',
    '/images/4.jpg',
    '/images/5.jpg',
])

const addToCart = () => {
    userStore.cart.push(product.value.data.product)
}
</script>