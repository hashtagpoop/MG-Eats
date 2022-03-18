<script setup>
import { ref, reactive } from "vue"
import { store } from "../store"
defineProps({
    showNoti: Boolean
})
const recipeObj = reactive({
    types: ["Breakfast", "Lunch", "Dinner", "Side", "Dessert"],
    users: ["M&G", "Karen"],
    Title: "",
    Ingredients: "",
    Instructions: "",
    TotalTime: "",
    Serves: "",
    Tags: "",
    ImageSrc: "",
    Type: null,
    User: null,
})

function submitRecipe () {
    splitIngredients();
    splitInstructions();
    splitTags();

    var newRecipe = { 
        Title: recipeObj.Title,
        Ingredients: recipeObj.Ingredients,
        Instructions: recipeObj.Instructions, 
        TotalTime: recipeObj.TotalTime,
        Serves: recipeObj.Serves,
        Tags: recipeObj.Tags,
        ImageSrc: recipeObj.ImageSrc,
        Type: recipeObj.Type || store.types[0],
        User: recipeObj.User || store.users[0],
    }

    // $emit("submit", newRecipe)          
    store.showRecipeModal = false;
}

function selectedType (event) {
    recipeObj.Type = event.target.value;
}

function selectedUser (event) {
    recipeObj.User = event.target.value;
}

function splitTags () {
    if (recipeObj.Tags != "") {
        var delimeterRegex = /,|\n/g
        var newListOfTags = recipeObj.Tags.split(delimeterRegex);
        recipeObj.Tags = newListOfTags;
    } else {
        recipeObj.Tags = [];
        console.log("No tags added - returning empty list.");
    }
}

function splitIngredients () {
    const delimeterRegex = /(,|\n)(?![\sa-z])/g

    var newListOfIngredients = recipeObj.Ingredients.split(delimeterRegex);
    newListOfIngredients = newListOfIngredients.filter((currentElement) => {
        return currentElement.trim().length > 0;
    });
    newListOfIngredients = newListOfIngredients.map(string => string.trim());
    recipeObj.Ingredients = newListOfIngredients;
}

function splitInstructions () {
    const regex = /(\d+[\.\)])/g;
    var newListOfText = [];
    var text = recipeObj.Instructions;

    newListOfInstructions = text.replace(regex, "\n$1").split(/\n+/g)
    newListOfInstructions = newListOfInstructions.filter((currentElement) => {
        return currentElement.trim().length > 0;
    });
    newListOfInstructions = newListOfInstructions.map(string => string.trim());

    recipeObj.Instructions = newListOfInstructions;
}

</script>

<template>
    <div class="addFormContainer">
        <h1 class="formTitle">Add Recipe</h1>
        <br>
        <form action="#" @submit.prevent="submitRecipe">
            <div class="name">
                <label for="Title">Title</label>
                <input v-model="recipeObj.Title" type="text" autocomplete="off" placeholder="e.g. Creamed Corn" name="Title" required>
            </div>

            <div class="two-grid">
                <div class="two-grid">
                    <div>
                        <label for="TotalTime">Total Time</label>
                        <input v-model="recipeObj.TotalTime" type="text" autocomplete="off" placeholder="e.g. 50min" name="TotalTime" required>
                    </div>

                    <div>
                        <label for="Servings">Serves</label>
                        <input v-model="recipeObj.Serves" type="number" placeholder="e.g. 6" name="Servings" required>
                    </div>
                </div>

                <div class="two-grid">
                    <div>
                        <label for="Type">Type</label>
                        <select @change="selectedType" name="Type" required>
                            <option v-for="type in types">{{ type }}</option>
                        </select>
                    </div>

                    <div>
                        <label for="User">User</label>
                        <select @change="selectedUser" name="User" required>
                            <option v-for="user in users">{{ user }}</option>
                        </select>
                    </div>
                </div>
            </div>

            <div>
                <label for="name">Tags</label>
                <input type="text" v-model="recipeObj.Tags" autocomplete="off" placeholder="Italian, Fast, Leftovers" name="Tags">
            </div>

            <div>
                <label for="ImageURL">Image URL</label>
                <input type="text" v-model="recipeObj.ImageSrc" autocomplete="off" placeholder="to insert url image" name="ImageURL" required>
            </div>

            <div>
                <label for="Ingredients">
                    Ingredients
                    <div class="tooltip">
                        <p class="tooltip-text" tooltip-text="You can list out ingredients separated by commas or by hitting enter!">?</p>
                    </div>
                </label>
                <textarea v-model="recipeObj.Ingredients" name="Ingredients" placeholder="Secret sauce, Spinach" cols="30" rows="5"></textarea>
            </div>

            <div>
                <label for="Instructions">
                    Instructions
                    <div class="tooltip">
                        <p class="tooltip-text" tooltip-text="You can list out instructions separated by '1.' or '1)' or by hitting enter!">?</p>
                    </div>
                </label>
                <textarea v-model="recipeObj.Instructions" name="Instructions" placeholder="1. Cut the tomatoes" cols="30" rows="5" style="height: 300px;"></textarea>
            </div>

            <div class="two-grid">
                <input type="submit" value="Add Recipe" class="add-recipe-button" />
                <input @click="hideModal" type="button" value="Close" class="close-button" />
            </div>
        </form>
    </div>
</template>

<style scoped>

</style>