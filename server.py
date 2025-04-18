# Import required libraries
from flask import Flask, request, jsonify       # For handling API requests/responses
from flask_cors import CORS                     # To allow frontend (React) to communicate with backend
from tensorflow.keras.models import load_model  # To load the trained Keras model
from PIL import Image, ImageOps                 # For image processing
import numpy as np                              # For handling image arrays
import os

# Initialize the Flask app
app = Flask(__name__)
CORS(app)  # Enable Cross-Origin Resource Sharing for React → Flask requests

# Load the trained Keras model
model = load_model("keras_Model.h5", compile=False)

# Load the class labels (e.g., Recyclable, Compost, Landfill, etc.)
class_names = open("labels.txt", "r").readlines()

# Define prediction endpoint
@app.route('/predict', methods=['POST'])
def predict():
    # Get the uploaded image file from the POST request
    file = request.files['image']

    # Open the image and convert to RGB
    image = Image.open(file.stream).convert("RGB")

    # Resize and crop the image to fit model's input shape (224x224)
    size = (224, 224)
    image = ImageOps.fit(image, size, Image.Resampling.LANCZOS)

    # Prepare the image data in the shape (1, 224, 224, 3) for model input
    data = np.ndarray(shape=(1, 224, 224, 3), dtype=np.float32)

    # Convert image to numpy array and normalize to [-1, 1] as expected by the model
    image_array = np.asarray(image).astype(np.float32)
    normalized_image_array = (image_array / 127.5) - 1
    data[0] = normalized_image_array

    # Perform prediction
    prediction = model.predict(data)

    # Get the index of the class with highest confidence
    index = np.argmax(prediction)

    # Get the class name and confidence score
    class_name = class_names[index].strip()
    confidence = float(prediction[0][index])

    # Return the result as JSON
    return jsonify({
        'class': class_name,
        'confidence': confidence
    })

# Run the app when the file is executed directly
if __name__ == '__main__':
    app.run(debug=True)  # Starts Flask server on http://127.0.0.1:5000
