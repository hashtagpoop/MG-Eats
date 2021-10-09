// Edits here should be checked against add_recipe_modal since the files operate similarily

var EditRecipeModal = {

    props: [
        'recipe'
    ],
    data() {
        return {
            types: ["Breakfast", "Lunch", "Dinner", "Side", "Dessert"],
            users: ["M&G", "Karen"],
            editedIngredients: false,
            editedInstructions: false,
            Index: this.recipe.Index,
            Title: this.recipe.Title,
            Ingredients: this.recipe.Ingredients,
            Instructions: this.recipe.Instructions,
            TotalTime: this.recipe.TotalTime,
            Serves: this.recipe.Serves,
            Tags: this.recipe.Tags,
            ImageSrc: this.recipe.ImageSrc,
            Type: this.recipe.Type,
            User: this.recipe.User,
        }
    },
    methods: {
        hideModal: function() {
            this.$emit('close')
        },
        removeRecipe: function() {
            this.$emit('remove', this.Index);
            this.hideModal();
        },
        submitUpdate: function() {
            if (this.editedIngredients) {
                this.splitIngredients();
            };
            if (this.editedInstructions) {
                this.splitInstructions();
            };

            var editedRecipe = { 
                Index: this.Index,
                Title: this.Title,
                Ingredients: this.Ingredients,
                Instructions: this.Instructions, 
                TotalTime: this.TotalTime,
                Serves: this.Serves,
                Tags: this.Tags,
                ImageSrc: this.ImageSrc,
                Type: this.Type || this.types[0],
                User: this.User || this.users[0],
            };

            console.log(editedRecipe);
            this.$emit("submit", editedRecipe)            
            this.hideModal();
        },
        selectedType: function(event) {
            this.Type = event.target.value;
        },
        selectedUser: function(event) {
            this.User = event.target.value;
        },
        splitIngredients: function() {
            if (this.Ingredients.search("\n") > -1) {
                var delimeterRegex = /,*\n/;
            } else {
                var delimeterRegex = /,\n*/;
            }
            var newListOfIngredients = this.Ingredients.split(delimeterRegex);
            newListOfIngredients = newListOfIngredients.filter((currentElement) => {
                return currentElement.trim().length > 0;
            });
            newListOfIngredients = newListOfIngredients.map(string => string.trim());
            this.Ingredients = newListOfIngredients;
        },
        splitInstructions: function() {
            const regex = /([\(\s\-]*\d+[\)]*)/g;
            var newListOfText = [];
            var text = this.Instructions;

            newListOfInstructions = text.replace(regex, "\n$1").split(/,*\n+/)
            newListOfInstructions = newListOfInstructions.filter((currentElement) => {
                return currentElement.trim().length > 0;
            });
            newListOfInstructions = newListOfInstructions.map(string => string.trim());

            this.Instructions = newListOfInstructions;
        },
    },
    template:   `
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
                    <input type="text" autocomplete="off" v-model="Tags" name="Tags">
                </div>

                <div>
                    <label for="ImageURL">Image URL</label>
                    <input type="text" autocomplete="off" :value="ImageSrc" name="ImageURL" required>
                </div>

                <div>
                    <label for="Ingredients">Ingredients</label>
                    <textarea v-if="typeof(Ingredients) == 'string'" @change="editedIngredients=true" name="Ingredients" v-model="Ingredients" cols="30" rows="5"></textarea>
                    <textarea v-else @change="editedIngredients=true; Ingredients = $event.target.value" name="Ingredients" :value="Ingredients.join('\\n')" cols="30" rows="5"></textarea>
                </div>

                <div>
                    <label for="Instructions">Instructions</label>
                    <textarea v-if="typeof(Instructions) == 'string'" @change="editedInstructions=true" name="Instructions" v-model="Instructions" cols="30" rows="5"></textarea>
                    <textarea v-else @change="editedInstructions=true; Instructions = $event.target.value" :value="Instructions.join('\\n')" cols="30" rows="5"></textarea>
                </div>

                <div style="display:grid; grid-template-columns: 1fr 1fr 1fr;column-gap: 30px;">
                    <input type="submit" value="Update Recipe" class="add_recipe_button" />
                    <input @click="removeRecipe" type="button" value="Delete Recipe" class="delete_recipe_button" />
                    <input @click="hideModal" type="button" value="Close" class="close_button" />
                </div>
            </form>
        </div>
    `

};