from flask import Flask, make_response, jsonify, request, session
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
import datetime
from models import db, User, Job, Blog
from flask_cors import CORS
from dotenv import dotenv_values
from flask_bcrypt import Bcrypt, check_password_hash
from flask_session import Session

config = dotenv_values(".env")

app = Flask(__name__)
app.secret_key = config['FLASK_SECRET_KEY']
CORS(app)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///app.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.json.compact = False
bcrypt = Bcrypt(app)
migrate = Migrate(app, db)
app.config['SESSION_TYPE'] = 'filesystem'
Session(app)

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

@app.get('/check_session')
def check_session():
    user = db.session.get(User, session.get('user_id'))
    print(f'check session {session.get("user_id")}')
    if user:
        return user.to_dict(rules=['-password_hash']), 200
    else:
        return {"message": "No user logged in"}, 401

#Login / Logout
@app.post('/login')
def login():
    data = request.json
    print(data)
    # print(f'Attempting login for user: {data.get("user_name")} with password: {data.get("password")}')

    user = User.query.filter(User.user_name == data.get('user_name')).first()

    if user and bcrypt.check_password_hash(user.password, data.get('password')):
        print(f'Before setting user_id: {session.get("user_id")}')
        session['user_id'] = user.id
        session.permanent = True  # Set session to permanent
        print(f'After setting user_id: {session.get("user_id")}')
        print('success')
        return user.to_dict(), 200
    else:
        print(f'Before setting user_id: {session.get("user_id")}')
        return {'error': 'Invalid username or password'}, 401


    
@app.delete('/logout')
def logout():
    session.pop('user_id')
    return {'message': 'Logged out'}, 200
    

if __name__ == "__main__":
    app.run(port=5555, debug=True)
