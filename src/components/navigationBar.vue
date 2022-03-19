<script setup>
import { store } from "../store"
</script>

<template>
  <header class="container">
    <h1>Recipes</h1>

    <nav class="navbar">
      <!-- Desktop Nav -->
      <ul class="">
        <li class="nav-item">
          <router-link to="/">Home</router-link>
        </li>
        <li class="nav-item">
          <button @click="store.showAddRecipeModal = true;">&#10010; Add Recipe</button>
        </li>
        <li class="nav-item">
          <button @click="store.ableToAddToCart = !store.ableToAddToCart;">
            Select Recipes
          </button>
        </li>
        <li>
          <img
            class="shopping-cart"
            @click="store.showShoppingCart = true;"
            width="30"
            src="https://img.icons8.com/external-vitaliy-gorbachev-lineal-vitaly-gorbachev/60/000000/external-shopping-cart-cyber-monday-vitaliy-gorbachev-lineal-vitaly-gorbachev.png"
          />
          <p
            v-if="store.shoppingCounter > 0"
            @click="store.showShoppingCart = true;"
            class="shopping-cart-counter"
          >
            {{ store.shoppingCounter }}
          </p>
        </li>
      </ul>
    </nav>
  </header>
    
</template>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
}

.navbar {
  align-self: center;
}

.navbar ul {
  display: flex;
}

.navbar ul li {
  margin-left: 20px;
  list-style-type: none;
  font-size: 1.3em;
  align-self: center;
  position: relative;
}

.navbar button {
  padding: 10px 20px;
  background-color: var(--morninggreen);
  color: var(--whitemocha);
  cursor: pointer;
  text-align: center;
  border-radius: 50px;
  -webkit-transition: all 0.4s ease-in-out;
  transition: all 0.4s ease-in-out;
  border: 1px solid var(--deepseagreen);
  font-weight: bolder;
}

.navbar button:hover {
  background-color: #759177;
  transform: translateY(-2px);
}

</style>