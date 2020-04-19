from flask import jsonify, request, session
from apis import app, db
from .models import Textfile
from flask_cors import cross_origin


# for the Post method
@app.route("/addcontent", methods=['POST'])
@cross_origin()
def addcontent():
    post_data = request.get_json()
    title = post_data['title']
    content = post_data['content']
    check_unique = Textfile.query.filter_by(title=title).first()

    if check_unique is None:
        new_content = Textfile(title=title, content=content)
        db.session.add(new_content)
        db.session.commit()
        session['title'] = title
        return {'success': 'Done'}

    elif title == check_unique.title:
        return {'failure': 'Please enter a different title for your file. The one entered already exists'}


@app.route("/showresult", methods=['GET'])
@cross_origin()
def showresult():
    get_data = Textfile.query.filter_by(title=session['title']).first()
    data = {'title': get_data.title, 'content': get_data.content}
    return jsonify(data)
