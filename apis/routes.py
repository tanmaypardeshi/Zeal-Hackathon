from flask import jsonify, request
from apis import app
from flask_cors import cross_origin


@app.route("/summarise", methods=['POST'])
@cross_origin()
def summarise():
    post_data = request.get_json()
    title = post_data['title']
    content = post_data['content']
    new_content = modify1(content)
    return jsonify({'data': new_content}), 200


@app.route("/irquery", methods=['POST'])
@cross_origin()
def info_retrieval():
    post_data = request.get_json()
    query = post_data['query']
    filtertype = post_data['filter']
    if filtertype == 'Name':
        new_content = modify2(query)
        return jsonify({'data': new_content}), 200
    else:
        new_content = modify3(query)
        return jsonify({'data': new_content}), 200


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
