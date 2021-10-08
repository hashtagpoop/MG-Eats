var EditRecipeModal = {

    props: [
        'recipe'
    ],
    data() {
        return {
            types: ["Breakfast", "Lunch", "Dinner", "Side", "Dessert"],
            users: ["M&G", "Karen"],
        }
    },
    methods: {
        hideModal: function() {
            this.$emit('close')
        },
        submitRecipe: function() {

        }
    },
    template:   `
        <div class="editFormContainer">
            <h1 class="formTitle">Edit Recipe</h1>

            <br>

            <form action="#" @submit.prevent="submitRecipe">
                <div class="name">
                <label for="Title">Title</label>
                <input type="text" autocomplete="off" :value="recipe.Title" name="Title" required>
                </div>

                <div class="two-grid">
                    <div class="two-grid">
                        <div>
                            <label for="TotalTime">Total Time</label>
                            <input type="text" autocomplete="off" :value="recipe.TotalTime" name="TotalTime" required>
                        </div>

                        <div>
                            <label for="Servings">Serves</label>
                            <input type="number" :value="recipe.Serves" name="Servings" required>
                        </div>
                    </div>

                    <div class="two-grid">
                        <div>
                            <label for="Type">Type</label>
                            <select name="Type" required>
                                <option v-for="type in types" :selected="type == recipe.Type">{{ type }}</option>
                            </select>
                        </div>

                        <div>
                            <label for="User">User</label>
                            <select name="User" required>
                                <option v-for="user in users" :selected="user == recipe.User">{{ user }}</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div>
                <label for="name">Tags</label>
                <input type="text" autocomplete="off" :value="recipe.Tags" name="Tags">
                </div>

                <div>
                <label for="ImageURL">Image URL</label>
                <input type="text" autocomplete="off" :value="recipe.ImageSrc" name="ImageURL" required>
                </div>

                <div>
                <label for="Ingredients">Ingredients</label>
                <textarea name="Ingredients" :value="recipe.Ingredients" cols="30" rows="5" required></textarea>
                </div>

                <div>
                <label for="Instructions">Instructions</label>
                <textarea name="Instructions" :value="recipe.Instructions" cols="30" rows="5" required></textarea>
                </div>

                <div style="display:grid; grid-template-columns: 1fr 1fr 1fr;column-gap: 30px;">
                    <input type="submit" value="Add Recipe" class="add_recipe_button" />
                    <input type="submit" value="Delete Recipe" class="delete_recipe_button" />
                    <input @click="hideModal" type="button" value="Close" class="close_button" />
                </div>
            </form>
        </div>
    `

};