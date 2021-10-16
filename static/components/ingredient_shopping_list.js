var IngredientModal = {

    props: [
        'cart'
    ],
    data() {
        return {
            showResults: false,
        }
    },
    methods: {
    },
    template:   `
    <div class="ingredients-sidebar">

        <section v-if="!showResults">
            <h1>Add Recipes</h1>
            <hr>
            <ul class="cart">
                <li v-for="recipe in cart">
                    {{recipe.Title}}
                </li>
            </ul>
        </section>

        <section v-else>
            <h1>Shopping List</h1>
        </section>
    
    </div>
    `

};