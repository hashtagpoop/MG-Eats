<script setup>
import { ref } from 'vue'
import ViewRecipeModal from "./components/viewRecipeModal.vue";
import AddRecipeModal from "./components/addRecipeModal.vue";
import EditRecipeModal from "./components/editRecipeModal.vue";
import NavigationBar from "./components/navigationBar.vue";
import Filters from "./components/filters.vue";
import RecipeCard from "./components/recipeCard.vue";
import ShoppingCart from "./components/shoppingCart.vue";
import { store } from "../store"
import { useRecipeService } from "../services/recipes"

</script>

<template>
  <div id="recipeApp" style="background-color: var(--minty); margin: 0">
    <NavigationBar></NavigationBar>

    <Filters></Filters>


    <!-- ************************ RECIPES ************************ -->
    <section id="recipes" class="container">
      <div class="recipe-type-section" v-for="mealType in types">
        <details open>
          <summary>[[ mealType ]]</summary>

          <div class="recipe-type-items">
            <RecipeCard
              v-for="recipe in recipes"
              v-if="recipe.Type == mealType"
            >
            </RecipeCard>
          </div>
        </details>
      </div>

      <!-- *********************** MODALS AND SIDEBARS *********************** -->
      <!-- View Modal -->
      <transition name="fade">
        <div v-cloak v-if="showRecipe">
          <div
            v-if="showRecipe"
            @click="showRecipe = false"
            class="modal-backdrop"
          ></div>
          <ViewRecipeModal :recipe="activeRecipe"> </ViewRecipeModal>
        </div>
      </transition>

      <!-- Add Modal -->
      <transition name="fade">
        <div v-cloak v-show="addRecipe">
          <div
            v-if="addRecipe"
            @click="addRecipe = false"
            class="modal-backdrop"
          ></div>
          <AddRecipeModal
            @submit="submitNewRecipe"
            @close="addRecipe = false"
          ></AddRecipeModal>
        </div>
      </transition>

      <!-- Edit Modal -->
      <transition name="fade">
        <div v-cloak v-if="editRecipe">
          <div
            v-if="editRecipe"
            @click="editRecipe = false"
            class="modal-backdrop"
          ></div>
          <EditRecipeModal
            :recipe="activeRecipe"
            @remove="removeRecipe"
            @submit="submitEditedRecipe"
            @close="editRecipe = false"
          ></EditRecipeModal>
        </div>
      </transition>

      <!-- Sidebar -->
      <transition name="slide">
        <ShoppingCart
          v-cloak
          v-if="showIngredientShopping"
          :cart="recipesInCart"
          @close="showIngredientShopping = false"
          @remove-item="removeFromCart"
          @fail="displayToastMessage"
          @success="displayToastMessage"
        ></ShoppingCart>
      </transition>

      <!-- Toast Message -->
      <transition name="fade">
        <div class="toast" v-cloak v-if="showToast">
          <p>[[ toastMessage ]]</p>
        </div>
      </transition>
    </section>

    <!-- *********************** FOOTER *********************** -->
    <footer id="footer">
      <p class="copyright-info">
        Copyright &copy;2021 M&G Eats. All rights reserved.
      </p>
    </footer>
  </div>
</template>

<style scoped>

</style>
