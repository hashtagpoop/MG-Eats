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
            <header style="display: flex;justify-content: space-between;padding: 25px 20px 20px 20px;">
                <h1 style="font-size: 1.7em;margin:0;align-self: center;">Add Recipes</h1>
                <button @click="$emit('close')" class="close-button" style="padding:10px 25px;">Close</button>
            </header>
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