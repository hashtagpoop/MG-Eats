var RecipeModal = {

    props: [
        'notifications',
        'active'
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
            <h1 class="heading">Bacon Gouda Egg Sandwich</h1>
    
            <div class="recipe-info" style="color: #F7E1D7;font-size: 1.1em;letter-spacing: 2px;line-height: 18px;margin-top:15px;">
            <h3>Serves: 1</h3>
            <h3>Total Time: 1h30m</h3>
            </div>
            
            <hr />
    
            <div>
            <h1 class="heading" style="font-size: 1.7em;">Ingredients</h1>
            <ul class="ingredients-list">
                <li>lorem ipsum</li>
                <li>lorem ipsum</li>
                <li>lorem ipsum</li>
                <li>lorem ipsum</li>
                <li>lorem ipsum</li>
                <li>lorem ipsum</li>
            </ul>
            </div>
            
            <hr style="height: .5px;"/>
    
        </div>
    
        <div>
            <img src="https://bitezburger.com/static/gallery%20imgs/fries-close-up.jpg" />
        </div>
        </div>
        
        <div class="directions">
        <h1 class="heading" style="font-size: 2em;">Directions:</h1>
        <ol>
            <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit</li>
            <li>Nam pharetra mi eget mauris finibus, sollicitudin euismod magna faucibus mi eget mauris</li>
            <li>Nulla port Nam pharetra mi eget mauris finibus, sollicitudin euismod magna</li>
            <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit</li>
            <li>Nam pharetra mi eget mauris finibus, sollicitudin euismod magna faucibus mi eget mauris</li>
        </ol>
        </div>
    
    </div>
    `

};