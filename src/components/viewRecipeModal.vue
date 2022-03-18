<script setup>
import { ref } from "vue"
defineProps({
    recipe
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
            
            <p v-if="typeof(recipe.Ingredients) == 'string'"></p>
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

</style>