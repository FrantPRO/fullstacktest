from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
import app.models as models
from app.database import engine, SessionLocal
from sqlalchemy.orm import Session

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

models.Base.metadata.create_all(bind=engine)


def get_db():
    try:
        db = SessionLocal()
        yield db
    finally:
        db.close()


class Main(BaseModel):
    content_type: str = Field(min_length=1)
    content: str = Field(min_length=1)


@app.get("/")
async def get_all(db: Session = Depends(get_db)):
    return db.query(models.Main).all()


@app.get("/{adtype}")
async def get_ad(adtype: str, db: Session = Depends(get_db)):
    main_model = db.query(models.Main).filter(models.Main.content_type == adtype).first()
    if main_model is None:
        raise HTTPException(status_code=404, detail=f"Type {adtype} does not exist")
    return main_model.content
