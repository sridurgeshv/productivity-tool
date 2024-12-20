## Smart Productivity Tracker with AI Suggestions
A modern productivity management system built with Crystal backend and React frontend, featuring AI-powered suggestions, task management, time tracking, and more.

## Key Features

Dashboard Overview: Once authenticated, users are redirected to the dashboard, which serves as the control center. Here, users can access various components such as the Calendar, Tasks section , pomodoro section aligned with focus timer , my inventory for link management , AI suggestion integration and settings page.

Task Management: The dedicated Tasks page allows users to enter tasks, describe the task description and set deadlines. If they want they can also delete or edit the task details .The dashboard automatically updates with this information, ensuring users stay on top of their to-do list.

Calendar: Displays the current date and integrates with the Tasks feature, providing a visual overview of upcoming deadlines.

AI Integration : Where users can ask for productivity suggestions , tips , can ask ai to give them a plan to follow for a day or what not.

My Inventory: A personalized links storage section where users can save and organize URLs without cluttering their browser bookmarks.

Pomodoro with focus timer Integration: 
- The app includes a Pomodoro button which can clicked on redirect to focus-timer section which include timer for 25 minutes of work on a particular task followed by a 5-minute break to enhance concentration and productivity.
-  Users can track their progress in the Tracking List, which syncs with the Pomodoro cycles.
-  Users can also choose from various music categories—Relax, Focus, Energize, Sleep, and Meditate—to complement their work sessions.
-  Have a motivational quote feature powered by ai to help user stay focused on there task


Why Choose Productivity Hub?
Productivity Hub is more than just a task manager—it's a comprehensive productivity tool that helps users streamline their workflows, stay focused, and achieve their goals. Whether you need to manage tasks, store important links, track your work with Pomodoro, or simply jot down distracting thoughts, Productivity Hub has you covered.

Installation Instructions
To use Smart Productivity Tracker with AI suggestion locally, follow these steps:

Clone the Repository
First, clone the repository from GitHub:

git clone 
Frontend Setup
Navigate to the frontend directory in your terminal.
cd taskaroo-dashboard
Install the required node modules:
npm install
export NODE_OPTIONS=--openssl-legacy-provider
Start the frontend application:
npm start
Backend Setup
Install the rust and cargo from Here on your local machine.
Navigate to the backend directory in another terminal.
cd taskbar-backend
Build the backend application:
cargo build
Start the backend server:
cargo run
View the Application
Once both the frontend and backend are running, you can view the Productivity Hub in your browser by navigating to http://localhost:3000.

Video Demo
To see Productivity Hub in action, check out our video demonstration. The video provides an overview of the app's features and shows how to navigate and use the tool effectively.
