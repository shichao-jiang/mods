import os
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3' 
import pandas as pd
import numpy as np
from tensorflow.keras.models import load_model
from PIL import Image
import matplotlib.pyplot 
from serial import Serial, PARITY_EVEN
import time

class_names = ['No Mask','Correct', 'Empty']

filepath = './mask_model'
loaded_model = load_model(filepath)

def opendoor():
    print("sent")
    ardu= Serial('COM3',19200, parity=PARITY_EVEN)
    time.sleep(2)
    ardu.write(b's')

    #ardu.close()

def predict(filename):
    img_data = Image.open(filename).resize((128, 128))
    img_arr = np.array(img_data)
    img_arr = img_arr[:, :, :3] / 255
    print(img_arr.shape)

    test_image = img_arr.reshape(1, 128, 128, 3)
    print(test_image.shape)

    predictions = loaded_model.predict(test_image)
    prediction = np.argmax(predictions[0])
    print(f'Prediction: {class_names[int(prediction)]}')

    if class_names[int(prediction)] == 'Correct':
        opendoor()

    return class_names[int(prediction)]