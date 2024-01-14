from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy_serializer import SerializerMixin
import string, datetime

metadata = MetaData(
    naming_convention={
        "ix": "ix_%(column_0_label)s",
        "uq": "uq_%(table_name)s_%(column_0_name)s",
        "ck": "ck_%(table_name)s_%(constraint_name)s",
        "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
        "pk": "pk_%(table_name)s",
    }
)
db = SQLAlchemy(metadata=metadata)

class Job(db.Model, SerializerMixin):
    __tablename__ = "job_table"
    id = db.Column(db.Integer, primary_key=True)
    job_title = db.Column(db.String)
    company = db.Column(db.String)
    work_location = db.Column(db.String)
    job_description = db.Column(db.String)
    date_applied = db.Column(db.String)
    status = db.Column(db.String)
    notes = db.Column(db.String)
    favorite = db.Column(db.Boolean)
    salary = db.Column(db.String)
    user_id = db.Column(db.Integer, db.ForeignKey("user_table.id"))
    
    user = db.relationship("User", back_populates="jobs")

class User(db.Model, SerializerMixin):
    __tablename__ = "user_table"
    serialize_rules = ["-jobs.user", "-blogs.user"]
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String, nullable=False)
    last_name = db.Column(db.String, nullable=False)
    password_hash = db.Column(db.String, nullable=False)
    
    jobs = db.relationship("Job", back_populates="user")
    blogs = db.relationship("Blog", back_populates="user")

class Blog(db.Model, SerializerMixin):
    __tablename__ = "blog_table"
    id = db.Column(db.Integer, primary_key=True)
    author = db.Column(db.String)
    title = db.Column(db.String)
    link = db.Column(db.String)
    image = db.Column(db.String)
    user_id = db.Column(db.Integer, db.ForeignKey("user_table.id"))
    
    user = db.relationship("User", back_populates='blogs')
