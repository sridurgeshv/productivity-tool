require "kemal"
require "json"
require "../models/task"
require "../database/db_connection"

module ProductivityTracker
  class TaskController
    def self.setup_routes
      # Handle preflight OPTIONS request
      options "/*" do |env|
        env.response.headers["Access-Control-Allow-Origin"] = "*"
        env.response.headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS"
        env.response.headers["Access-Control-Allow-Headers"] = "Content-Type"
        env.response.status_code = 204
      end

      # Create a new task
      post "/tasks" do |env|
        begin
          task_params = env.params.json
          task = Task.from_json(task_params.to_json)
          
          db = Database.connect
          db.exec(
            "INSERT INTO tasks (title, description, deadline, status) VALUES (?, ?, ?, ?)", 
            task.title, task.description, task.deadline, task.status
          )
          task_id = db.scalar("SELECT last_insert_rowid()").to_s.to_i64
          db.close

          env.response.content_type = "application/json"
          env.response.headers["Access-Control-Allow-Origin"] = "*"
          env.response.headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS"
          env.response.headers["Access-Control-Allow-Headers"] = "Content-Type"
          env.response.status_code = 201
          env.response.print({ id: task_id, message: "Task created successfully" }.to_json)
        rescue ex
          env.response.status_code = 500
          env.response.print({ error: ex.message }.to_json)
        end
      end

      # List all tasks
      get "/tasks" do |env|
        db = Database.connect
        tasks = [] of Task
        
        db.query "SELECT id, title, description, deadline, status FROM tasks" do |rs|
          rs.each do
            tasks << Task.new(
              id: rs.read(Int64),
              title: rs.read(String),
              description: rs.read(String?),
              deadline: rs.read(String?),
              status: rs.read(String)
            )
          end
        end
        db.close

        env.response.content_type = "application/json"
        env.response.headers["Access-Control-Allow-Origin"] = "*"
        env.response.headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS"
        env.response.headers["Access-Control-Allow-Headers"] = "Content-Type"
        env.response.print(tasks.to_json)
      end
    end
  
# Update task status
      post "/tasks/complete/:id" do |env|
        begin
          task_id = env.params.url["id"].to_i64
          
          db = Database.connect
          db.exec("UPDATE tasks SET status = 'completed' WHERE id = ?", task_id)
          db.close

          env.response.content_type = "application/json"
          env.response.headers["Access-Control-Allow-Origin"] = "*"
          env.response.headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS"
          env.response.headers["Access-Control-Allow-Headers"] = "Content-Type"
          env.response.status_code = 200
          env.response.print({ message: "Task status updated successfully" }.to_json)
        rescue ex
          env.response.status_code = 500
          env.response.print({ error: ex.message }.to_json)
        end
      end
    end
  end