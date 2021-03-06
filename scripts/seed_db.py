# Purpose: seeds the database with test data
# Usage: SEEDING=true python3 seed_db.py

import sys
import os

sys.path.append("..")

import models
from crud import create_recipe
from database import SessionLocal, engine
from schema_validation import NewRecipe

recipes = [
    NewRecipe.parse_obj(
        {
            "Title": "Bitez Burger",
            "Ingredients": "[]",
            "Instructions": "[]",
            "TotalTime": "20min",
            "Serves": 6,
            "Tags": "[]",
            "ImageSrc": "https://bitezburger.com/static/images/burger-closeup.jpg",
            "Type": "Breakfast",
            "User": "M&G",
        }
    ),
    NewRecipe.parse_obj(
        {
            "Title": "Bonchon",
            "Ingredients": "[]",
            "Instructions": "[]",
            "TotalTime": "20min",
            "Serves": 4,
            "Tags": "[]",
            "ImageSrc": "https://1.bp.blogspot.com/-2xAoPwMd81M/XrCLTJbsofI/AAAAAAAApqQ/8r-zW0ozMFwD4bmM8O0WQ9wkGlNLq_LDgCLcBGAsYHQ/s1600/fried-chicken-bonchon.jpg",
            "Type": "Lunch",
            "User": "M&G",
        }
    ),
    NewRecipe.parse_obj(
        {
            "Title": "Bonchon",
            "Ingredients": "[]",
            "Instructions": "[]",
            "TotalTime": "20min",
            "Serves": 4,
            "Tags": "[]",
            "ImageSrc": "https://1.bp.blogspot.com/-2xAoPwMd81M/XrCLTJbsofI/AAAAAAAApqQ/8r-zW0ozMFwD4bmM8O0WQ9wkGlNLq_LDgCLcBGAsYHQ/s1600/fried-chicken-bonchon.jpg",
            "Type": "Lunch",
            "User": "M&G",
        }
    ),
    NewRecipe.parse_obj(
        {
            "Title": "Creamed Corn",
            "Ingredients": """["2 cans corn",
                "3 tbsp butter",
                "3 tbsp flour",
                "salt",
                "pepper",
              ]""",
            "Instructions": """["(1) Melt butter under medium heat",
                "(2) Mix flour into melted butter until paste forms",
                "(3) Slowly mix in half & half, stirring in between to ensure mixture stays thick",
                "(4) Continue stirring over heat until thickened & smooth",
                "(5) Add corn & mix for 3 minutes",
                "(6) Add salt & pepper to taste"]""",
            "TotalTime": "20min",
            "Serves": 4,
            "Tags": "[]",
            "ImageSrc": "https://theblondcook.com/wp-content/uploads/2018/10/easy-creamed-corn-4.jpg",
            "Type": "Lunch",
            "User": "M&G",
        }
    ),
]

models.Base.metadata.create_all(bind=engine)
db = SessionLocal()


def seed_recipes():
    for recipe in recipes:
        create_recipe(db, recipe)


if __name__ == "__main__":
    seed_recipes()
