## Smart Productivity Tracker with AI Suggestions
A Smart productivity tracker system built with Crystal backend using libraries like Kemal for lightweight web servers and React frontend, featuring AI-powered suggestions, task management, time tracking, link management and binaurial beats .

## Key Features
- **Dashboard Overview**: Your control center! Access Calendar, Tasks, Pomodoro timer, link management, AI suggestions, and settings all in one place.
- **Task Management**: Easily add, edit, delete, and mark tasks as completed. Stay organized with real-time updates on your dashboard.
- **Calendar**: View the current date and upcoming deadlines integrated with your tasks for better planning.
- **AI Integration**: Get productivity tips, daily plans, and suggestions tailored to enhance your workflow.
- **My Inventory**: Store and organize your favorite links without cluttering your browser bookmarks.
- **Pomodoro Timer** : Boost focus with a built-in timer for 25 minutes of work followed by a 5-minute break. Track your progress easily!
- **Music Categories** : Choose from Relax, Focus, Energize, Sleep, and Meditate playlists to enhance your work sessions.
- **Motivational Quotes** : Stay inspired with AI-generated quotes to keep you focused on your tasks.

## Why Choose Smart Productivity tracker with AI suggestion?
The Smart Productivity Tracker with AI-Powered Suggestions is designed to help users optimize their work habits by monitoring tasks, time, and focus sessions. The AI delivers personalized insights, such as recommending break times and task prioritization based on individual productivity patterns. This tool enhances productivity, improves work-life balance, and provides a customizable and adaptive experience, making it more effective than standard task managers.

## Prerequisite
- Gemini Api Key - You have to input your gemini key in task_controller.cr file of the productivity_tracker directory.
- Crystal installed in your System
- Npm and node installed in your system

## Installation Instructions
To use Productivity Hub locally, follow these steps:

### Clone the Repository
First, clone the repository from GitHub:
```bash
git clone https://github.com/sridurgeshv/productivity-tool.git
```

## Frontend Setup
1. Navigate to the frontend directory in your terminal.
```bash
cd productivity-tracker-frontend
```

2. Install the required node modules:
```bash
npm install
```

3. Start the frontend application:
```bash
npm run dev
```

## Backend Setup
1. Install crystal from [Here](https://crystal-lang.org/install) according to your local machine.
2. Navigate to the backend directory in another terminal.
```bash
cd productivity_tracker
```
3. Install the required Shards:
```bash
shards install
```
4. Start the backend server:
```bash
crystal src/productivity_tracker.cr
```
Note: If you did any change in database file and want a new database simply run this command in backend directory
```bash
crystal src/database/init_db.cr
```

### View the Application
Once both the frontend and backend are running, you can view the Smart Productivity tracker in your browser by navigating to http://localhost:5173.

### Video Demo
To see Smart Productivity tracker in action, check out our [video demonstration](https://youtu.be/UR1qmHQp-lw). The video provides an overview of the app's features and shows how to navigate and use the tool effectively.

### Discord Handles
  
 - @ritika12
  
 - @sunnyunam 

