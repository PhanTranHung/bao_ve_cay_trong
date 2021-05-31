
# Required imports
import default_data
import default_data_copy
import os
from flask import Flask, request, jsonify
from firebase_admin import credentials, initialize_app, db
import json

# Initialize Flask app
app = Flask(__name__)

# Initialize Firestore DB
cred = credentials.Certificate(
    'plant-e7169-firebase-adminsdk-vv9mb-c8a6f499fe.json')
default_app = initialize_app(
    cred, {'databaseURL': 'https://plant-e7169-default-rtdb.firebaseio.com'})
# db = firestore.client()
disease_ref = db.reference('Disease')


a = default_data.disease
b = default_data_copy.disease


@app.route('/add', methods=['POST'])
def create():
    """
        create() : Add document to Firestore collection with request body.
        Ensure you pass a custom ID as part of json body in post request,
        e.g. json={'id': '1', 'title': 'Write a blog post'}
    """
    try:
        id = request.json['id']
        disease_ref.document(id).set(request.json)
        return jsonify({"success": True}), 200
    except Exception as e:
        return f"An Error Occured: {e}"


@app.route('/list', methods=['GET'])
def read():
    """
        read() : Fetches documents from Firestore collection as JSON.
        todo : Return document that matches query ID.
        all_todos : Return all documents.
    """
    try:
        # Check if ID was passed to URL query
        todo_id = request.args.get('id')
        if todo_id:
            todo = disease_ref.document(todo_id).get()
            return jsonify(todo.to_dict()), 200
        else:
            # all_todos = [doc.to_dict() for doc in todo_ref.stream()]
            all_disease = disease_ref.get()
            return jsonify(all_disease), 200
    except Exception as e:
        return f"An Error Occured: {e}"


@app.route('/query', methods=['GET'])
def read1():
    try:
        # Check if ID was passed to URL query
        todo_id = request.args.get('id')
        if todo_id:
            todo = todo_ref.document(todo_id).get()
            data = jsonify(todo.to_dict())
        if(data['ID'] == '1'):
            return jsonify(data['name'])
    except Exception as e:
        return f"An Error Occured: {e}"


@app.route('/update', methods=['POST', 'PUT'])
def update():
    """
        update() : Update document in Firestore collection with request body.
        Ensure you pass a custom ID as part of json body in post request,
        e.g. json={'id': '1', 'title': 'Write a blog post today'}
    """
    try:
        id = request.json['id']
        todo_ref.document(id).update(request.json)
        return jsonify({"success": True}), 200
    except Exception as e:
        return f"An Error Occured: {e}"


@app.route('/delete', methods=['GET', 'DELETE'])
def delete():
    """
        delete() : Delete a document from Firestore collection.
    """
    try:
        # Check for ID in URL query
        todo_id = request.args.get('id')
        todo_ref.document(todo_id).delete()
        return jsonify({"success": True}), 200
    except Exception as e:
        return f"An Error Occured: {e}"


port = int(os.environ.get('PORT', 8080))
if __name__ == '__main__':
    app.run(threaded=True, host='127.0.0.1', port=port)
