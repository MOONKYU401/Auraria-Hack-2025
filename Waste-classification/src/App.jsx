import { useState, useRef } from 'react';
import Webcam from 'react-webcam';
import axios from 'axios';
import './App.css';

export default function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [showWebcam, setShowWebcam] = useState(false);
  const [loading, setLoading] = useState(false);
  const webcamRef = useRef(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
        setPrediction(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const captureWebcam = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setSelectedImage(imageSrc);
    setPrediction(null);
    setShowWebcam(false);
  };

  const handleClassify = async () => {
    if (!selectedImage) return;

    setLoading(true);
    setPrediction(null);

    try {
      const blob = await (await fetch(selectedImage)).blob();
      const formData = new FormData();
      formData.append("image", blob, "captured.jpg");

      const res = await axios.post("http://127.0.0.1:5000/predict", formData);
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
        {/* Preview Section */}
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

        {/* Controls + Results Section */}
        <div className="controls-section">
          <div className="input-controls">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="file-input"
            />

            <button 
              className={`webcam-button ${showWebcam ? 'active' : ''}`}
              onClick={() => setShowWebcam(prev => !prev)}
            >
              {showWebcam ? 'Close Camera' : 'Open Camera'}
            </button>
          </div>

          {selectedImage && (
            <>
              <button 
                className="webcam-button"
                onClick={handleClassify}
                disabled={loading}
              >
                {loading ? "Classifying..." : "Classify Waste"}
              </button>

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
