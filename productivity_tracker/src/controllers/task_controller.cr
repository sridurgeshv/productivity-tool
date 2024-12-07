require "kemal"
require "json"
require "../models/task"
require "../database/db_connection"

module ProductivityTracker
  class TaskController
    def self.setup_routes
      # Create a new task
      post "/tasks" do |env|
        begin
          task_params = env.params.json
          task = Task.from_json(task_params.to_json)
          
          db = Database.connect
          result = db.exec(
            "INSERT INTO tasks (title, description, deadline, status) VALUES (?, ?, ?, ?)", 
            task.title, task.description, task.deadline, task.status
          )
          
          env.response.content_type = "application/json"
          {id: result.last_insert_id, message: "Task created successfully"}.to_json
        rescue ex
          env.response.status_code = 400
          {error: ex.message}.to_json
        end
      end

      # List all tasks
      get "/tasks" do |env|
        db = Database.connect
        tasks = [] of Task
        
        db.query "SELECT * FROM tasks" do |rs|
          rs.each do
            tasks << Task.new(
              title: rs.read(String),
              description: rs.read(String?),
              deadline: rs.read(String?),
              status: rs.read(String)
            )
          end
        end
        
        env.response.content_type = "application/json"
        tasks.to_json
      end
    end
  end
end