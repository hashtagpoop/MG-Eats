<script setup>
</script>

<template>
    <div
        class="recipe-item"
    >
        <div
        @click="showRecipe = true; activeRecipe=recipe"
        class="recipe-spotlight"
        >
        <img
            :src="recipe.ImageSrc"
            onerror="this.src='../static/assets/404_error.svg';this.style.objectFit='unset'"
        />
        <div class="hover-information">
            <p>Total Time: [[ recipe.TotalTime ]]</p>
        </div>
        </div>
        <div class="recipe-details">
        <h3
            @click="showRecipe = true; activeRecipe=recipe;"
            class="recipe-title"
        >
            [[ recipe.Title ]]
        </h3>
        <button
            v-if="!ableToAddToCart"
            @click="editRecipe=true; activeRecipe=recipe;"
            class="elipses"
        >
            <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-more-vertical"
            >
            <circle cx="12" cy="12" r="1"></circle>
            <circle cx="12" cy="5" r="1"></circle>
            <circle cx="12" cy="19" r="1"></circle>
            </svg>
        </button>
        <button
            v-else
            class="addToIngredientListButton"
            :class="recipesInCart.includes(recipe) ? 'added-to-cart' : ''"
            @click="addRecipeToCart(recipe)"
        >
            <span v-if="recipesInCart.includes(recipe)">Added!</span>
            <span v-else>Add to Cart</span>
        </button>
        </div>
    </div>
</template>

<style scoped>
.recipe-item {
  background-color: var(--whitemocha);
  border-radius: 5px;
  transition: all 0.2s ease-in-out;
  overflow: hidden;
  position: relative;
  width: 275px;
}

.recipe-item:hover {
  transform: translateY(-10px);
  box-shadow: var(--boxShadow);
}

.recipe-item:hover .hover-information {
  opacity: 1;
}

.recipe-spotlight {
  position: relative;
  cursor: pointer;
  height: 250px;
}

.recipe-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.recipe-item .hover-information {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  justify-content: center;
  background-color: #343434be;
  opacity: 0;
  transition: all 0.3s ease-in-out;
  display: flex;
  align-items: center;
  font-size: 1.5em;
  font-weight: bolder;
  color: var(--whitemocha);
}

.recipe-item .hover-information p {
  width: 50%;
  text-align: center;
}

.recipe-item .recipe-details {
  padding: 20px 10px;
  display: flex;
  justify-content: space-between;
}

.recipe-item .recipe-title {
  margin: 0;
  letter-spacing: 0px;
  font-size: 1em;
  cursor: pointer;
  display: inline-block;
  align-self: center;
}

.recipe-item .elipses {
  padding: 0;
  width: 24px;
  height: 24px;
  background-color: transparent;
  border: none;
  cursor: pointer;
}

.recipe-item .addToIngredientListButton {
  background: none;
  border: solid 1px var(--deepseagreen);
  color: var(--deepseagreen);
  cursor: pointer;
  display: inline-block;
  font-size: 0.75em;
  outline: none;
  padding: 3px 5px;
  margin-left: 10px;
  border-radius: 10px;
  transition: all 0.3s ease-in-out;
}
</style>