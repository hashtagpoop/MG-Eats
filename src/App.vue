<script setup>
import { ref } from "vue";
import { store } from "./store"
import Notification from "./components/notification.vue";
import NavigationBar from "./components/navigationBar.vue";
import ShoppingCart from "./components/shoppingCart.vue";
import "animate.css";
</script>

<template>

  <section style="transition: all .35s ease;">


    <router-view v-slot="{ Component, route }">
      <transition
      :enter-active-class="route.meta.enterClass" 
      :leave-active-class="route.meta.leaveClass" 
      >
        <component :is="Component" />
      </transition>
    </router-view>

    <Notification :showNoti="store.showToast"></Notification>
    
    <transition name="slide">
      <ShoppingCart
        v-cloak
        v-if="store.showShoppingCart"
        :cart="store.recipesInCart"
      ></ShoppingCart>
    </transition>

  </section>

</template>

<style>

body {
  margin: 0;
}

.page {
  position: absolute;
  width: 100vw;
}

.showSidebar {
  width: max(25vw, 300px) !important;
}
.openMenu {
  margin-left: max(25vw, 300px);
}
</style>
