from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Float
from sqlalchemy.orm import relationship

from database import Base


class User(Base):
    __tablename__ = "users"

    user_id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True)
    hashed_password = Column(String)
    is_active = Column(Boolean, default=True)
    created_date = Column(String)

    portfolio = relationship("Portfolio", back_populates="owner")


class Portfolio(Base):
    __tablename__ = "portfolios"

    portfolio_id = Column(Integer, primary_key=True, index=True)
    nickname = Column(String)
    created_date = Column(String)
    owner_id = Column(Integer, ForeignKey("users.user_id"))

    owner = relationship("User", back_populates="portfolio")
    stocks = relationship("Stock", back_populates="portfolio")


class Stock(Base):
    __tablename__ = "stocks"

    stock_id = Column(Integer, primary_key=True, index=True)
    ticker = Column(String)
    portfolio_id = Column(Integer, ForeignKey("portfolios.portfolio_id"))
    average_cost = Column(Float)
    shares = Column(Integer)

    portfolio = relationship("Portfolio", back_populates="stocks")
