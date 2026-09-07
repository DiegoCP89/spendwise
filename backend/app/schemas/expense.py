from pydantic import BaseModel, ConfigDict
from datetime import date as Date, datetime
from decimal import Decimal
from typing import Optional


class ExpenseCreate(BaseModel):
    description: str
    amount: Decimal
    date: Date
    category_id: int


class ExpenseUpdate(BaseModel):
    description: Optional[str] = None
    amount: Optional[Decimal] = None
    date: Optional[Date] = None
    category_id: Optional[int] = None

class ExpenseResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    description: str
    amount: Decimal
    date: Date
    category_id: int
    created_at: datetime