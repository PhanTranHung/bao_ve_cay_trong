from flask import Flask
from flask import request
from flask import jsonify
import os
import cv2
import numpy as np
from keras.models import load_model

app = Flask(__name__)


ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}


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
            return jsonify({
                'message': 'Success',
                'traffic_id': str(pred[0])
            })
        except:
            return jsonify({
                'message': 'Server error'
            }), 300
    else:
        return jsonify({
            'message': 'File doesn\'t support'
        }), 400


if __name__ == "__main__":

    port = int(os.environ.get('PORT', 8080))

    print(("* Loading Keras model and Flask starting server..."
           "please wait until server has fully started"))
    model()
    app.run(threaded=True, host='0.0.0.0', port=port)
