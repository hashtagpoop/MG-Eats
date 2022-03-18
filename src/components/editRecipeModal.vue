<script setup>
import { reactive, ref } from "vue"
defineProps({
    showNoti: Boolean
})

const recipeObj = reactive({
    types: ["Breakfast", "Lunch", "Dinner", "Side", "Dessert"],
    users: ["M&G", "Karen"],
    editedIngredients: false,
    editedInstructions: false,
    editedTags: false,
    Recipe_id: this.recipe.Recipe_id,
    Title: this.recipe.Title,
    Ingredients: this.recipe.Ingredients,
    Instructions: this.recipe.Instructions,
    TotalTime: this.recipe.TotalTime,
    Serves: this.recipe.Serves,
    Tags: this.recipe.Tags,
    ImageSrc: this.recipe.ImageSrc,
    Type: this.recipe.Type,
    User: this.recipe.User
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
<div class="editFormContainer">
    <h1 class="formTitle">Edit Recipe</h1>

    <br>

    <form action="#" @submit.prevent="submitUpdate">
        <div class="name">
            <label for="Title">Title</label>
            <input type="text" autocomplete="off" v-model="Title" name="Title" required>
        </div>

        <div class="two-grid">
            <div class="two-grid">
                <div>
                    <label for="TotalTime">Total Time</label>
                    <input type="text" autocomplete="off" v-model="TotalTime" name="TotalTime" required>
                </div>

                <div>
                    <label for="Servings">Serves</label>
                    <input type="number" v-model="Serves" name="Servings" required>
                </div>
            </div>

            <div class="two-grid">
                <div>
                    <label for="Type">Type</label>
                    <select @change="selectedType" name="Type" required>
                        <option v-for="type in types" :selected="type == Type">{{ type }}</option>
                    </select>
                </div>

                <div>
                    <label for="User">User</label>
                    <select @change="selectedUser" name="User" required>
                        <option v-for="user in users" :selected="user == User">{{ user }}</option>
                    </select>
                </div>
            </div>
        </div>

        <div>
            <label for="name">Tags</label>
            <input @change="editedTags=true; Tags = $event.target.value" type="text" autocomplete="off" :value="Tags" name="Tags">
        </div>

        <div>
            <label for="ImageURL">Image URL</label>
            <input type="text" autocomplete="off" v-model="ImageSrc" name="ImageURL" required>
        </div>

        <div>
            <label for="Ingredients">
                Ingredients
                <div class="tooltip">
                    <p class="tooltip-text" tooltip-text="You can list out ingredients separated by commas or by hitting enter!">?</p>
                </div>
            </label>
            <textarea v-if="typeof(Ingredients) == 'string'" @change="editedIngredients=true" name="Ingredients" v-model="Ingredients" cols="30" rows="5"></textarea>
            <textarea v-else @change="editedIngredients=true; Ingredients = $event.target.value" name="Ingredients" :value="Ingredients.join('\\n')" cols="30" rows="5"></textarea>
        </div>

        <div>
            <label for="Instructions">
                Instructions
                <div class="tooltip">
                    <p class="tooltip-text" tooltip-text="You can list out instructions separated by '1.' or '1)' or by hitting enter!">?</p>
                </div>
            </label>
            <textarea v-if="typeof(Instructions) == 'string'" @change="editedInstructions=true" name="Instructions" v-model="Instructions" cols="30" rows="5"></textarea>
            <textarea v-else @change="editedInstructions=true; Instructions = $event.target.value" :value="Instructions.join('\\n')" cols="30" rows="5"></textarea>
        </div>

        <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));column-gap: 30px;">
            <input type="submit" value="Update Recipe" class="add-recipe-button" />
            <input @click="removeRecipe" type="button" value="Delete Recipe" class="delete-recipe-button" />
            <input @click="hideModal" type="button" value="Close" class="close-button" />
        </div>
    </form>
</div>
</template>

<style scoped>

</style>