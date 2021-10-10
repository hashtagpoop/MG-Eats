from fastapi import APIRouter, Depends, HTTPException, Form
from sqlalchemy.orm import Session
from enum import Enum
from database import SessionLocal, engine
import crud, schema_validation


router = APIRouter(
    prefix="/recipes",
    tags=["recipes"],
    responses={404: {"description": "Recipe not found!"}},
)


class UserName(str, Enum):
    moose_and_goose = "MG"
    karen = "karen"


# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/", response_model=schema_validation.Recipes)
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


@router.get("/{user_name}", response_model=schema_validation.Recipes)
def get_recipes_by_user(user: UserName, db: Session = Depends(get_db)):
    recipes = crud.get_recipes_by_user(db, user_name=user)
    if recipes is None:
        raise HTTPException(status_code=404, detail="User not found")
    return recipes
