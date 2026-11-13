# CampusPilot – Student Productivity & Placement Tracker

CampusPilot is a React Native + TypeScript application for managing daily tasks and tracking job applications. It is a working CRUD application, not a static UI prototype.

## Features
- Dashboard with task, completion, application and interview counts.
- Create, complete, filter and delete tasks.
- Set task due dates and Low / Medium / High priority.
- Add job applications and update their status (Applied, Interview, Offer, Rejected).
- Delete applications with confirmation.
- Local persistence using AsyncStorage; data remains after app restart.
- Loading state, storage error feedback, empty states and input validation.
- Responsive layouts using flexible React Native styles.

## Tech decisions
- **React Native + TypeScript:** type-safe cross-platform UI.
- **Context API:** one shared data source for tasks and applications.
- **AsyncStorage:** persistence without requiring a backend account for this assignment.
- **Custom hooks and reusable components:** separate state access and UI building blocks.
- **React Navigation bottom tabs:** clear navigation between dashboard, tasks, applications and profile.

## Setup
1. Install Node.js LTS and Expo Go (or Android Studio).
2. Extract the project.
3. Run:
   ```bash
   npm install
   npx expo install --fix
   npx expo start
   ```
4. Scan the QR code with Expo Go, or press `a` to launch an Android emulator.

## Project structure
```text
CampusPilot/
├── App.tsx
├── app.json
├── package.json
├── tsconfig.json
└── src/
    ├── components/
    ├── constants/
    ├── context/
    ├── hooks/
    ├── navigation/
    ├── screens/
    │   ├── Applications/
    │   ├── Home/
    │   ├── Profile/
    │   └── Tasks/
    ├── types/
    └── utils/
```

## Data and limitations
The app currently stores information on the device only. It does not provide cloud sync, multi-device access, authentication, push notifications or a real job-board integration. Those would be useful next steps if a backend were included.

## Suggested assignment submission notes
- Time spent: record your actual implementation and testing time; do not claim a time you did not spend.
- Challenges: local persistence, keeping task and application state synchronized across tabs, validation, and handling empty/loading/error states.
- Improvements: add authentication and a REST API, cloud backup, search and sorting, notifications for due dates/interviews, automated tests, and accessibility review.
- AI disclosure: disclose any AI assistance actually used and describe what you personally reviewed, tested and changed. Do not claim unaided work if AI tools were used.

## Before submitting
- Run `npm run typecheck`.
- Test add / complete / delete task.
- Test add / status update / delete application.
- Restart the app and verify data persists.
- Capture screenshots from a real emulator or device.
- Push the finished code to your own GitHub repository and include your actual demo link.
