# Traffic Sign Detector

Image-based mobile application for detecting traffic signs from a selected or captured photo using a Python YOLO backend.

## Overview

Traffic Sign Detector is a mobile application that allows users to take a photo or choose an image from the gallery, send the image to a Python backend, analyze it with YOLO, and display detected traffic signs with bounding boxes, confidence scores, and sign meanings.

This project is designed as a practical computer vision application with a clear mobile workflow and a simple backend architecture.

## Project Goal

The goal of this project is to build a mobile application that can:

- capture a new image or select an existing image
- send the image to a backend service
- detect traffic signs with YOLO
- display detection results on the image
- show traffic sign information
- save previous detections in a local history

## Main Features

- Take a photo with the device camera
- Pick an image from the gallery
- Preview the selected image before analysis
- Analyze the image with a Python YOLO backend
- Show bounding boxes on detected traffic signs
- Display sign label, confidence, and meaning
- Save detection results locally
- View previous detections in a history screen

## Tech Stack

### Mobile App

- React Native
- Expo
- React Navigation
- AsyncStorage

### Backend

- Python
- FastAPI or Flask
- YOLO
- Ultralytics

## Project Structure

```text
traffic-sign-detector
├─ README.md
├─ mobile-app
├─ backend
└─ docs
   ├─ kanban
   └─ wireframes