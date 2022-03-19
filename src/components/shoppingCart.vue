<script setup>
import { ref } from "vue"
import { store } from "../store"
import { useRecipeService } from "../services/recipes"
import { useCartService } from "../services/cart"


defineProps({
    cart: [Object]
})

const showResults = ref(false)
const combinedIngredients =  ref([])

function getCombinedIngredients () {
    const cartCopy = JSON.parse(JSON.stringify(this.cart));
    cartCopy.forEach((recipe) => {
        this.stringifyRecipe(recipe);
    });
    fetch("/recipes/v1/combine", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(cartCopy),
        })
    .then((response) => {
        if (!response.ok) {
        console.log("Failed to combine ingredients");
        // this.$emit("fail", "Failed to combine ingredients!")
        throw new Error(response["detail"]);
        } else {
        return response;
        }
    })
    .then((response) => response.json())
    .then((data) => {
        this.combinedIngredients = data;
        this.showResults = true;
        // this.$emit("success", "Successfully combined ingredients!")
    })
    .catch((error) => {
        console.log(error);
        // this.$emit("fail", "Failed to combine ingredients!")
    });
}
</script>

<template>
<div class="ingredients-sidebar">

    <transition v-if="!showResults" name="fade">
        <section>
            <header style="display: flex;justify-content: space-between;padding: 25px 20px 20px 20px;">
                <h1 style="font-size: 1.7em;margin:0;align-self: center;">Add Recipes</h1>
                <button @click="store.showShoppingCart = false" class="close-button" style="padding:10px 25px;">Close</button>
            </header>
            <hr>
            <ul class="cart">
                <li v-for="recipe in cart" style="list-style-type: none;">
                    <div class="cart-recipe">
                        <div>
                            <img width="75" :src="recipe.ImageSrc"/>
                        </div>

                        <div style="overflow: hidden;padding: 10px; box-sizing: border-box;">
                            <h3 style="margin: 0px;">{{ recipe.Title }}</h3>
                            <div style="overflow-x: scroll;">
                                <p style="margin: 15px 0 0 0;white-space:nowrap;color: var(--deepseagreen);">{{ recipe.Ingredients.join(", ") }}</p>
                            </div>
                        </div>
                        <div @click="useCartService.removeFromCart(recipe.Recipe_id)" class="remove-from-cart">
                            X
                        </div>
                    </div>
                </li>
            </ul>
            <button class="submit-ingredient-button" @click="getCombinedIngredients" style="margin: 20px;width: -webkit-fill-available;padding: 10px 0;">Submit Ingredients</button>
        </section>
    </transition>

    <transition v-else name="fade">
        <section>
            <header style="display: flex;justify-content: space-between;padding: 25px 20px 20px 20px;">
                <h1 style="font-size: 1.7em;margin:0;align-self: center;">Shopping List</h1>
                <button @click="showResults = false;" class="close-button" style="padding:10px 25px;">Edit Recipes</button>
            </header>
            <hr>
            <ul class="ingredient-shopping-list">
                <li v-for="ingredient_and_recipe in combinedIngredients">
                    <h4 :title="ingredient_and_recipe[1]" style="font-weight:lighter;margin: 0;">{{ ingredient_and_recipe[0] }}</h4>
                </li>
            </ul>
            <button class="submit-ingredient-button" style="margin: 20px;width: -webkit-fill-available;padding: 10px 0;">Send to my email</button>
        </section>
    </transition>

</div>
</template>

<style scoped>
.ingredients-sidebar {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 990;
  height: 100vh;
  width: 35%;
  min-width: 325px;
  max-width: 400px;
  border-radius: 10px 0 0 10px;
  background-color: #f4f4f4;
  transition: all 0.3s ease-in-out;
}

.ingredients-sidebar .cart {
  padding: 0 20px;
}

.ingredients-sidebar .cart li {
  margin-bottom: 10px;
}

.cart-recipe {
  display: grid;
  grid-template-columns: 2fr 7fr 1fr;
}

.cart-recipe img {
  object-fit: cover;
  /* Same as width in component */
  height: 75px;
}

.cart-recipe .remove-from-cart {
  text-align: center;
  align-self: center;
  padding: 5px;
  cursor: pointer;
}

.ingredient-shopping-list {
  padding: 20px;
  max-height: 600px;
  overflow: scroll;
}

.ingredient-shopping-list li {
  list-style-type: disclosure-closed;
  margin-left: 20px;
  padding-left: 10px;
  margin-bottom: 15px;
}
</style>