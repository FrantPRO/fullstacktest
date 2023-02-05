from sqlalchemy import Column, Integer, String, Text
from app.database import Base


class Main(Base):
    __tablename__ = "main"

    id = Column(Integer, primary_key=True, index=True)
    content_type = Column(String)
    content = Column(Text)
