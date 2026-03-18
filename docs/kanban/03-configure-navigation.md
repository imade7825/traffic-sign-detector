## Title

Configure navigation between app screens

## Value proposition

As a user
I want to navigate between the app screens
So that I can complete the traffic sign detection flow smoothly

## Description

- The app starts on the HomeScreen
- Navigation is configured for HomeScreen, ImageReviewScreen, DetectionResultScreen and HistoryScreen
- Required parameters can be passed between screens

## Acceptance criteria

- [ ] The app opens on the HomeScreen
- [ ] Navigation between HomeScreen and ImageReviewScreen works
- [ ] Navigation between ImageReviewScreen and DetectionResultScreen works
- [ ] Navigation between HomeScreen and HistoryScreen works
- [ ] Required navigation parameters can be passed without app crashes

## Tasks

- [ ] Install the navigation dependencies
- [ ] Create the root navigator
- [ ] Register HomeScreen
- [ ] Register ImageReviewScreen
- [ ] Register DetectionResultScreen
- [ ] Register HistoryScreen
- [ ] Define navigation parameter types
- [ ] Verify screen-to-screen navigation works correctly