# Traffic Sign Detector

Image-based mobile application for detecting traffic signs from a selected or captured photo using a Python YOLO backend.

## Overview

Traffic Sign Detector is a mobile application that allows users to take a photo or choose an image from the gallery, send the image to a Python backend, analyze it with YOLO, and display detected traffic signs with bounding boxes, confidence scores, and sign meanings.

## Project Goal

The goal of this project is to build a mobile application that can:

- capture a new image or select an existing image
- send the image to a backend service
- detect traffic signs with YOLO
- display detection results on the image
- show traffic sign information
- save previous detections in a local history

## Tech Stack

- React Native
- Expo
- Python
- YOLO
- FastAPI or Flask

## Project Structure

```text
traffic-sign-detector
├─ README.md
├─ mobile-app
├─ backend
└─ docs
   ├─ kanban
   └─ wireframes