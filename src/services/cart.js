import { ref, reactive } from 'vue'
import { store } from "../store"

function addRecipeToCart (recipeObj) {
if (store.recipesInCart.includes(recipeObj)) {
    removeFromCart(recipeObj.Recipe_id);
} else {
    store.recipesInCart.push(recipeObj);
}
}

function removeFromCart (recipeID) {
let currentIndexOfItemInCart = store.recipesInCart.findIndex(
    (recipe) => recipe.Recipe_id == recipeID
);
store.recipesInCart.splice(currentIndexOfItemInCart, 1);
}

export const useCartService = reactive({
    addRecipeToCart: addRecipeToCart,
    removeFromCart: removeFromCart,
  });