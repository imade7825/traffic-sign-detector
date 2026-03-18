## Title

View saved detection history

## Value proposition

As a user
I want to view my saved detection history
So that I can review earlier traffic sign analyses

## Description

![History Wireframe](../wireframes/history_wireframe.png)

- The user taps the "History" button
- The history screen opens
- Previously saved detections are displayed in a list

## Acceptance criteria

- [ ] Tapping "History" opens the history screen
- [ ] Saved history entries are displayed in a list
- [ ] Each history entry shows image preview, label, confidence and timestamp
- [ ] History entries are sorted by newest first
- [ ] Empty state text: "No detections yet."

## Tasks

- [ ] Add the History button on HomeScreen
- [ ] Connect navigation to HistoryScreen
- [ ] Load saved entries from the HistoryService
- [ ] Render the entries in a list
- [ ] Create a HistoryListItem component
- [ ] Format and display the timestamp
- [ ] Add empty-state UI for no saved results