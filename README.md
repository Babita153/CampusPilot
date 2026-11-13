# CampusPilot – Student Productivity & Placement Tracker

CampusPilot is a React Native mobile application that helps students manage daily tasks, monitor productivity, and track job applications in one place.

## Features

- **Dashboard:** View task statistics, completion progress, pending work, and recent applications.
- **Task Management:** Create, complete, delete, and filter tasks by status and priority.
- **Job Tracking:** Add applications and update statuses (Applied, Interview, Offer, Rejected).
- **Profile:** View workspace statistics and manage local application data.
- **Data Persistence:** Save tasks and applications using AsyncStorage.

## Tech Stack

- React Native
- Expo
- TypeScript
- React Navigation
- Context API
- AsyncStorage
- Expo Vector Icons

## Project Structure

```text
CampusPilot/
├── src/
│   ├── components/
│   ├── constants/
│   ├── context/
│   ├── hooks/
│   ├── navigation/
│   ├── screens/
│   ├── types/
│   └── utils/
├── App.tsx
├── app.json
├── package.json
└── README.md
```

## Installation

```bash
git clone https://github.com/Babita153/CampusPilot.git
cd CampusPilot
npm install
npx expo start
```

Scan the QR code using Expo Go to run the application.

## Screenshots

Add application screenshots inside the `screenshots/` folder.

- Home Dashboard
- Task Management
- Add Task
- Job Applications
- Profile & Settings

## Technical Decisions

- Context API provides shared state across screens.
- AsyncStorage maintains data locally between app restarts.
- Reusable components improve code maintainability.
- TypeScript provides type safety.
- React Navigation provides bottom tab navigation.

## Challenges Faced

- Managing shared state across screens.
- Implementing local data persistence.
- Updating dashboard statistics dynamically.
- Handling task filters and application statuses.
- Improving responsive layouts and form validation.

## Limitations

- No backend or cloud synchronisation.
- No user authentication.
- No automated reminders.
- Automated testing is not yet implemented.

## Future Improvements

- Backend integration with Node.js and MongoDB.
- User authentication.
- Cloud data synchronisation.
- Notifications and deadline reminders.
- Automated testing and analytics.

## Development Time

**Total time:** [Enter actual hours spent]

## AI Disclosure

ChatGPT was used for implementation guidance, debugging assistance, UI improvements, and documentation. External libraries are listed in `package.json`.

## Testing

Manual testing was performed for task creation, completion, deletion, filtering, application tracking, status updates, and local data persistence.

## Submission

- **Project:** CampusPilot
- **Repository:** https://github.com/Babita153/CampusPilot
- **Live Demo:** Not hosted; screenshots provided as a visual demonstration.

## Conclusion

CampusPilot provides students with a simple workspace to organise daily activities and manage their placement journey. This project helped strengthen my practical understanding of React Native, TypeScript, state management, navigation, and local storage.
