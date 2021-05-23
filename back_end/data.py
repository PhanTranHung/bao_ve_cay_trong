import os
import cv2
# import pickle
import numpy as np
from imutils import paths
from tensorflow.keras.utils import to_categorical
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from sklearn.preprocessing import LabelEncoder
from sklearn import preprocessing
import tensorflow as tf
import PIL
import matplotlib.pyplot as plt
from sklearn.metrics import accuracy_score
import models


dataset = r'data'

def pretrain(img):
    image = cv2.resize(img, (128,128))
    image = np.reshape(image, (128,128, 3))
    return image

print("[INFO] loading images...")
x_train = []
y_train = []
x_test = []
y_test = []
imagePaths = list(paths.list_images(dataset))
classes =  0
lb = LabelEncoder()

for _, dirnames, _ in os.walk(dataset):
    classes += len(dirnames)

total = 0
dem = 0
for (i, imagePath) in enumerate(imagePaths):
    print("[INFO] processing image {}/{}".format(i + 1,len(imagePaths)))
    image = cv2.imread(imagePath)
    image = pretrain(image)
    label = imagePath.split(os.path.sep)[-2]
    if(dem < 4):
        x_train.append(image)
        y_train.append(label)
    else:
        x_test.append(image)
        y_test.append(label)
        dem = 0
    dem += 1
    total += 1
print("\n[INFO] serializing {} encodings...".format(total))
# x_train = preprocessing.StandardScaler().fit(np.array(x_train, dtype='float') / 255.0)
x_train = np.array(x_train)/255.
x_test = np.array(x_test)/255.
y_train = to_categorical(np.array(lb.fit_transform(y_train)))
y_test = to_categorical(np.array(lb.fit_transform(y_test)))

# a = lb.inverse_transform(datase(labels[2]))
print(lb.classes_)
print(x_train)
print(y_train)
print(x_test)
print(y_test)
print("\n[INFO] done...")


epochs = 15

model = models.Keras_cnn(n_classes=classes, EPOCHS=epochs)
model.summary()

aug = ImageDataGenerator(
    rotation_range=30, width_shift_range=0.15,
    height_shift_range=0.15, shear_range=0.15, 
    zoom_range=0.2,horizontal_flip=True, 
    fill_mode="nearest")

history = model.fit_generator(aug.flow(x_train, y_train, batch_size = 32), epochs = epochs, validation_data = (x_test, y_test))

test_loss, test_acc = model.evaluate(x = x_test, y= y_test, batch_size=32, verbose=1)
# print(test_acc)

acc = history.history['accuracy']
val_acc = history.history['val_accuracy']
loss = history.history['loss']
val_loss = history.history['val_loss']

model.save("model.h5")

epochs_range = range(epochs)

plt.figure(figsize=(8, 8))
plt.subplot(1, 2, 1)
plt.plot(epochs_range, acc, label='Training Accuracy')
plt.plot(epochs_range, val_acc, label='Validation Accuracy')
plt.legend(loc='lower right')
plt.title('Training and Validation Accuracy')

plt.subplot(1, 2, 2)
plt.plot(epochs_range, loss, label='Training Loss')
plt.plot(epochs_range, val_loss, label='Validation Loss')
plt.legend(loc='upper right')
plt.title('Training and Validation Loss')
plt.show()