from pandas import DataFrame
from fractions import Fraction
import json


def combine_recipes(recipes):
    recipe_ingredients = [
        (json.loads(recipe.Ingredients), recipe.Title) for recipe in recipes
    ]

    df = DataFrame(recipe_ingredients)
    df.columns = ["Ingredient", "Recipe"]

    df = df.explode("Ingredient")
    df = df.dropna(subset=["Ingredient"])

    df["Amount"] = df["Ingredient"].str.extract("^([\d/*]+)")
    df["Amount"] = df["Amount"].fillna("0")
    df["Ingredient_"] = df["Ingredient"].str.extract("^[\d/*]*(.*)")

    df["Amount"] = df["Amount"].apply(Fraction)

    grouped = (
        df[["Amount", "Ingredient_", "Recipe"]]
        .groupby("Ingredient_")
        .agg({"Amount": sum, "Recipe": lambda x: ", ".join(set(x))})
        .reset_index()
    )

    grouped_ingredient_list = [
        [f"{amount}{ingredient}", recipe]
        if str(amount) != "0"
        else [f"{ingredient.strip()}", recipe]
        for ingredient, amount, recipe in grouped.values
    ]

    return grouped_ingredient_list
