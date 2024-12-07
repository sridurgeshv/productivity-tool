require "kemal"
require "./controllers/task_controller"
require "./database/db_connection"

module ProductivityTracker
  Database.init_schema
  TaskController.setup_routes

  Kemal.run
end