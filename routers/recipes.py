from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.orm import Session
from enum import Enum
from database import SessionLocal
from typing import List
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
import crud, schema_validation


router = APIRouter(
    prefix="/recipes",
    tags=["recipes"],
    responses={404: {"description": "Recipe not found!"}},
)

templates = Jinja2Templates(directory="templates")
print(templates)


class UserName(str, Enum):
    Karen = "Karen"


# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/", response_model=List[schema_validation.Recipes], status_code=200)
def get_default_user(request: Request, db: Session = Depends(get_db)):
    default_user = "M&G"
    recipes = crud.get_recipes_by_user(db, user=default_user)
    print(recipes)
    if recipes is None:
        raise HTTPException(status_code=404, detail="No recipes for user.")

    context = dict(request=request, recipes=recipes)

    return templates.TemplateResponse("recipes.html", context)


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
