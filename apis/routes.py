from flask import jsonify, request
from apis import app, db
from .models import Textfile
from flask_cors import cross_origin


# for the Post method
@app.route("/addcontent", methods=['POST'])
@cross_origin()
def addcontent():
    post_data = request.get_json()
    new_content = Textfile(content=post_data['content'])
    db.session.add(new_content)
    db.session.commit()
    return 'Done', 201


@app.route("/showresult", methods=['GET'])
@cross_origin()
def showresult():
    get_data = Textfile.query.get(Textfile.query.count())
    data = {'content': get_data.content}

    return jsonify(data)
