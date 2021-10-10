from typing import List, Optional
from pydantic import BaseModel


class NewRecipe(BaseModel):
    Title: Optional[str]
    Ingredients: Optional[str]
    Instructions: Optional[str]
    TotalTime: str
    Serves: int
    Tags: Optional[str]
    ImageSrc: str
    Type: Optional[str]
    User: Optional[str]

    class Config:
        orm_mode = True
        arbitrary_types_allowed = True


class Recipes(BaseModel):
    Recipe_id: int
    Title: Optional[str]
    Created_date: Optional[str]
    Ingredients: Optional[str]
    Instructions: Optional[str]
    TotalTime: str
    Serves: int
    Tags: Optional[str]
    ImageSrc: str
    Type: Optional[str]
    User: Optional[str]

    class Config:
        orm_mode = True
        arbitrary_types_allowed = True
