<script setup>
defineProps({
    showNoti: Boolean
})

</script>

<template>
    <teleport to="body">
        <transition name="fade">
            <div v-if="showNoti" class="toast">
            <p>Success!</p>
            </div>
        </transition>
    </teleport>
</template>

<style scoped>
.toast {
  background-color: #ffd3e2;
  color: #df3670;
  position: fixed;
  min-width: 150px;
  top: 30px;
  right: 30px;
  box-sizing: border-box;
  padding: 3px 20px;
  border-radius: 5px;
  text-align: center;
  z-index: 999;
}
</style>