from sqlalchemy import Column, Integer, String
from database import Base


class Recipes(Base):
    __tablename__ = "recipes"

    Recipe_id = Column(Integer, primary_key=True, index=True)
    Title = Column(String)
    Created_date = Column(String)
    Ingredients = Column(String)
    Instructions = Column(String)
    TotalTime = Column(String)
    Serves = Column(Integer)
    Tags = Column(String)
    ImageSrc = Column(String)
    Type = Column(String)
    User = Column(Integer)
