from sqlalchemy.orm import Session
from sqlalchemy import update, delete
import models, schema_validation
import datetime as dt


# RECIPES CRUD - VIEWS
def get_recipes_by_user(db: Session, user: str):
    return db.query(models.Recipes).filter(models.Recipes.User == user).all()


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
def update_recipe_by_id(
    db: Session, recipe_id: int, updated_recipe: schema_validation.Recipes
):
    original_recipe = (
        db.query(models.Recipes).filter(models.Recipes.Recipe_id == recipe_id).first()
    )

    changed_values = {
        key: val
        for key, val in updated_recipe.dict(exclude_unset=True).items()
        if updated_recipe.dict()[key] != original_recipe.__dict__[key]
    }

    if len(changed_values) == 0:
        return "No changes"

    assert (
        "Recipe_id" not in changed_values.keys()
        and "Created_date" not in changed_values.keys()
    ), "A value that shouldn't be changed is trying to be updated."

    query = (
        update(models.Recipes)
        .where(models.Recipes.Recipe_id == recipe_id)
        .values(**changed_values)
    )
    updated_recipe = db.execute(query)

    db.commit()
    return get_recipe_by_id(db, recipe_id=recipe_id)


# RECIPES CRUD - DELETE
def delete_recipe_by_id(db: Session, recipe_id: int):
    query = delete(models.Recipes).where(models.Recipes.Recipe_id == recipe_id)
    db.execute(query)
    db.commit()
