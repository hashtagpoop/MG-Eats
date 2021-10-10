from sqlalchemy.orm import Session
import models, schema_validation
import datetime as dt


# RECIPES CRUD - VIEWS
def get_recipes_by_user(db: Session, user: str):
    return db.query(models.Recipes).filter(models.Recipes.User == user).first()


def get_recipe_by_id(db: Session, recipe_id: int):
    return (
        db.query(models.Recipes).filter(models.Recipes.Recipe_id == recipe_id).first()
    )


def get_recipe_by_title_and_user(db: Session, recipe_user: str, recipe_title: str):
    return (
        db.query(models.Recipes)
        .filter(models.Recipes.Title == recipe_title)
        .filter(models.Recipes.User == recipe_user)
        .first()
    )


# RECIPES CRUD - CREATE
def create_recipe(db: Session, recipe: schema_validation.Recipes):
    created_date = dt.datetime.today().strftime("%m-%d-%Y")
    recipe_object = models.Recipes(
        Created_date=created_date,
        Title=recipe.Title,
        Ingredients=recipe.Ingredients,
        Instructions=recipe.Instructions,
        TotalTime=recipe.TotalTime,
        Serves=recipe.Serves,
        Tags=recipe.Tags,
        ImageSrc=recipe.ImageSrc,
        Type=recipe.Type,
        User=recipe.User,
    )
    db.add(recipe_object)
    db.commit()
    db.refresh(recipe_object)
    return recipe_object


# RECIPES CRUD - UPDATE


# RECIPES CRUD - DELETE
