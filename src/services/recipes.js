import { ref, reactive } from 'vue'
import { store } from "../store"

function submitNewRecipe (recipeObj) {
    stringifyRecipe(recipeObj);

    fetch("/recipes/v1", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(recipeObj),
    })
      .then((response) => {
        if (!response.ok) {
          console.log("Failed to add recipe");
          store.displayToastMessage("Failed to add recipe");
          throw new Error(response["detail"]);
        } else {
          return response;
        }
      })
      .then((response) => response.json())
      .then((data) => {
        var newRecipeFromServer = data;
        parseRecipe(newRecipeFromServer);
        store.recipes.push(newRecipeFromServer);
        store.displayToastMessage("Successfully added recipe!");
      })
      .catch((error) => {
        console.log(error);
        store.displayToastMessage("Failed to add recipe");
      });
}

function submitEditedRecipe (updatedRecipe) {
    console.log("Updating recipe...");

    var originalRecipe = store.recipes.find(
        (recipe) => recipe.Recipe_id == updatedRecipe.Recipe_id
    );

    stringifyRecipe(updatedRecipe);

    fetch("/recipes/v1/" + updatedRecipe.Recipe_id, {
        method: "PUT",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedRecipe),
    })
    .then((response) => {
    if (!response.ok) {
        console.log("Failed to update recipe");
        store.displayToastMessage("Failed to update recipe");
        throw new Error(response["detail"]);
    } else {
        return response;
    }
    })
    .then((response) => response.json())
    .then((data) => {
    var updatedRecipeFromServer = data;
    parseRecipe(updatedRecipeFromServer);

    Object.assign(originalRecipe, updatedRecipeFromServer);
    store.displayToastMessage("Successfully updated recipe!");
    })
    .catch((error) => {
    console.log(error);
    });
}

function removeRecipe (indexOfRecipeToBeRemoved) {
    fetch("/recipes/v1/" + indexOfRecipeToBeRemoved, {
        method: "DELETE",
    })
    .then((response) => {
    if (!response.ok) {
        console.log("Failed to remove recipe");
        store.displayToastMessage("Failed to remove recipe");
        throw new Error("Failed to remove recipe");
    } else {
        return response;
    }
    })
    .then((response) => response.json())
    .then((data) => {
        currentIndexOfItem = store.recipes.findIndex(
            (recipe) => recipe.Recipe_id == indexOfRecipeToBeRemoved
        );
        store.recipes.splice(currentIndexOfItem, 1);
        store.displayToastMessage("Successfully removed recipe!");
    })
    .catch((error) => {
        console.log(error);
        store.displayToastMessage("Failed to remove recipe");
    });
}

function loadRecipes () {
    fetch("/recipes/v1/" + store.viewingUser, {
        method: "GET",
    })
    .then((response) => response.json())
    .then((data) => {
    var recipes = data;

    try {
        recipes.forEach((recipe) => {
        parseRecipe(recipe);
        });
    } catch (error) {
        console.log("Failed to clean recipes");
        console.log(error);
    }
    store.recipes = recipes;
    });
}

function parseRecipe (recipeObj) {
    Object.keys(recipeObj).forEach((key) => {
        if (typeof recipeObj[key] == "string") {
            if (recipeObj[key].indexOf("[") > -1) {
                recipeObj[key] = JSON.parse(
                    recipeObj[key].replace(/'/g, '"')
                );
            }
        }
    });
}

function stringifyRecipe (recipeObj) {
    Object.keys(recipeObj).forEach((key) => {
        if (typeof recipeObj[key] == "object") {
        recipeObj[key] = JSON.stringify(recipeObj[key]);
        }
    });
}

export const useRecipeService = reactive({
    submitNewRecipe: submitNewRecipe,
    submitEditedRecipe: submitEditedRecipe,
    removeRecipe: removeRecipe,
    loadRecipes: loadRecipes,
    parseRecipe: parseRecipe,
    stringifyRecipe: stringifyRecipe,
  });