from models import Portfolio
from typing import List, Optional
from pydantic import BaseModel


class UserBase(BaseModel):
    email: str


class UserCreate(UserBase):
    password: str


class User(UserBase):
    user_id: int

    class Config:
        orm_mode = True


class StockBase(BaseModel):
    ticker: str
    average_cost: Optional[str] = None
    shares: Optional[int] = 1


class Stock(StockBase):
    portfolio_id: int

    class Config:
        orm_mode = True


class Portfolio(BaseModel):
    nickname: Optional[str]
    owner_id: Optional[int]
    portfolio_id: Optional[int]

    class Config:
        orm_model = True
