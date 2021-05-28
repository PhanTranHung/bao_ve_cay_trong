from flask import Flask
from flask import request
from flask import jsonify
import os
import cv2
from flask.helpers import url_for
import numpy as np
from PIL import Image
import io
import imutils
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
from werkzeug.utils import redirect, secure_filename

UPLOAD_FOLDER = 'D:\\DACN2\\bao_ve_cay_trong\\back_end\\flask_app\\uploads'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}


app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# def allowed_file(filename):
#     extension = filename.rsplit('.', 1)[1].lower()
#     return '.' in filename and extension in ALLOWED_EXTENSIONS

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def model():
    global model
    model = load_model('model.h5')


@app.route('/', methods=['GET'])
def home():
    return jsonify({
        "name": "He thong bao ve cay trong",
        "api": "[POST] /predict"
    }), 200


# @app.route('/predict', methods=['POST'])
# def predict():
#     if 'img' not in request.files:
#         return jsonify({
#             'message': 'Missing file'
#         }), 100
#     file = request.files['img']
#     if file.filename == '':
#         return jsonify({
#             'message': 'No file selected'
#         }), 200

#     if file and allowed_file(file.filename):
#         try:
#             filestr = file.read()
#             img = np.frombuffer(filestr, np.uint8)
#             img = cv2.imdecode(img, cv2.IMREAD_COLOR)
#             img = cv2.resize(img, (128, 128, 3))
#             # img = cv2.reshape(img, (128, 128, 3))
#             # img = np.expand_dims(img, 0)
#             pred = model.predict(img)
#             pred = np.argmax(np.round(pred), axis=0)
#             return jsonify({
#                 'message': 'Success',
#                 'traffic_id': str(pred[0])
#             })
#         except:
#             return jsonify({
#                 'message': 'Server error'
#             }), 300
#     else:
#         return jsonify({
#             'message': 'File doesn\'t support'
#         }), 400

@app.route('/predict', methods=['POST'])
def predict():
    try:
        print(request)
        if 'img' not in request.files:
            return jsonify({
                "error": True,
                'message': 'Missing file'
            }), 100
        file = request.files['img']
        print(file)
        if file.filename == '':
            return jsonify({
                "error": True,
                'message': 'No file selected'
            }), 200
        if file and allowed_file(file.filename):
            # filename = Image.open(file)
            # filename = secure_filename(file.filename)
            print(filename)
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            return "Upload Successfully" + filename, 200
        # if file and allowed_file(file.filename):
        try:
            # filestr = file.read() 
            img = Image.open(file)

            # img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
            img = img/255.
            img = cv2.reshape(img, (1, 128, 128, 3))
            img = image.img_to_array(img)
            img = np.expand_dims(img, 0)
            pred = model.predict(img)
            pred = np.argmax(np.round(pred), axis=0)
            return jsonify({
                'filename': str(file.filename),
                'message': 'Success',
                'name': str(pred),
            })
        except Exception as e:
            print (e)
            return jsonify({
                'message': 'Server error'
            }), 300
            # return jsonify({"success": True,  "name": request.form['disease']}), 200

    except Exception as e:
        print(e)
        return f"An Error Occured: {e}"


if __name__ == "__main__":

    # port = int(os.environ.get('PORT', 8080))

    print(("* Loading Keras model and Flask starting server..."
           "please wait until server has fully started"))
    model()
    app.run(threaded=True, host='0.0.0.0', port=8080)
