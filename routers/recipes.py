from fastapi import APIRouter, Depends, HTTPException, Form
from sqlalchemy.orm import Session, exc
from enum import Enum
from database import SessionLocal
from typing import List
import crud, schema_validation


router = APIRouter(
    prefix="/recipes",
    tags=["recipes"],
    responses={404: {"description": "Recipe not found!"}},
)


class UserName(str, Enum):
    Karen = "Karen"


# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/", response_model=schema_validation.Recipes, status_code=201)
def create_recipe(recipe: schema_validation.NewRecipe, db: Session = Depends(get_db)):
    print(recipe)
    recipe_object = crud.get_recipe_by_title_and_user(
        db, recipe_title=recipe.Title, recipe_user=recipe.User
    )
    if recipe_object:
        raise HTTPException(
            status_code=400, detail="This user already has this recipe name!"
        )
    return crud.create_recipe(db=db, recipe=recipe)


@router.get("/", response_model=List[schema_validation.Recipes])
def get_default_user(db: Session = Depends(get_db)):
    default_user = "M&G"
    recipes = crud.get_recipes_by_user(db, user=default_user)
    print(recipes)
    if recipes is None:
        raise HTTPException(status_code=404, detail="No recipes for user.")
    return recipes


@router.get(
    "/{user_name}", response_model=List[schema_validation.Recipes], status_code=200
)
def get_recipes_by_user(user_name: UserName, db: Session = Depends(get_db)):
    recipes = crud.get_recipes_by_user(db, user=user_name)
    if recipes is None:
        raise HTTPException(status_code=404, detail="User not found")
    return recipes


@router.post("/", response_model=schema_validation.Recipes, status_code=201)
def create_recipe(recipe: schema_validation.NewRecipe, db: Session = Depends(get_db)):
    print(recipe)
    recipe_object = crud.get_recipe_by_title_and_user(
        db, recipe_title=recipe.Title, recipe_user=recipe.User
    )
    if recipe_object:
        raise HTTPException(
            status_code=400, detail="This user already has this recipe name!"
        )
    return crud.create_recipe(db=db, recipe=recipe)


@router.put("/{recipe_id}", response_model=schema_validation.Recipes, status_code=200)
def update_recipe_by_id(
    recipe_id: int,
    updated_recipe: schema_validation.Recipes,
    db: Session = Depends(get_db),
):
    recipes = crud.update_recipe_by_id(
        db, recipe_id=recipe_id, updated_recipe=updated_recipe
    )
    if recipes is None:
        raise HTTPException(status_code=404, detail="Recipe doesn't exist")
    return recipes

@router.delete("/{recipe_id}", status_code=204)
def delete_recipe_by_id(recipe_id: int, db: Session = Depends(get_db)):
    try:
        crud.delete_recipe_by_id(db, recipe_id)
    except exc.SQLAlchemyError:
        raise HTTPException(status_code=500, detail="Underlying database operation failed")
    except Exception:
        raise HTTPException(status_code=500, default="Internal server error")

    return 