<script setup>
import { ref } from "vue"
defineProps({
    recipe: Object
})
</script>

<template>
<div class="recipe-popout">
    <div class="info-and-image-grid">
    <div class="recipe-info-container">
        <h1 class="heading">{{ recipe.Title }}</h1>

        <div class="recipe-info" style="color: #F7E1D7;font-size: 1.1em;letter-spacing: 2px;line-height: 18px;margin-top:15px;">
        <h3>Serves: {{ recipe.Serves }}</h3>
        <h3>Total Time: {{ recipe.TotalTime }}</h3>
        </div>
        
        <hr />

        <div class="translucent-dark-background">
            <h1 class="heading" style="font-size: 1.7em;">Ingredients</h1>
            <br>
            
            <p v-if="typeof(recipe.Ingredients) == 'string'">{{ recipe.Ingredients }}</p>
            <ul style="margin-bottom: 0;" v-else class="ingredients-list">
                <li v-for="ingredient in recipe.Ingredients">{{ ingredient }}</li>
            </ul>
        </div>
        
        <hr style="height: .5px;"/>

    </div>

    <div>
        <img :src="recipe.ImageSrc" />
    </div>
    </div>
    
    <div class="directions translucent-dark-background">
        <h1 class="heading" style="font-size: 2em;">Directions:</h1>

        <p v-if="typeof(recipe.Instructions) == 'string'">{{ recipe.Instructions }}</p>
        <ul v-else>
            <li v-for="instruction in recipe.Instructions">{{ instruction }}</li>
        </ul>
    </div>

</div>
</template>

<style scoped>
.recipe-popout {
  background-color: var(--deepseagreen);
  padding: 50px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 85%;
  max-width: 1200px;
  height: 80vh;
  overflow: scroll;
  z-index: 999;
  border-radius: 10px;
  box-sizing: border-box;
}

.translucent-dark-background {
  background-color: #6d7576c4;
  padding: 15px;
  border-radius: 7px;
}

.recipe-popout .heading {
  margin: 0;
  font-size: 3em;
  font-weight: lighter;
  color: var(--whitemocha);
}

.recipe-popout .info-and-image-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 25px;
}

.recipe-popout .recipe-info {
  display: flex;
}

.recipe-popout .recipe-info h3 {
  margin: 0;
}

.recipe-popout .recipe-info h3:first-of-type {
  padding-right: 10px;
  border-right: 2px solid var(--whitemocha);
}

.recipe-popout .recipe-info h3:nth-of-type(2) {
  padding-left: 10px;
}

.recipe-popout img {
  width: 400px;
  height: 400px;
  object-fit: cover;
  margin: auto;
  display: block;
}

.recipe-popout hr {
  margin: 30px 0;
  border: none;
  background-image: linear-gradient(
    to right,
    var(--whitemocha),
    var(--champagnepink),
    var(--whitemocha)
  );
  height: 1px;
}

.recipe-popout .ingredients-list {
  padding-left: 20px;
  max-height: 300px;
  overflow: scroll;
  column-gap: 30px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
}

.recipe-popout .ingredients-list li {
  list-style-type: none;
  position: relative;
  color: var(--whitemocha);
  line-height: 25px;
  letter-spacing: 1.15px;
  align-self: center;
  padding-left: 7px;
  margin-bottom: 10px;
}

.recipe-popout .ingredients-list li::before {
  position: absolute;
  content: "";
  width: 5px;
  height: 2px;
  background-color: var(--whitemocha);
  top: 50%;
  left: -15px;
}

.recipe-popout .directions ul {
  padding-left: 10px;
  max-height: 250px;
  overflow-y: scroll;
  scrollbar-width: none;
}

.recipe-popout .directions ul li,
.recipe-popout .directions p {
  color: var(--whitemocha);
  margin: 15px 0;
  line-height: 20px;
  letter-spacing: 1.1px;
  list-style-type: none;
}
</style>