<script setup>
import { reactive, ref } from "vue"
import { useRecipeService } from "../services/recipes";
import { store } from "../store";

const props = defineProps({
    recipe: Object
})

const editedIngredients = ref(false)
const editedInstructions = ref(false)
const editedTags = ref(false)

function submitUpdate () {
    console.log(editedIngredients.value)
    if (editedIngredients.value) {
        splitIngredients();
    };
    if (editedInstructions.value) {
        splitInstructions();
    };
    if (editedTags.value) {
        splitTags();
    };

    var editedRecipe = { 
        Recipe_id: props.recipe.Recipe_id,
        Title: props.recipe.Title,
        Ingredients: props.recipe.Ingredients,
        Instructions: props.recipe.Instructions, 
        TotalTime: props.recipe.TotalTime,
        Serves: props.recipe.Serves,
        Tags: props.recipe.Tags,
        ImageSrc: props.recipe.ImageSrc,
        Type: props.recipe.Type || store.types[0],
        User: props.recipe.User || store.users[0],
    };
    
    useRecipeService.submitEditedRecipe(editedRecipe)    
    store.showEditRecipeModal = false
}

function selectedType (event) {
    props.recipe.Type = event.target.value;
}

function selectedUser (event) {
    props.recipe.User = event.target.value;
}

function splitTags () {
    if (props.recipe.Tags != "") {
        var delimeterRegex = /,|\n/g
        var newListOfTags = props.recipe.Tags.split(delimeterRegex);
        props.recipe.Tags = newListOfTags;
    } else {
        props.recipe.Tags = [];
        console.log("No tags added - returning empty list.");
    }
}

function splitIngredients () {
    const delimeterRegex = /(,|\n)(?![\sa-z])/g

    var newListOfIngredients = props.recipe.Ingredients.split(delimeterRegex);
    newListOfIngredients = newListOfIngredients.filter((currentElement) => {
        return currentElement.trim().length > 0;
    });
    newListOfIngredients = newListOfIngredients.map(string => string.trim());
    props.recipe.Ingredients = newListOfIngredients;
}

function splitInstructions () {
    const regex = /(\d+[\.\)])/g;
    var newListOfText = [];
    var text = props.recipe.Instructions;

    newListOfInstructions = text.replace(regex, "\n$1").split(/\n+/g)
    newListOfInstructions = newListOfInstructions.filter((currentElement) => {
        return currentElement.trim().length > 0;
    });
    newListOfInstructions = newListOfInstructions.map(string => string.trim());

    props.recipe.Instructions = newListOfInstructions;
}
</script>

