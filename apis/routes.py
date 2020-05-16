from flask import jsonify, request
from apis import app, bcrypt, db
from flask_cors import cross_origin
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from .models import User, Summary


@app.route("/api/summarise", methods=['POST'])
@cross_origin()
def summarise():
    post_data = request.get_json()
    email = post_data['email']
    title = post_data['title']
    content = post_data['content']
    new_content = modify1(content)
    if email != "":
        summary = Summary(title=title, summary=new_content, user_email=email)
        db.session.add(summary)
        db.session.commit()
    return jsonify({'data': new_content}), 200


@app.route("/api/irquery", methods=['POST'])
@cross_origin()
def info_retrieval():
    post_data = request.get_json()
    query = post_data['query']
    filtertype = post_data['filter']
    if filtertype == 'Name':
        new_content = modify2(query)
        return jsonify({'data': new_content}), 200
    new_content = modify3(query)
    return jsonify({'data': new_content}), 200


@app.route("/api/register", methods=['POST'])
@cross_origin()
def register():
    user_data = request.get_json()
    email = user_data['email']
    name = user_data['name']
    password = bcrypt.generate_password_hash(user_data['password']).decode('utf-8')
    profession = user_data['profession']

    if not email:
        return jsonify({'error': 'Missing email'}), 400
    if not name:
        return jsonify({'error': 'Missing name'}), 400
    if not password:
        return jsonify({'error': 'Missing password'}), 400
    if not profession:
        return jsonify({'error': 'Missing profession'}), 400

    if User.query.filter_by(email=email).first() != email or User.query.filter_by(email=email).first() is None:
        user = User(email=email, name=name, profession=profession, password=password)
        db.session.add(user)
        print("HI")
        db.session.commit()
        token = create_access_token(identity={'name': name, 'email': email})
        data = {
            'token': token,
            'email': email,
            'name': name,
            'profession': profession,
        }
        return jsonify({'data': data}), 200
    else:
        return jsonify({'error': 'User already exists'}), 401


@app.route("/api/login", methods=['POST'])
@cross_origin()
def login():
    user_data = request.get_json()
    email = user_data['email']
    password = user_data['password']
    if not email:
        return jsonify({'error': 'Missing email'}), 400
    if not password:
        return jsonify({'error': 'Missing password'}), 400
    try:
        object_data = User.query.filter_by(email=email).first()
        check_password = object_data.password
        if bcrypt.check_password_hash(check_password, password):
            token = create_access_token(identity={'name': object_data.name, 'email': object_data.email})
            data = {
                'token': token,
                'email': object_data.email,
                'name': object_data.name,
                'profession': object_data.profession,
            }
            return jsonify({'data': data}), 200
        return jsonify({'error': 'Password is wrong'}), 401
    except:
        return jsonify({'error': 'User does not exist'}), 401


@app.route('/api/mysummaries', methods=['GET'])
@jwt_required
def mysummaries():
    current_user = get_jwt_identity()
    email = current_user['email']
    summaries = Summary.query.filter_by(user_email=email).all()
    mysummaries = []
    objects = {}
    for summary in summaries:
        objects['title'] = summary.title
        objects['summary'] = summary.summary
        mysummaries.append(objects)
        objects = {}
    return jsonify({'mysummaries': mysummaries})


def modify1(content):
    new_content = ""
    for character in content:
        if character == '.':
            continue
        else:
            new_content += character
    return new_content


def modify2(content):
    data = [
        {
            'title': content + " 1",
            'content': "This is Tanmay Pardeshi's LinkedIn profile",
            'author_name': "Tanmay Pardeshi",
            'link': "https://www.linkedin.com/in/tanmaypardeshi/"
        },
        {
            'title': content + " 2",
            'content': "This is Tanmay Pardeshi's Github profile",
            'author_name': "Tanmay Pardeshi",
            'link': "https://github.com/tanmaypardeshi"
        },
        {
            'title': content + " 3",
            'content': "This is has Tanmay Pardeshi's emailId",
            'author_name': "Tanmay Pardeshi",
            'link': "tanmaypardeshi@gmail.com"
        },
    ]
    return data


def modify3(content):
    data = [
        {
            'title': content + " 1",
            'content': "This is Kaustubh Odak's LinkedIn profile",
            'author_name': "Kaustubh Odak",
            'link': "https://www.linkedin.com/in/kaustubh-odak-2534a719b"
        },
        {
            'title': content + " 2",
            'content': "This is Kaustubh Odak's Github profile",
            'author_name': "Kaustubh Odak",
            'link': "https://github.com/kausko"
        },
        {
            'title': content + " 3",
            'content': "This is has Kaustubh Odak's emailId",
            'author_name': "Kaustubh Odak",
            'link': "kaustubhodak1@gmail.com"
        },
    ]
    return data
