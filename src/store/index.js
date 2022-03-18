import { reactive } from 'vue'

export const store = reactive({
    toastMessage: "",
    showToast: false,
    viewingUser: "",
    showRecipeModal: false,
    showAddRecipeModal: false,
    showEditRecipeModal: false,
    ableToAddToCart: false,
    showShoppingCart: false,
    recipesInCart: [],
    activeRecipe: "",
    types: ["Breakfast", "Lunch", "Dinner", "Side", "Dessert"],
    filters: ["Italian", "Quick"],
    recipes: []
})