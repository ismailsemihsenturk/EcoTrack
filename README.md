# EcoTracker

EcoTracker is a mobile application that helps you track your environmental footprint. By reviewing your daily habits, the app aids in reducing your carbon footprint.

## Features

- **Carbon Footprint Calculation**: Track your carbon footprint by logging daily activities.
- **Eco-Friendly Tips**: Receive tips and suggestions to help you adopt more sustainable habits.
- **Daily Tracking**: Monitor your progress on a daily, weekly, and monthly basis.
- **Notifications**: Get reminders to maintain a more sustainable lifestyle.

## Requirements

- Node.js >= 20.x
- Expo CLI >= 5.x
- iOS Simulator or Android Emulator for testing)

## Installation

Follow these steps to set up the project locally.

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/ismailsemihsenturk/ecotracker.git
   cd ecotracker

2. **Install Dependencies and Start the Expo Development Server:**
    npm install
    npx expo start

3. **Run the App on Your Device:**
    * npm install
    * iOS: Use the Expo Go app or an iOS Simulator.
    * Android: Use the Expo Go app or an Android Emulator.
    * After running npx expo start, you can scan the QR code with your device to view the app in Expo Go.


## Project Structure
 
- ├── src
- │   ├── assets          # Images, fonts, etc.
- │   ├── components      # App components
- │   ├── features        # Redux slice
- │   ├── navigation      # App Router
- │   ├── screens         # Different screens
- │   ├── services        # API
- │   ├── store           # Redux store
- │   ├── styles          # Themes
- 
- │   └── utils           # Helper functions, hooks etc.
- |    └── App.tsx  
- |    └── _layout.tsx  
- ├── index.js            # Main
- └── package.json        # Dependencies


