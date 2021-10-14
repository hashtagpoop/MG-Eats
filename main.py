from fastapi import Depends, FastAPI, HTTPException, Request
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session

import crud, models, schema_validation
from database import SessionLocal, engine
from routers import recipes

import datetime as dt
import os


models.Base.metadata.create_all(bind=engine)

app = FastAPI()
app.include_router(recipes.router)
app.mount("/static", StaticFiles(directory="./static"), name="static")

today = dt.datetime.today()
development = True if os.environ.get("DATABASE_URL") == None else False
templates = Jinja2Templates(directory="templates")


# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get("/", status_code=200)
def show_landing(request: Request):

    context = dict(request=request)

    return templates.TemplateResponse("index.html", context)
