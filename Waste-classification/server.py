from flask import Flask, request, jsonify
from flask_cors import CORS
from tensorflow.keras.models import load_model
from PIL import Image, ImageOps
import numpy as np
import os

app = Flask(__name__)
CORS(app)

model = load_model("keras_Model.h5", compile=False)
class_names = open("labels.txt", "r").readlines()

@app.route('/predict', methods=['POST'])
def predict():
    file = request.files['image']
    image = Image.open(file.stream).convert("RGB")
    
    size = (224, 224)
    image = ImageOps.fit(image, size, Image.Resampling.LANCZOS)

    data = np.ndarray(shape=(1, 224, 224, 3), dtype=np.float32)
    image_array = np.asarray(image).astype(np.float32)
    normalized_image_array = (image_array / 127.5) - 1
    data[0] = normalized_image_array

    prediction = model.predict(data)
    index = np.argmax(prediction)
    class_name = class_names[index].strip()
    confidence = float(prediction[0][index])

    return jsonify({
        'class': class_name,
        'confidence': confidence
    })

if __name__ == '__main__':
    app.run(debug=True)
