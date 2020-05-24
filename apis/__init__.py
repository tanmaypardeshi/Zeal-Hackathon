from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from datetime import datetime,timedelta

UPLOAD_FOLDER = '/home/tanmay/Code/Flask/React-Flask/apis/'
ALLOWED_EXTENSIONS = set(['txt', 'docx'])

app = Flask(__name__)
app.config['SECRET_KEY'] = 'e13f4992e67cd52facb93c874efaf84f'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'
app.config['JWT_SECRET_KEY'] = 'e13f4992e67cd52facb93c874efaf84f'
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(minutes=30)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)
cors = CORS(app, resources={
    r"/*": {
        "origins": "*"
    }
})

from apis import routes
