require "kemal"
require "./controllers/task_controller"
require "./database/db_connection"

module ProductivityTracker
  Database.init_schema
  TaskController.setup_routes

  Kemal.run

  before_all do |env|
    env.response.headers["Access-Control-Allow-Origin"] = "*"
    env.response.headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS"
    env.response.headers["Access-Control-Allow-Headers"] = "Content-Type"

end

end