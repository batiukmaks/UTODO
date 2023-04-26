from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

engine = create_engine('mysql://root:mysql007@127.0.0.1:3306/utodolist?charset=utf8mb4&multi_statements=True', pool_pre_ping=True, pool_size=50)
Session = sessionmaker(bind=engine)

def get_session():
    return Session()
