// React core hooks and webcam/axios imports
import { useState, useRef } from 'react';
import Webcam from 'react-webcam';
import axios from 'axios';
import './App.css';

export default function App() {
  // State variables
  const [selectedImage, setSelectedImage] = useState(null);     // Base64 image (from file or webcam)
  const [prediction, setPrediction] = useState(null);           // Prediction result from backend
  const [showWebcam, setShowWebcam] = useState(false);          // Toggle webcam view
  const [loading, setLoading] = useState(false);                // Loading spinner/disable during API call
  const webcamRef = useRef(null);                               // Reference to the webcam component

  // Handle image file upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);  // Save image as base64 string
        setPrediction(null);                // Reset prediction
      };
      reader.readAsDataURL(file);
    }
  };

  // Capture a frame from the webcam
  const captureWebcam = () => {
    const imageSrc = webcamRef.current.getScreenshot();   // Get base64 image
    setSelectedImage(imageSrc);
    setPrediction(null);
    setShowWebcam(false);  // Hide webcam after capture
  };

  // Send image to Flask backend for classification
  const handleClassify = async () => {
    if (!selectedImage) return;

    setLoading(true);       // Show "Classifying..." button
    setPrediction(null);    // Clear previous result

    try {
      // Convert base64 to Blob
      const blob = await (await fetch(selectedImage)).blob();

      // Create FormData to send via POST
      const formData = new FormData();
      formData.append("image", blob, "captured.jpg");

      // POST to Flask backend
      const res = await axios.post("http://127.0.0.1:5000/predict", formData);

      // Save the prediction result
      setPrediction(res.data);
    } catch (err) {
      console.error("Prediction failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container">
      <h1>♻️ sust<b>AI</b>n</h1>
      <p className="subtitle">Upload or capture an image to classify waste</p>

      <div className="card horizontal-layout">
        {/* LEFT: Webcam or Image Preview */}
        <div className="preview-section">
          {showWebcam ? (
            <div className="webcam-container">
              <Webcam
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                className="video-preview"
              />
              <button className="webcam-button" onClick={captureWebcam}>
                Capture Photo
              </button>
            </div>
          ) : selectedImage ? (
            <div className="image-preview">
              <img src={selectedImage} alt="Selected waste" />
            </div>
          ) : (
            <div className="image-preview">
              <p>No image selected</p>
            </div>
          )}
        </div>

        {/* RIGHT: Controls and Prediction */}
        <div className="controls-section">
          <div className="input-controls">
            {/* Upload image from file */}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="file-input"
            />

            {/* Toggle webcam */}
            <button 
              className={`webcam-button ${showWebcam ? 'active' : ''}`}
              onClick={() => setShowWebcam(prev => !prev)}
            >
              {showWebcam ? 'Close Camera' : 'Open Camera'}
            </button>
          </div>

          {/* Only show classification button if image is selected */}
          {selectedImage && (
            <>
              <button 
                className="webcam-button"
                onClick={handleClassify}
                disabled={loading}
              >
                {loading ? "Classifying..." : "Classify Waste"}
              </button>

              {/* Display the prediction result */}
              {prediction && (
                <div className="predictions">
                  <div className="result-box">
                    <span className="emoji">🧪</span>
                    <p><strong>Class:</strong> {prediction.class}</p>
                    <p><strong>Confidence:</strong> {(prediction.confidence * 100).toFixed(2)}%</p>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </main>
  );
}
