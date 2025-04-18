# sustAI-n  
**Smart Waste Classification using AI**  
**Team 3J1P | ML Recycling Hackathon Project**

---

## Problem

Recycling and composting in the U.S. is confusing, especially in Colorado where the statewide recycling and composting rate is only **15.5%**. Due to lack of consistent education, access, and infrastructure:

- People are unsure what goes where  
- Contamination ruins recyclable batches  
- Landfills receive unnecessary waste  
- Cities miss out on environmental and financial benefits

---

## Our Solution: sustAI-n

`sustAI-n` is a smart, interactive web app that allows users to:

- Upload or capture an image of their waste  
- Use an AI model to classify the image as **Recyclable**, **Compost**, or **Landfill**  
- Display the confidence level of the prediction  

This lightweight tool helps individuals make more sustainable choices — instantly.

---

## Model Overview

- Built with **Teachable Machine**  
- Exported to **Keras** (`.h5`) for local inference  
- Classes trained:  
  - Recyclable  
  - Compost  
  - Landfill  
- Deployed using **TensorFlow**, **Flask**, and **React**

---

## Features

- Webcam + image upload support  
- Real-time waste classification  
- Confidence score display  
- Fully local — no external API needed  
- Built with Vite for fast frontend performance

---

## ⚙️ Tech Stack

| Tool / Library         | Purpose                            |
|------------------------|------------------------------------|
| React + Vite           | Frontend UI                        |
| Flask + Flask-CORS     | Python backend API                 |
| TensorFlow + Keras     | AI model inference                 |
| Teachable Machine      | Image classification model         |
| PIL + NumPy            | Image processing                   |
| Axios                  | HTTP request handling (React)      |

---

## Folder Structure

```
Waste-classification/
├── public/              # Static assets
├── src/                 # React components
│   └── App.jsx          # Main component logic
├── keras_Model.h5       # Trained image classification model
├── labels.txt           # Class labels (one per line)
├── server.py            # Flask backend server
└── README.md            # Project documentation
```

---

## How to Run It Locally

### Step 1: Clone the Repository

```bash
git clone https://github.com/your-team/sustain-recycling.git
cd Waste-classification
```

### Step 2: Start the Flask Backend

```bash
cd ..
.\myenv\Scripts\activate            # Activate Python virtual env (Windows)
pip install flask flask-cors pillow numpy tensorflow
python Waste-classification/server.py
```

> **Make sure** `keras_Model.h5` and `labels.txt` are in the same directory as `server.py`.

### Step 3: Start the React Frontend

```bash
cd Waste-classification
npm install
npm run dev
```

### Step 4: Open in Browser

```
http://localhost:5173
```

---

## System Architecture

```
[React Frontend] --> [Flask Backend API] --> [Teachable Machine Model (.h5)]
      ↑                        ↓
  Webcam/File UI         Image Processing + Inference
```

---

## Use Case Examples

- Classroom recycling education  
- Public kiosks or smart bin installations  
- Sorting lines in facilities  
- Mobile or embedded integration (AR glasses, apps)

---
## 🧽 Model Performance

### Accuracy Per Class

| Class                  | Accuracy | # Samples |
|------------------------|----------|-----------|
| Aluminum soda cans     | 0.95     | 38        |
| Cardboard boxes        | 0.89     | 38        |
| Disposable paper       | 0.92     | 38        |
| Plastic shopping bags  | 1.00     | 38        |
| Plastic straws         | 0.84     | 38        |
| Eggshells (Compost)    | 0.97     | 38        |
| Food waste (Compost)   | 0.89     | 38        |
| Tea bags (Compost)     | 0.79     | 38        |
| Glass beverage bottles | 0.95     | 38        |


### Confusion Matrix

![Screenshot 2025-04-17 205133](https://github.com/user-attachments/assets/9d580f5e-78cc-4a9f-9eef-575650d288f2)


## Vision

> "Our goal is to empower communities to make zero-waste living effortless, educational, and economically viable."

---

## Team 3J1P

- Joseph Milliken
- Jayden Kyungju Moon
- Jacob Lord
- Paul Kim

---

## References

- [CoPIRG Recycling Report](https://pirg.org/colorado/resources/recycling-a-missed-opportunity-to-make-denver-more-sustainable/)
- [Eco-Cycle Report 2023](https://ecocycle.org/)
- [EPA Recycling Basics](https://www.epa.gov/recycle)
- [City of Denver Recycling](https://www.denvergov.org/Government/Departments/Denver-Recycles)
- [Recyclable and Household Waste Classification](https://www.kaggle.com/datasets/alistairking/recyclable-and-household-waste-classification)
---


