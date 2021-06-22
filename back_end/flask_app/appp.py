
# Required imports
# import default_data
# import default_data_copy
import os
from flask import Flask, request, jsonify
from firebase_admin import credentials, initialize_app, db
import json
import cv2
import numpy as np
from tensorflow.keras.models import load_model

# Initialize Flask app
app = Flask(__name__)
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}

def allowed_file(filename):
    extension = filename.rsplit('.', 1)[1].lower()
    return '.' in filename and extension in ALLOWED_EXTENSIONS


def model():
    global model
    model = load_model('model.h5')

# Initialize Firestore DB
cred = credentials.Certificate(
    'plant-e7169-firebase-adminsdk-vv9mb-c8a6f499fe.json')
default_app = initialize_app(
    cred, {'databaseURL': 'https://plant-e7169-default-rtdb.firebaseio.com'})
# db = firestore.client()
disease_ref = db.reference('disease')

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


@app.route('/list', methods=['GET', 'POST'])
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
        todo_id = '2'
        if todo_id:
            todo = db.reference('disease').order_by_key().equal_to(str(todo_id)).get()
            print(todo)
            return jsonify(todo), 200
    except Exception as e:
        return f"An Error Occured: {e}"

@app.route('/id1', methods=['GET', 'POST'])
def readid():
    try:
        # Check if ID was passed to URL query
        todo_id = request.args.get('id')
        if todo_id:
            todo = disease_ref.document(todo_id).equal_to(1).get()
            return jsonify(todo.to_dict()), 200
        else:
            all_todos = [doc.to_dict() for doc in disease_ref.stream()]
            all_disease = disease_ref.equal_to(1).get()
            return jsonify(all_disease), 200
    except Exception as e:
        return f"An Error Occured: {e}"

@app.route('/predict', methods=['POST'])
def predict():
    if 'img' not in request.files:
        return jsonify({
            'message': 'Missing file'
        }), 100
    file = request.files['img']
    if file.filename == '':
        return jsonify({
            'message': 'No file selected'
        }), 200

    if file and allowed_file(file.filename):
        try:
            filestr = file.read()
            img = np.frombuffer(filestr, np.uint8)
            img = cv2.imdecode(img, cv2.IMREAD_COLOR)
            img = cv2.resize(img, (128, 128, 3))
            # img = cv2.reshape(img, (128, 128, 3))
            # img = np.expand_dims(img, 0)
            pred = model.predict(img)
            pred = np.argmax(np.round(pred), axis=0)
            id = str(pred)
            print(pred)
            print(id)
            if id:
                todo = disease_ref.document(id).get()
            return jsonify(todo.to_dict()), 200
            # return jsonify({
            #     'message': 'Success',
            #     'traffic_id': str(pred[0])
            # })
        except:
            return jsonify({
                'message': 'Server error'
            }), 300
    else:
        return jsonify({
            'message': 'File doesn\'t support'
        }), 400


@app.route('/update', methods=['POST', 'PUT'])
def update():
    """
        update() : Update document in Firestore collection with request body.
        Ensure you pass a custom ID as part of json body in post request,
        e.g. json={'id': '1', 'title': 'Write a blog post today'}
    """
    try:
        id = request.json['id']
        disease_ref.document(id).update(request.json)
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
        disease_ref.document(todo_id).delete()
        return jsonify({"success": True}), 200
    except Exception as e:
        return f"An Error Occured: {e}"


port = int(os.environ.get('PORT', 8080))
if __name__ == '__main__':
    app.run(threaded=True, host='0.0.0.0', port=port)
