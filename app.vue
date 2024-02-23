<template>
  <VitePwaManifest/>
  <div class="fixed z-[-1] bg-[#F2F2F2] w-full h-[100vh]"/>
  <div>
    <Link rel="preconnect" href="https://fonts.googleapis.com" />
    <!-- <Link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" crossorigin="" />
    <link rel="preconnect" href="https://fonts.googleapis.com"> -->
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,500;1,600;1,700;1,800;1,900&family=Roboto:ital,wght@0,400;0,500;0,700;0,900;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet">
  </div>
  <NuxtLayout>
    <NuxtPage/>
  </NuxtLayout>
  <MenuOverlay
    :class="[
        {'max-h-[100vh] transition-all duration-200 ease-in visible': userStore.isMenuOverlay },
        {'max-h-0 transition-all duration-200 ease-out invisible': !userStore.isMenuOverlay },
    ]"
  />
</template>

<script setup>
import { useUserStore } from '~/stores/user';
const userStore = useUserStore()

const route = useRoute()

useSeoMeta({
  title: 'Easy Shop',
  description: 'Easy ecommerce project'
})

let windowWidth = ref(process.client ? window.innerWidth : '')

onMounted(async () => {
    userStore.isLoading = false
    window.addEventListener('resize', function () {
        windowWidth.value = window.innerWidth;
    });

    window.addEventListener('beforeunload', function (e) {
      window.localStorage.clear();
    this.alert("hello")
});
    try {
      if (userStore.id) {
          await userStore.hasSessionExpired()
        }
    } catch (error) {
      console.log(error)
    }
})

watch(() => windowWidth.value, () => {
    if (windowWidth.value >= 767) {
        userStore.isMenuOverlay = false
    }
})

watch(() => route.fullPath, () => {
    userStore.isLoading = true
})
</script>
