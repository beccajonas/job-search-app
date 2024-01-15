from app import app
from models import db, User, Blog, Job
import json
from flask_bcrypt import Bcrypt

if __name__ == "__main__":
    with app.app_context():
        bcrypt = Bcrypt(app)
        data = {}
        with open("db.json") as f:
            data = json.load(f)
        User.query.delete()
        Blog.query.delete()
        Job.query.delete()

        user_list = []
        for user in data["users"]:
            u = User(
                first_name=user.get("first_name"),
                last_name=user.get("last_name"),
                user_name=user.get("user_name"),
                password=bcrypt.generate_password_hash(user.get('password'))
            )
            user_list.append(u)
        db.session.add_all(user_list)
        db.session.commit()

        for job in data["jobs"]:
            j = Job(
                job_title=job.get('job_title'),
                company=job.get('company'),
                work_location=job.get('work_location'),
                job_description=job.get('job_description'),
                date_applied=job.get('date_applied'),
                status=job.get('status'),
                notes=job.get('notes'),
                favorite=job.get('favorite'),
                salary=job.get('salary'),
                user_id=job.get('user_id')
            )
            db.session.add(j)
            db.session.commit()

        for blog in data["blogs"]:
            b = Blog(
                author=blog.get('author'),
                title=blog.get('title'),
                link=blog.get('link'),
                image=blog.get('image'),
                user_id=blog.get('user_id')
            )
            db.session.add(b)
            db.session.commit()
print("seeding complete")