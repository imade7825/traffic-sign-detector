## Title

Analyze the selected image with the YOLO backend

## Value proposition

As a user
I want the app to analyze my selected image
So that traffic signs can be detected automatically

## Description

![Home Screen Wireframe](../wireframes/image_review_wireframe.png)
- The app sends the selected image to the Python backend
- The backend runs YOLO inference
- The backend returns labels, confidence values and bounding boxes

## Acceptance criteria

- [ ] When the backend returns no detections, the result screen shows an empty state
- [ ] Tapping "Analyze Image" starts the upload and analysis process
- [ ] A loading indicator is shown while the request is running
- [ ] The backend response is parsed successfully
- [ ] Alert text for failed analysis: "Image analysis failed. Please try again."

## Tasks

- [ ] Create the DetectionService in the mobile app
- [ ] Implement image upload as multipart form-data
- [ ] Create the Python backend detect endpoint
- [ ] Load the YOLO model in the backend
- [ ] Run inference on the uploaded image
- [ ] Convert YOLO output into app-friendly JSON
- [ ] Return label, confidence and bounding box values
- [ ] Parse the backend response in React Native
- [ ] Add loading state handling
- [ ] Add error alert handling