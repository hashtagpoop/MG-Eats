from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os

seeding = True if os.environ.get("SEEDING") == "true" else False
development = True if os.environ.get("DATABASE_URL") == None else False

if seeding:
    SQLALCHEMY_DATABASE_URL = "sqlite:///../data/sql_app.db"
elif development:
    SQLALCHEMY_DATABASE_URL = "sqlite:///./data/sql_app.db"
else:
    SQLALCHEMY_DATABASE_URL = os.environ.get("DATABASE_URL")

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()
