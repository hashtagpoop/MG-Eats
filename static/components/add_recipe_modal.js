// Edits here should be checked against edit_recipe_modal since the files operate similarily

var AddRecipeModal = {

    props: [
    ],
    data() {
        return {
            types: ["Breakfast", "Lunch", "Dinner", "Side", "Dessert"],
            users: ["M&G", "Karen"],
            // Title: "",
            // Ingredients: "",
            // Instructions: "",
            // TotalTime: "",
            // Serves: "",
            // Tags: "",
            // ImageSrc: "",
            Title: "Bitez Burger",
            Ingredients: "",
            Instructions: "",
            TotalTime: "20min",
            Serves: 6,
            Tags: "",
            ImageSrc: "https://bitezburger.com/static/images/burger-closeup.jpg",
            Type: null,
            User: null,
        }
    },
    methods: {
        hideModal: function() {
            this.$emit('close')
        },
        submitRecipe: function() {
            this.splitIngredients();
            this.splitInstructions();
            this.splitTags();

            var newRecipe = { 
                Title: this.Title,
                Ingredients: this.Ingredients,
                Instructions: this.Instructions, 
                TotalTime: this.TotalTime,
                Serves: this.Serves,
                Tags: this.Tags,
                ImageSrc: this.ImageSrc,
                Type: this.Type || this.types[0],
                User: this.User || this.users[0],
            }

            console.log(newRecipe);
            console.log(JSON.stringify(newRecipe))
            this.$emit("submit", newRecipe)            
            this.hideModal();
        },
        selectedType: function(event) {
            this.Type = event.target.value;
        },
        selectedUser: function(event) {
            this.User = event.target.value;
        },
        splitTags: function() {
            if (this.Tags != "") {
                if (this.Tags.search("\n") > -1) {
                    var delimeterRegex = /,*\n/;
                } else {
                    var delimeterRegex = /,\n*/;
                }
                var newListOfTags = this.Tags.split(delimeterRegex);
                this.Tags = newListOfTags;
            } else {
                this.Tags = [];
                console.log("No tags added - returning empty list.");
            }
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
        <div class="addFormContainer">
            <h1 class="formTitle">Add Recipe</h1>

            <br>

            <form action="#" @submit.prevent="submitRecipe">
                <div class="name">
                    <label for="Title">Title</label>
                    <input v-model="Title" type="text" autocomplete="off" placeholder="e.g. Creamed Corn" name="Title" required>
                </div>

                <div class="two-grid">
                    <div class="two-grid">
                        <div>
                            <label for="TotalTime">Total Time</label>
                            <input v-model="TotalTime" type="text" autocomplete="off" placeholder="e.g. 50min" name="TotalTime" required>
                        </div>

                        <div>
                            <label for="Servings">Serves</label>
                            <input v-model="Serves" type="number" placeholder="e.g. 6" name="Servings" required>
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
                    <input type="text" v-model="Tags" autocomplete="off" placeholder="Italian, Fast, Leftovers" name="Tags">
                </div>

                <div>
                    <label for="ImageURL">Image URL</label>
                    <input type="text" v-model="ImageSrc" autocomplete="off" placeholder="to insert url image" name="ImageURL" required>
                </div>

                <div>
                    <label for="Ingredients">
                        Ingredients
                        <div class="tooltip">
                            <p class="tooltip-text" tooltip-text="You can list out ingredients separated by commas or by hitting enter!">?</p>
                        </div>
                    </label>
                    <textarea v-model="Ingredients" name="Ingredients" placeholder="Secret sauce, Spinach" cols="30" rows="5"></textarea>
                </div>

                <div>
                    <label for="Instructions">Instructions</label>
                    <textarea v-model="Instructions" name="Instructions" placeholder="1. Cut the tomatoes" cols="30" rows="5"></textarea>
                </div>

                <div class="two-grid">
                    <input type="submit" value="Add Recipe" class="add_recipe_button" />
                    <input @click="hideModal" type="button" value="Close" class="close_button" />
                </div>
            </form>
        </div>
    `

};