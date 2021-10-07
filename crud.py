from sqlalchemy.orm import Session
import models, schema_validation
import datetime as dt


# USER CRUD
def get_user(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.user_id == user_id).first()


def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()


def create_user(db: Session, user: schema_validation.UserCreate):
    fake_hashed_password = user.password + "notreallyhashed"
    created_date = dt.datetime.today().strftime("%m-%d-%Y")
    db_user = models.User(
        email=user.email,
        hashed_password=fake_hashed_password,
        created_date=created_date,
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


# PORTFOLIO CRUD
def get_portfolio_by_name(db: Session, nickname: str, owner_id: int):
    return (
        db.query(models.Portfolio)
        .filter(
            models.Portfolio.owner_id == owner_id, models.Portfolio.nickname == nickname
        )
        .first()
    )


def create_portfolio(db: Session, portfolio: schema_validation.Portfolio):
    created_date = dt.datetime.today().strftime("%m-%d-%Y")
    db_portfolio = models.Portfolio(
        nickname=portfolio.nickname,
        owner_id=portfolio.owner_id,
        created_date=created_date,
    )
    db.add(db_portfolio)
    db.commit()
    db.refresh(db_portfolio)
    return db_portfolio


def retrieve_portfolio(db: Session, portfolio: schema_validation.Portfolio):
    return (
        db.query(models.Stock)
        .filter(models.Stock.portfolio_id == portfolio.portfolio_id)
        .all()
    )


# STOCK CRUD
def create_stock_item(db: Session, stock: schema_validation.StockBase):
    db_stock = models.Stock(**stock.dict())
    db.add(db_stock)
    db.commit()
    db.refresh(db_stock)
    return db_stock


def get_stock_in_portfolio(db: Session, stock: schema_validation.Stock):
    return (
        db.query(models.Stock)
        .filter(
            models.Stock.portfolio_id == stock.portfolio_id,
            models.Stock.ticker == stock.ticker,
        )
        .first()
    )


def get_stocks_in_portfolio(db: Session, portfolio_id: int):
    return (
        db.query(models.Stock).filter(models.Stock.portfolio_id == portfolio_id).first()
    )
