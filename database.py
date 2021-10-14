from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os

seeding = True if os.environ.get("SEEDING") == "true" else False
development = True if os.environ.get("DATABASE_URL") == None else False

if seeding:
    SQLALCHEMY_DATABASE_URL = "sqlite:///../data/sql_app.db"
    engine = create_engine(
        SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
    )
elif development:
    SQLALCHEMY_DATABASE_URL = "sqlite:///./data/sql_app.db"
    engine = create_engine(
        SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
    )
else:
    SQLALCHEMY_DATABASE_URL = os.environ.get("DATABASE_URL").replace(
        "postgres", "postgresql"
    )
    engine = create_engine(SQLALCHEMY_DATABASE_URL)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()
