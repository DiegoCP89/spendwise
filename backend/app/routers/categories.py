from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.category import Category
from app.schemas.category import CategoryCreate, CategoryResponse
from app.models.user import User
from app.auth.dependencies import get_authenticated_user

# Groups all category-related endpoints
router = APIRouter(
    prefix="/categories",
    tags=["Categories"]
)


@router.post("/", response_model=CategoryResponse, status_code=status.HTTP_201_CREATED)
def create_category(category: CategoryCreate, db: Session = Depends(get_db), current_user: User = Depends(get_authenticated_user)):    
    # Checks if a category with the same name already exists
    existing = db.query(Category).filter(Category.name == category.name, Category.user_id == current_user.id
).first()
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Category with this name already exists"
        )

    # Creates the new category object
    new_category = Category(name=category.name, user_id=current_user.id)

    # Adds to the session, confirms and refreshes the object
    db.add(new_category)
    db.commit()
    db.refresh(new_category)

    return new_category


@router.get("/", response_model=list[CategoryResponse])
def list_categories(db: Session = Depends(get_db), current_user: User = Depends(get_authenticated_user)):
    # Returns all categories from the database
    return db.query(Category).filter(Category.user_id == current_user.id).all()