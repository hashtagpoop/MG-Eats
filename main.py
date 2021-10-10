from typing import List

from fastapi import Depends, FastAPI, HTTPException
from sqlalchemy.orm import Session

import crud, models, schema_validation
from database import SessionLocal, engine
from routers import recipes

import datetime as dt
import os


models.Base.metadata.create_all(bind=engine)

app = FastAPI()
app.include_router(recipes.router)

today = dt.datetime.today()
development = True if os.environ.get("DATABASE_URL") == None else False


# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
