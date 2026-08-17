from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.expense import Expense
from app.models.category import Category
from app.schemas.expense import ExpenseCreate, ExpenseUpdate, ExpenseResponse
from app.models.user import User
from app.auth.dependencies import get_authenticated_user

# Groups all expense-related endpoints
router = APIRouter(
    prefix="/expenses",
    tags=["Expenses"]
)


@router.post("/", response_model=ExpenseResponse, status_code=status.HTTP_201_CREATED)
def create_expense(expense: ExpenseCreate, db: Session = Depends(get_db), current_user: User = Depends(get_authenticated_user)):
    # Checks if the category exists
    category = db.query(Category).filter(Category.id == expense.category_id, Category.user_id == current_user.id).first()
    if not category:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Category not found"
        )

    # Creates the new expense object
    new_expense = Expense(
        description=expense.description,
        amount=expense.amount,
        date=expense.date,
        category_id=expense.category_id, 
        user_id=current_user.id
    )

    db.add(new_expense)
    db.commit()
    db.refresh(new_expense)

    return new_expense


@router.get("/", response_model=list[ExpenseResponse])
def list_expenses(db: Session = Depends(get_db), current_user: User = Depends(get_authenticated_user)):
    # Returns all expenses from the database
    return db.query(Expense).filter(Expense.user_id == current_user.id).all()


@router.put("/{expense_id}", response_model=ExpenseResponse)
def update_expense(expense_id: int, expense: ExpenseUpdate, db: Session = Depends(get_db), current_user: User = Depends(get_authenticated_user)):
    # Checks if the expense exists
    db_expense = db.query(Expense).filter(
    Expense.id == expense_id,
    Expense.user_id == current_user.id
).first()
    if not db_expense:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Expense not found"
        )

    # Updates only the fields that were sent
    if expense.description is not None:
        db_expense.description = expense.description
    if expense.amount is not None:
        db_expense.amount = expense.amount
    if expense.date is not None:
        db_expense.date = expense.date
    if expense.category_id is not None:
        db_expense.category_id = expense.category_id

    db.commit()
    db.refresh(db_expense)

    return db_expense


@router.delete("/{expense_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_expense(expense_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_authenticated_user)):
    # Checks if the expense exists
    db_expense = db.query(Expense).filter(
        Expense.id == expense_id,
        Expense.user_id == current_user.id
    ).first()
    if not db_expense:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Expense not found"
        )

    db.delete(db_expense)
    db.commit()

