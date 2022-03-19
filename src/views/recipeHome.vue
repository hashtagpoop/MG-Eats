<script setup>
import { ref, onMounted } from 'vue'
import ViewRecipeModal from "../components/viewRecipeModal.vue";
import AddRecipeModal from "../components/addRecipeModal.vue";
import EditRecipeModal from "../components/editRecipeModal.vue";
import NavigationBar from "../components/navigationBar.vue";
import Filters from "../components/filters.vue";
import RecipeCard from "../components/recipeCard.vue";
import { store } from "../store"
import { useRecipeService } from "../services/recipes"


onMounted(() => {
  // useRecipeService.loadRecipes();
})

</script>

<template>
  <div id="recipeApp" style="background-color: var(--minty); margin: 0">
    <NavigationBar></NavigationBar>

    <Filters class="container"></Filters>


    <!-- ************************ RECIPES ************************ -->
    <section id="recipes" class="container">
      <div class="recipe-type-section" v-for="mealType in store.types">
        <details open>
          <summary>{{ mealType }}</summary>

          <div class="recipe-type-items">
            <RecipeCard
              v-for="recipe in store.recipes.filter(recipe => recipe.Type == mealType)"
              :recipe="recipe"
            >
            </RecipeCard>
          </div>
        </details>
      </div>

      <!-- *********************** MODALS AND SIDEBARS *********************** -->

      <!-- View Modal -->
      <transition name="fade">
        <div v-cloak v-if="store.showRecipeModal">
          <div
            v-if="store.showRecipeModal"
            @click="store.showRecipeModal = false"
            class="modal-backdrop"
          ></div>
          <ViewRecipeModal :recipe="store.activeRecipe"></ViewRecipeModal>
        </div>
      </transition>

      <!-- Add Modal -->
      <transition name="fade">
        <div v-cloak v-show="store.showAddRecipeModal">
          <div
            v-if="store.showAddRecipeModal"
            @click="store.showAddRecipeModal = false"
            class="modal-backdrop"
          ></div>
          <AddRecipeModal
            @submit="useRecipeService.submitNewRecipe"
          ></AddRecipeModal>
        </div>
      </transition>

      <!-- Edit Modal -->
      <transition name="fade">
        <div v-cloak v-if="store.showEditRecipeModal">
          <div
            v-if="store.showEditRecipeModal"
            @click="store.showEditRecipeModal = false"
            class="modal-backdrop"
          ></div>
          <EditRecipeModal
            :recipe="store.activeRecipe"
          ></EditRecipeModal>
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
