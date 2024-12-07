# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


Backend :
# Compile the project
crystal build src/productivity_tracker.cr

# Run the application
./productivity_tracker


Frontend :
npm run dev


Testing Endpoints: 
# Create a task
curl -X POST http://localhost:3000/tasks \
     -H "Content-Type: application/json" \
     -d '{"title":"Complete Project Setup","description":"Initialize Crystal project"}'

# List tasks
curl http://localhost:3000/tasks
