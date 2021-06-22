from flask import Flask
from flask import request
from flask import jsonify
import os
import cv2
import numpy as np
from tensorflow.keras.models import load_model
from firebase_admin import credentials, initialize_app, db

app = Flask(__name__)
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}

# Initialize Firestore DB
cred = credentials.Certificate(
    'plant-e7169-firebase-adminsdk-vv9mb-c8a6f499fe.json')
default_app = initialize_app(
    cred, {'databaseURL': 'https://plant-e7169-default-rtdb.firebaseio.com'})
# db = firestore.client()
disease_ref = db.reference('disease')


def allowed_file(filename):
    extension = filename.rsplit('.', 1)[1].lower()
    return '.' in filename and extension in ALLOWED_EXTENSIONS


def model():
    global model
    model = load_model('model.h5')


@app.route('/', methods=['GET'])
def home():
    return jsonify({
        "name": "He thong bao ve cay trong",
        "api": "[POST] /predict"
    }), 200


@app.route('/predict', methods=['POST'])
def predict():
    print("predict.....................")
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
            img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
            img = cv2.resize(img, (256, 256))
            img = np.reshape(img, (256, 256, 3))
            img = img /255.
            pred = model.predict(np.asarray([img]))[0]
            todo_id = np.argmax(np.round(pred), axis=0)
            if todo_id:
                todo = db.reference('disease').order_by_key().equal_to(str(todo_id)).get()
                print(todo)
                disease = todo[str(todo_id)]
                return jsonify({
                    'message': 'Success',
                    'data': disease
                }), 200
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

@app.route('/id1', methods=['GET', 'POST'])
def readid():
    try:
        # Check if ID was passed to URL query
        todo_id = 1
        if todo_id == 1:
            todo = disease_ref.document(todo_id).get()
            print(todo.to_dict())
            return jsonify(todo.to_dict()), 200
    except Exception as e:
        return f"An Error Occured: {e}"


if __name__ == "__main__":

    port = int(os.environ.get('PORT', 8080))

    print(("* Loading Keras model and Flask starting server..."
           "please wait until server has fully started"))
    model()
    app.run(threaded=True, host='0.0.0.0', port=8080)
