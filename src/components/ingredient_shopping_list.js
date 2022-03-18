var IngredientModal = {

    props: [
        'cart'
    ],
    data() {
        return {
            showResults: false,
            combinedIngredients: []
        }
    },
    methods: {
        stringifyRecipe: function (recipeObj) {
            Object.keys(recipeObj).forEach((key) => {
                if (typeof recipeObj[key] == "object") {
                    recipeObj[key] = JSON.stringify(recipeObj[key]);
                }
            });
        },
        getCombinedIngredients: function () {
            const cartCopy = JSON.parse(JSON.stringify(this.cart));
            cartCopy.forEach((recipe) => {
                this.stringifyRecipe(recipe);
            });
            fetch("/recipes/v1/combine", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(cartCopy),
              })
            .then((response) => {
                if (!response.ok) {
                console.log("Failed to combine ingredients");
                this.$emit("fail", "Failed to combine ingredients!")
                throw new Error(response["detail"]);
                } else {
                return response;
                }
            })
            .then((response) => response.json())
            .then((data) => {
                this.combinedIngredients = data;
                this.showResults = true;
                this.$emit("success", "Successfully combined ingredients!")
            })
            .catch((error) => {
                console.log(error);
                this.$emit("fail", "Failed to combine ingredients!")
            });
        }
    },
    template:   `
    <div class="ingredients-sidebar">

        <transition v-if="!showResults" name="fade">
            <section>
                <header style="display: flex;justify-content: space-between;padding: 25px 20px 20px 20px;">
                    <h1 style="font-size: 1.7em;margin:0;align-self: center;">Add Recipes</h1>
                    <button @click="$emit('close')" class="close-button" style="padding:10px 25px;">Close</button>
                </header>
                <hr>
                <ul class="cart">
                    <li v-for="recipe in cart" style="list-style-type: none;">
                        <div class="cart-recipe">
                            <div>
                                <img width="75" :src="recipe.ImageSrc"/>
                            </div>

                            <div style="overflow: hidden;padding: 10px; box-sizing: border-box;">
                                <h3 style="margin: 0px;">{{ recipe.Title }}</h3>
                                <div style="overflow-x: scroll;">
                                    <p style="margin: 15px 0 0 0;white-space:nowrap;color: var(--deepseagreen);">{{ recipe.Ingredients.join(", ") }}</p>
                                </div>
                            </div>
                            <div @click="$emit('remove-item', recipe.Recipe_id)" class="remove-from-cart">
                                X
                            </div>
                        </div>
                    </li>
                </ul>
                <button class="submit-ingredient-button" @click="getCombinedIngredients" style="margin: 20px;width: -webkit-fill-available;padding: 10px 0;">Submit Ingredients</button>
            </section>
        </transition>

        <transition v-else name="fade">
            <section>
                <header style="display: flex;justify-content: space-between;padding: 25px 20px 20px 20px;">
                    <h1 style="font-size: 1.7em;margin:0;align-self: center;">Shopping List</h1>
                    <button @click="showResults = false;" class="close-button" style="padding:10px 25px;">Edit Recipes</button>
                </header>
                <hr>
                <ul class="ingredient-shopping-list">
                    <li v-for="ingredient_and_recipe in combinedIngredients">
                        <h4 :title="ingredient_and_recipe[1]" style="font-weight:lighter;margin: 0;">{{ ingredient_and_recipe[0] }}</h4>
                    </li>
                </ul>
                <button class="submit-ingredient-button" style="margin: 20px;width: -webkit-fill-available;padding: 10px 0;">Send to my email</button>
            </section>
        </transition>
    
    </div>
    `

};