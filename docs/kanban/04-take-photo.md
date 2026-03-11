## Title

Take a photo for traffic sign detection

## Value proposition

As a user
I want to take a photo
So that I can analyze traffic signs in the image

## Description

![Home Screen Wireframe](../wireframes/home_screen_wireframe.png)
- User taps the "Take Photo" button
- The camera opens
- The captured image is passed to the image review screen

## Acceptance criteria

- [ ] When camera permission is denied, a clear alert is shown
- [ ] Tapping "Take Photo" opens the camera
- [ ] The user can capture exactly one image
- [ ] After capturing an image, the app navigates to the image review screen
- [ ] Alert text for denied permission: "Camera access is required to take a photo."

## Tasks

- [ ] Install the image input dependency
- [ ] Add camera permission configuration for Android
- [ ] Create the Take Photo button on HomeScreen
- [ ] Implement camera launch logic
- [ ] Store the captured image URI
- [ ] Navigate to ImageReviewScreen with the image URI
- [ ] Add alert handling for denied permission