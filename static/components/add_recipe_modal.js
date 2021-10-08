var AddRecipeModal = {

    props: [
    ],
    data() {
        return {
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
        <div class="addFormContainer">
            <h1 class="formTitle">Add Recipe</h1>

            <br>

            <form action="#" @submit.prevent="submitRecipe">
                <div class="name">
                <label for="Title">Title</label>
                <input type="text" autocomplete="off" placeholder="e.g. Creamed Corn" name="Title" required>
                </div>

                <div class="two-grid">
                    <div class="two-grid">
                        <div>
                            <label for="TotalTime">Total Time</label>
                            <input type="text" autocomplete="off" placeholder="e.g. 50min" name="TotalTime" required>
                        </div>

                        <div>
                            <label for="Servings">Serves</label>
                            <input type="number" placeholder="e.g. 6" name="Servings" required>
                        </div>
                    </div>

                    <div class="two-grid">
                        <div>
                            <label for="Type">Type</label>
                            <select name="Type" required>
                                <option>Breakfast</option>
                                <option>Lunch</option>
                                <option>Dinner</option>
                                <option>Side</option>
                                <option>Dessert</option>
                            </select>
                        </div>

                        <div>
                            <label for="User">User</label>
                            <select name="User" required>
                                <option>M&G</option>
                                <option>Karen</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div>
                <label for="name">Tags</label>
                <input type="text" autocomplete="off" placeholder="Italian, Fast, Leftovers" name="Tags">
                </div>

                <div>
                <label for="ImageURL">Image URL</label>
                <input type="text" autocomplete="off" placeholder="to insert url image" name="ImageURL" required>
                </div>

                <div>
                <label for="Ingredients">Ingredients</label>
                <textarea name="Ingredients" placeholder="1. Secret sauce" cols="30" rows="5" required></textarea>
                </div>

                <div>
                <label for="Instructions">Instructions</label>
                <textarea name="Instructions" placeholder="1. Cut the tomatoes" cols="30" rows="5" required></textarea>
                </div>

                <div class="two-grid">
                    <input type="submit" value="Add Recipe" class="add_recipe_button" />
                    <input @click="hideModal" type="button" value="Close" class="close_button" />
                </div>
            </form>
        </div>
    `

};