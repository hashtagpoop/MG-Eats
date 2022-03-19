import { ref, reactive, computed } from 'vue'

export const store = reactive({
    toastMessage: "",
    showToast: false,
    viewingUser: "",
    showRecipeModal: false,
    showAddRecipeModal: false,
    showEditRecipeModal: false,
    ableToAddToCart: false,
    showShoppingCart: false,
    recipesInCart: [],
    activeRecipe: "",
    shoppingCounter: computed(() => store.recipesInCart.length),
    displayToastMessage: (textToShow) => {
        store.toastMessage = textToShow;
        store.showToast = true;
        setTimeout(() => {
            store.showToast = false;
        }, 1500);
    },
    types: ["Breakfast", "Lunch", "Dinner", "Side", "Dessert"],
    filters: ["Italian", "Quick"],
    users: ["M&G", "Karen"],
    recipes: [
            {
                "Recipe_id": 5,
                "Title": "Dark Chocolate Brownies",
                "Created_date": "10-19-2021",
                "Ingredients": [
                    "1 1/3 cups chocolate morsels",
                    "1/3 cups chocolate morsels",
                    "1 cup granulated sugar",
                    "5 1/3 tbsp butter (cut into pieces)",
                    "2 tbsp water",
                    "2 large eggs",
                    "1 tsp vanilla extract",
                    "3/4 cup all purpose flour",
                    "1/4 tsp salt",
                    "8\" square baking pan"
                ],
                "Instructions": [
                    "1. Melt 1 1/3 cup chocolate, sugar, butter & water in a small saucepan over low heat until melted",
                    "2. Pour into medium bowl",
                    "3. With a wire whisk, stir in eggs one at a time until blended",
                    "4. Stir in vanilla extract",
                    "5. Add flour & salt, stir well",
                    "6. Stir in remaining 1/3 cup chocolate",
                    "7. Pour into 8\" square greased baking pan",
                    "8. Bake for 38 - 40 min (or until wooden pick inserted in center comes out slightly sticky",
                    "9. Cool in pan on wire rack"
                ],
                "TotalTime": "1h30m",
                "Serves": 16,
                "Tags": [],
                "ImageSrc": "https://www.kingarthurbaking.com/sites/default/files/styles/featured_image/public/2021-07/Deep-Dark-Brownies-KAF_21-1_01.jpg?itok=wvnXO5kX",
                "Type": "Dessert",
                "User": "m&g"
            },
            {
                "Recipe_id": 6,
                "Title": "Chicken Pot Pie",
                "Created_date": "10-21-2021",
                "Ingredients": [
                    "Chicken"
                ],
                "Instructions": [],
                "TotalTime": "45m",
                "Serves": 3,
                "Tags": [],
                "ImageSrc": "https://food.fnr.sndimg.com/content/dam/images/food/fullset/2009/6/12/0/IG0604H_33099_s4x3.jpg.rend.hgtvcom.826.620.suffix/1384540893720.jpeg",
                "Type": "Lunch",
                "User": "m&g"
            },
            {
                "Recipe_id": 7,
                "Title": "Chicken & Spinach Pasta",
                "Created_date": "10-26-2021",
                "Ingredients": [
                    "8 ounces gluten-free penne pasta or whole-wheat penne pasta",
                    "2 tablespoons extra-virgin olive oil",
                    "1 pound boneless, skinless chicken breast or thighs, trimmed, if necessary, and cut into bite-size pieces",
                    "½ teaspoon salt",
                    "¼ teaspoon ground pepper",
                    "4 cloves garlic, minced",
                    "½ cup dry white wine",
                    "Juice and zest of 1 lemon",
                    "10 cups chopped fresh spinach",
                    "4 tablespoons grated Parmesan cheese, divided"
                ],
                "Instructions": [
                    "1. Cook pasta according to package directions. Drain and set aside.",
                    "2. Meanwhile, heat oil in a large high-sided skillet over medium-high heat. Add chicken, salt and pepper; cook, stirring occasionally, until just cooked through, 5 to 7 minutes. Add garlic and cook, stirring, until fragrant, about 1 minute. Stir in wine, lemon juice and zest; bring to a simmer.",
                    "3. Remove from heat. Stir in spinach and the cooked pasta. Cover and let stand until the spinach is just wilted. Divide among 4 plates and top each serving with 1 tablespoon Parmesan"
                ],
                "TotalTime": "25M",
                "Serves": 2,
                "Tags": [
                    "Italian"
                ],
                "ImageSrc": "https://imagesvc.meredithcorp.io/v3/jumpstartpure/image?url=https://static.onecms.io/wp-content/uploads/sites/44/2019/08/26232349/5678426.jpg&w=1280&h=720&q=90&c=cc",
                "Type": "Dinner",
                "User": "m&g"
            },
            {
                "Recipe_id": 4,
                "Title": "Chocolate Covered Strawberries",
                "Created_date": "10-19-2021",
                "Ingredients": [],
                "Instructions": [],
                "TotalTime": "30m",
                "Serves": 2,
                "Tags": [],
                "ImageSrc": "https://images.unsplash.com/photo-1559715745-e1b33a271c8f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80",
                "Type": "Dessert",
                "User": "m&g"
            },
            {
                "Recipe_id": 2,
                "Title": "Creamed Corn",
                "Created_date": "10-18-2021",
                "Ingredients": [
                    "2 cans corn",
                    "3 tbsp butter",
                    "3 tbsp flour",
                    "1 1/2 cup half & half",
                    "Salt & pepper"
                ],
                "Instructions": [
                    "1. Melt butter under medium heat",
                    "2. Slowly mix flour into melted butter",
                    "3. Pour in half & half slowly (stopping in between pours to mix to keep thick)",
                    "4. Stir until thickened & smooth",
                    "5. Add corn & mix for 3 min",
                    "6. Add salt & pepper to taste"
                ],
                "TotalTime": "30m",
                "Serves": 6,
                "Tags": [],
                "ImageSrc": "https://cdn.apartmenttherapy.info/image/upload/f_auto,q_auto:eco,c_fill,g_center,w_1392,h_1740/k%2Farchive%2F33fbd112ad394d44c5bbca46c6085114051910a5",
                "Type": "Side",
                "User": "m&g"
            },
            {
                "Recipe_id": 3,
                "Title": "Mashed Potatoes",
                "Created_date": "10-18-2021",
                "Ingredients": [
                    "8-10 small potatoes or 5-6 big",
                    "Milk",
                    "Butter",
                    "Garlic salt",
                    "Cheese & bacon (optional)"
                ],
                "Instructions": [],
                "TotalTime": "50m",
                "Serves": 6,
                "Tags": [],
                "ImageSrc": "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/delish-mashed-potatoes-021-1541716941.jpg?crop=1xw:1xh;center,top&resize=768:*",
                "Type": "Side",
                "User": "m&g"
            },
            {
                "Recipe_id": 8,
                "Title": "One-Pan Chicken & Asparagus Bake",
                "Created_date": "10-26-2021",
                "Ingredients": [
                    "2 (8 ounce) boneless, skinless chicken breasts, cut in half crosswise",
                    "12 ounces baby Yukon Gold potatoes, halved lengthwise",
                    "8 ounces carrots, diagonally sliced into 1-inch pieces",
                    "3 tablespoons extra-virgin olive oil, divided",
                    "2 teaspoons ground coriander, divided",
                    "¾ teaspoon salt, divided",
                    "½ teaspoon ground pepper, divided",
                    "2 tablespoons lemon juice",
                    "2 tablespoons chopped shallot",
                    "1 tablespoon whole-grain Dijon mustard",
                    "2 teaspoons honey",
                    "1 pound fresh asparagus, trimmed",
                    "2 tablespoons chopped fresh flat-leaf parsley",
                    "1 tablespoon chopped fresh dill",
                    "Lemon wedges"
                ],
                "Instructions": [
                    "1. Preheat oven to 375 degrees F. Place chicken on a clean work surface and cover with plastic wrap. Using a meat mallet, pound the chicken pieces to an even 1/2-inch thickness. Arrange on one half of a large rimmed baking sheet. Arrange potatoes and carrots in a single layer on the other half of the pan. Drizzle the chicken and vegetables with 1 tablespoon oil; sprinkle with 1 teaspoon coriander, 1/2 teaspoon salt and 1/4 teaspoon pepper. Bake for 15 minutes",
                    "2. Meanwhile, whisk lemon juice, shallot, mustard, honey and the remaining 2 tablespoons oil, 1 teaspoon coriander, 1/4 teaspoon salt and 1/4 teaspoon pepper in a small bowl.",
                    "3. Remove the pan from the oven; switch the oven to broil. Stir the potato-carrot mixture; arrange asparagus in the center of the pan. Spoon the lemon juice-shallot mixture evenly over the chicken and vegetables. Broil until the chicken and vegetables are lightly browned, asparagus is tender-crisp and a thermometer inserted in the thickest portion of the chicken registers 165 degrees F, about 10 minutes. Remove from oven; sprinkle evenly with parsley and dill. Serve with lemon wedges."
                ],
                "TotalTime": "35M",
                "Serves": 2,
                "Tags": [],
                "ImageSrc": "https://imagesvc.meredithcorp.io/v3/jumpstartpure/image?url=https://cf-images.us-east-1.prod.boltdns.net/v1/static/5118192885001/0a8b6c4a-de47-4f86-ac58-1c073b38a42f/63db7eb6-2e28-4428-898b-bd6bb617dd6c/1280x720/match/image.jpg&w=1280&h=720&q=90&c=cc",
                "Type": "Dinner",
                "User": "m&g"
            },
            {
                "Recipe_id": 1,
                "Title": "Crunchwrap Supremé",
                "Created_date": "10-14-2021",
                "Ingredients": [
                    "2 tbsp olive oil, divided",
                    "1 lb ground beef",
                    "1 (1.25-ounce) package taco seasoning",
                    "4 (12-inch) flour tortillas",
                    "1/2 cup nacho cheese",
                    "4 tostada shells",
                    "1/2 cup sour cream",
                    "2 cups shredded lettuce",
                    "1 Roma tomato, diced",
                    "1 cup shredded Mexican blend cheese"
                ],
                "Instructions": [
                    "1. Heat 1 tablespoon olive oil in a large skillet over medium high heat",
                    "2. Add ground beef & cook until beef has browned about 3-6 minutes making sure to crumble the beef as it cooks",
                    "3. Stir in taco seasoning",
                    "4. Drain excess fat; set meat aside",
                    "5. Heat tortillas according to package instructions",
                    "6. Heat nacho cheese according to package instructions",
                    "7. Working one at a time, place ground beef mixture in the center of each tortilla",
                    "8. Top with nacho cheese & tostada shell",
                    "9. Spread sour cream in an even layer over the tostada shell",
                    "10. Top with lettuce, tomato & cheese",
                    "11. Fold the edges up & over the center, working your way around the tortilla folding as tight as possible",
                    "12. Heat remaining 1 tbsp of olive oil in a large skillet",
                    "13. Place wrap seam-side down & cook for about 2 minutes or until the underside is golden brown",
                    "14. Flip & cook wrap on the other side about 1-2 minutes longer."
                ],
                "TotalTime": "25m",
                "Serves": 3,
                "Tags": [
                    "Mexican",
                    " Fast",
                    " Tortillas"
                ],
                "ImageSrc": "https://www.createkidsclub.com/wp-content/uploads/2018/05/crunchwrap-recipe-supreme00007.jpg",
                "Type": "Dinner",
                "User": "m&g"
            },
            {
                "Recipe_id": 13,
                "Title": "Cornbread",
                "Created_date": "11-05-2021",
                "Ingredients": [
                    "1 1/4 cup all purpose flour",
                    "1 cup yellow corn meal",
                    "2/3 cup granulated sugar",
                    "1 tsp salt\nt tbsp baking powder",
                    "1 1/4 cup unsweetened almond milk",
                    "1/3 canola oil"
                ],
                "Instructions": [
                    "1. Preheat oven to 400ºF and lightly grease 8x8 pan",
                    "2. In a large bowl, combine the flour, cornmeal, sugar, salt and baking powder and stir",
                    "3. Pour in the almond milk and canola oil",
                    "4. Stir until well combined",
                    "5. Pour batter into prepared pan.",
                    "6. Bake for 20-25 minutes, or until a toothpick inserted into the center comes out clean"
                ],
                "TotalTime": "30m",
                "Serves": 12,
                "Tags": [],
                "ImageSrc": "https://bakerbettie.com/wp-content/uploads/2017/09/moist-cornbread-recipe4-720x540.jpg",
                "Type": "Side",
                "User": "m&g"
            }
    ]
})