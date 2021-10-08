var RecipeModal = {

    props: [
        'recipe',
    ],
    data() {
        return {
        }
    },
    methods: {
    },
    template:   `

    <div class="recipe-popout">
        <div class="info_and_image_grid">
        <div>
            <h1 class="heading">{{ recipe.Title }}</h1>
    
            <div class="recipe-info" style="color: #F7E1D7;font-size: 1.1em;letter-spacing: 2px;line-height: 18px;margin-top:15px;">
            <h3>Serves: {{ recipe.Serves }}</h3>
            <h3>Prep Time: {{ recipe.PrepTime }}</h3>
            </div>
            
            <hr />
    
            <div>
            <h1 class="heading" style="font-size: 1.7em;">Ingredients</h1>
            <ul class="ingredients-list">
                <li v-for="ingredient in recipe.Ingredients">{{ ingredient }}</li>
            </ul>
            </div>
            
            <hr style="height: .5px;"/>
    
        </div>
    
        <div>
            <img :src=" '../static/assets/recipes/' + recipe.ImageSrc" />
        </div>
        </div>
        
        <div class="directions">
        <h1 class="heading" style="font-size: 2em;">Directions:</h1>
        <ul>
            <li v-for="instruction in recipe.Instructions">{{ instruction }}</li>
        </ul>
        </div>
    
    </div>
    `

};