<template>
<div class="editFormContainer">
    <h1 class="formTitle">Edit Recipe</h1>

    <br>

    <form action="#" @submit.prevent="submitUpdate">
        <div class="name">
            <label for="Title">Title</label>
            <input type="text" autocomplete="off" v-model="recipe.Title" name="Title" required>
        </div>

        <div class="two-grid">
            <div class="two-grid">
                <div>
                    <label for="TotalTime">Total Time</label>
                    <input type="text" autocomplete="off" v-model="recipe.TotalTime" name="TotalTime" required>
                </div>

                <div>
                    <label for="Servings">Serves</label>
                    <input type="number" v-model="recipe.Serves" name="Servings" required>
                </div>
            </div>

            <div class="two-grid">
                <div>
                    <label for="Type">Type</label>
                    <select @change="selectedType" name="Type" required>
                        <option v-for="type in store.types" :selected="type == recipe.Type">{{ type }}</option>
                    </select>
                </div>

                <div>
                    <label for="User">User</label>
                    <select @change="selectedUser" name="User" required>
                        <option v-for="user in store.users" :selected="user == recipe.User">{{ user }}</option>
                    </select>
                </div>
            </div>
        </div>

        <div>
            <label for="name">Tags</label>
            <input @change="editedTags=true; Tags = $event.target.value" type="text" autocomplete="off" :value="recipe.Tags" name="Tags">
        </div>

        <div>
            <label for="ImageURL">Image URL</label>
            <input type="text" autocomplete="off" v-model="recipe.ImageSrc" name="ImageURL" required>
        </div>

        <div>
            <label for="Ingredients">
                Ingredients
                <div class="tooltip">
                    <p class="tooltip-text" tooltip-text="You can list out ingredients separated by commas or by hitting enter!">?</p>
                </div>
            </label>
            <textarea v-if="typeof(recipe.Ingredients) == 'string'" @change="editedIngredients=true" name="Ingredients" v-model="recipe.Ingredients" cols="30" rows="5"></textarea>
            <textarea v-else @change="editedIngredients=true; recipe.Ingredients = $event.target.value" name="Ingredients" :value="recipe.Ingredients.join('\n\n')" cols="30" rows="5"></textarea>
        </div>

        <div>
            <label for="Instructions">
                Instructions
                <div class="tooltip">
                    <p class="tooltip-text" tooltip-text="You can list out instructions separated by '1.' or '1)' or by hitting enter!">?</p>
                </div>
            </label>
            <textarea v-if="typeof(recipe.Instructions) == 'string'" @change="editedInstructions=true" name="Instructions" v-model="recipe.Instructions" cols="30" rows="5"></textarea>
            <textarea v-else @change="editedInstructions=true; recipe.Instructions = $event.target.value" :value="recipe.Instructions.join('\n\n')" cols="30" rows="5"></textarea>
        </div>

        <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));column-gap: 30px;">
            <input type="submit" value="Update Recipe" class="edit-recipe-button" />
            <input @click="useRecipeService.removeRecipe(recipe.Recipe_id)" type="button" value="Delete Recipe" class="delete-recipe-button" />
            <input @click="store.showEditRecipeModal = false" type="button" value="Close" class="close-button" />
        </div>
    </form>
</div>
</template>

<style scoped>
label {
  display: flex;
}

.editFormContainer {
  border-radius: 8px;
  padding: 50px;
  box-sizing: border-box;
  background-color: #f6f7fc;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 85%;
  max-width: 900px;
  z-index: 999;
  height: 85vh;
  overflow: scroll;
}

.two-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 30px;
}

.formTitle {
  color: #474544;
  font-size: 32px;
  font-weight: 700;
  letter-spacing: 7px;
  text-transform: uppercase;
  margin-bottom: 30px;
}

.editFormContainer input,
.editFormContainer select,
.editFormContainer textarea {
  background: white;
  border: none;
  color: #474544;
  font-size: 17px;
  letter-spacing: 1px;
  margin: 10px 0 25px 0;
  padding: 15px 10px;
  width: 100%;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 10%);
  box-sizing: border-box;
  transition: all 0.3s;
}

input[type="text"]:focus,
[type="email"]:focus,
textarea:focus {
  outline: none;
}

textarea {
  line-height: 25px;
  height: 350px;
  resize: none;
  overflow: scroll;
  font: inherit;
}

.edit-recipe-button,
.delete-recipe-button,
.close-button {
  background: none;
  border: solid 2px #474544;
  color: #474544;
  cursor: pointer;
  display: inline-block;
  font-family: "Helvetica", Arial, sans-serif;
  font-size: 0.875em;
  font-weight: bold;
  outline: none;
  padding: 20px 35px;
  text-transform: uppercase;
  -webkit-transition: all 0.3s;
  -moz-transition: all 0.3s;
  -ms-transition: all 0.3s;
  -o-transition: all 0.3s;
  transition: all 0.3s;
}

.edit-recipe-button:hover {
  background: #474544;
  color: #f2f3eb;
}

.close-button:hover,
.delete-recipe-button:hover {
  background: #df4924;
  color: #f2f3eb;
  border-color: #df4924;
}
</style>