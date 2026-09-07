from pydantic import BaseModel, ConfigDict
from datetime import datetime


class CategoryCreate(BaseModel):
    name: str


class CategoryResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str
    created_at: datetime