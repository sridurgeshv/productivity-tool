## Smart Productivity Tracker with AI Suggestions
A Smart productivity tracker system built with Crystal backend using libraries like Kemal for lightweight web servers and React frontend, featuring AI-powered suggestions, task management, time tracking, link management and binaurial beats .

## Key Features
- **Dashboard Overview**: Once authenticated, users are redirected to the dashboard, which serves as the control center. Here, users can access various components such as the Calendar, Tasks section , pomodoro section aligned with focus timer , my inventory for link management , AI suggestion integration and settings page.
- **Task Management**: The dedicated Tasks page allows users to enter tasks, describe the task description and set deadlines. If they want they can also delete or edit the task details and mark task as completed whenever they are done with there task in dashboard .The dashboard automatically updates with this information, ensuring users stay on top of their to-do list.
- **Calendar**: Displays the current date and integrates with the Tasks feature, providing a visual overview of upcoming deadlines.
- **AI Integration**: Where users can ask for productivity suggestions , tips , can ask ai to give them a plan to follow for a day or what not.
- **My Inventory**: A personalized links storage section where users can save and organize URLs without cluttering their browser bookmarks.
- **Pomodoro with focus timer Integration**: - The app includes a Pomodoro button which when clicked on redirect you to focus-timer section which include timer for 25 minutes of work on a particular task followed by a 5-minute break to enhance concentration and productivity.
-  Users can track their progress in the Tracking List, which syncs with the focus-timer cycles.
-  Users can also choose from various music categories—Relax, Focus, Energize, Sleep, and Meditate—to complement their work sessions.
-  Have a motivational quote feature powered by ai to help user stay focused on there task

## Why Choose Smart Productivity tracker with AI suggestion?
A Smart Productivity Tracker with AI-Powered Suggestions is an ideal solution because it helps users optimize their work habits by tracking tasks, time, and focus sessions. The AI provides personalized insights, like suggesting break times or task prioritization based on individual productivity patterns. It enhances productivity, improves work-life balance, and offers a customizable and adaptive experience, making it more effective than basic task managers.

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

- Discord Handles
  
  @ritika12
  
  @sunnyunam 

