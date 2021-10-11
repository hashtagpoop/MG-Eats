import pytest


def test_add_recipe():
    pass


def test_tag_manipulation():
    """Test that ingredients are properly included in a recipe's tag list"""
    pass


def test_view_recipe():
    from sqlalchemy import create_engine
    from sqlalchemy.orm import sessionmaker
    import os

    development = True if os.environ.get("DATABASE_URL") == None else False

    if development:
        SQLALCHEMY_DATABASE_URL = "sqlite:///./data/sql_app.db"
    else:
        SQLALCHEMY_DATABASE_URL = "postgresql://user:password@postgresserver/db"

    engine = create_engine(
        SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
    )
    SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
    db = SessionLocal()
    db.query(models.Recipes).filter(models.Recipes.Recipe_id == 1).first()
    db.close()
