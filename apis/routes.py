from flask import jsonify, request
from apis import app
from flask_cors import cross_origin


@app.route("/summarise", methods=['POST'])
@cross_origin()
def summarise():
    post_data = request.get_json()
    title = post_data['title']
    content = post_data['content']
    new_content = modify(content)
    return jsonify({'data': new_content}), 200


def modify(content):
    new_content = ""
    for character in content:
        if character == '.':
            continue
        else:
            new_content += character
    return new_content
