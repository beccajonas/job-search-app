from flask import Flask, make_response, jsonify, request, session
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
import datetime
from models import db, User, Job, Blog
from flask_cors import CORS
from dotenv import dotenv_values
from flask_bcrypt import Bcrypt
config = dotenv_values(".env")

app = Flask(__name__)
app.secret_key = config['FLASK_SECRET_KEY']
CORS(app)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///app.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.json.compact = False
bcrypt = Bcrypt(app)
migrate = Migrate(app, db)

db.init_app(app)

@app.get("/")
def index():
    return "job backend"

@app.get("/user/<int:id>/jobs")
def get_jobs_for_user(id):
    user = db.session.get(User, id)
    return [job.to_dict(rules=['-user', '-user_id']) for job in user.jobs]

@app.get("/user/<int:id>/blogs")
def get_blogs_for_user(id):
    user = db.session.get(User, id)
    return [blog.to_dict(rules=['-user', '-user_id']) for blog in user.blogs]

if __name__ == "__main__":
    app.run(port=5555, debug=True)
