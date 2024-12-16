require "kemal"
require "json"
require "../models/task"
require "../models/TrackedTask"
require "../models/link"
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

       # Serve current date
      get "/current-date" do |env|
        current_time = Time.local
        current_date = {
          day: current_time.day,
          month: current_time.month,
          year: current_time.year
        }
        env.response.content_type = "application/json"
        env.response.headers["Access-Control-Allow-Origin"] = "*"
        env.response.print(current_date.to_json)
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

      # Delete a task
      delete "/tasks/:id" do |env|
        begin
          env.response.headers["Access-Control-Allow-Origin"] = "*"
          env.response.headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS"
          env.response.headers["Access-Control-Allow-Headers"] = "Content-Type"
          task_id = env.params.url["id"].to_i64

          db = Database.connect
          db.exec("DELETE FROM tasks WHERE id = ?", task_id)
          db.close

          env.response.content_type = "application/json"
          env.response.status_code = 200
          env.response.print({ success: true, message: "Task deleted successfully" }.to_json)
        rescue ex
          env.response.status_code = 500
          env.response.print({ error: ex.message }.to_json)
        end
      end

      # Edit a task
      put "/tasks/:id" do |env|
        begin
          env.response.headers["Access-Control-Allow-Origin"] = "*"
          env.response.headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS"
          env.response.headers["Access-Control-Allow-Headers"] = "Content-Type"
          task_id = env.params.url["id"].to_i64
          task_params = env.params.json
          task = Task.from_json(task_params.to_json)

          db = Database.connect
          db.exec(
            "UPDATE tasks SET title = ?, description = ?, deadline = ? WHERE id = ?", 
            task.title, task.description, task.deadline, task_id
          )
          db.close

          env.response.content_type = "application/json"
          env.response.status_code = 200
          env.response.print({ success: true, message: "Task updated successfully" }.to_json)
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

# Track focused tasks
      post "/tracked-tasks" do |env|
        begin
          env.response.headers["Access-Control-Allow-Origin"] = "*"
          env.response.headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS"
          env.response.headers["Access-Control-Allow-Headers"] = "Content-Type"
          body = env.params.json

          # Safely extract 'title' (handles both String and Array types)
          title = case body["title"]
                  when String
                    body["title"] # Directly use the string
                  when Array(JSON::Any)
                    array = body["title"].as(Array(JSON::Any))
                    first_element = array.first
                    if first_element.nil?
                      raise "Title array is empty"
                    end
                    first_element.try(&.as_s) || raise "First element of 'title' array is not a string"
                  else
                    raise "Invalid or missing 'title' field"
                  end

          # Ensure title is a String
          unless title.is_a?(String)
            raise "Title must be a String"
          end

          # Safely extract 'time' (handles both Int and Array types)
          time = case body["time"]
                 when Int64
                   body["time"] # Directly use the integer
                 when Array(JSON::Any)
                   array = body["time"].as(Array(JSON::Any))
                   first_element = array.first
                   if first_element.nil?
                     raise "Time array is empty"
                   end
                   first_element.try(&.as_i) || raise "First element of 'time' array is not an integer"
                 else
                   raise "Missing or invalid 'time' field"
                 end

          # Ensure time is an Int64 or convert it to String if needed
          unless time.is_a?(Int64)
            raise "Time must be an Int64"
          end

          # Create and add the task to the database
          db = Database.connect
          db.exec(
            "INSERT INTO tracked_tasks (title, time) VALUES (?, ?)", 
            title, time
          )
          task_id = db.scalar("SELECT last_insert_rowid()").to_s.to_i64
          db.close

          # Respond with success
          env.response.content_type = "application/json"
          env.response.print({ success: true, id: task_id, title: title, time: time }.to_json)
        rescue ex
          env.response.status_code = 400
          env.response.print({ error: ex.message }.to_json)
        end
      end

      
      # List tracked tasks (from database)
      get "/tracked-tasks" do |env|
        env.response.headers["Access-Control-Allow-Origin"] = "*"
        env.response.headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS"
        env.response.headers["Access-Control-Allow-Headers"] = "Content-Type"
        db = Database.connect
        tracked_tasks = [] of TrackedTask
        
        db.query "SELECT id, title, time FROM tracked_tasks" do |rs|
          rs.each do
            tracked_tasks << TrackedTask.new(
              id: rs.read(Int64),
              title: rs.read(String),
              time: rs.read(Int64)
            )
          end
        end
        db.close

        env.response.content_type = "application/json"
        env.response.print(tracked_tasks.to_json)
      end

      # Delete a tracked task
      delete "/tracked-tasks/:id" do |env|
        begin
          env.response.headers["Access-Control-Allow-Origin"] = "*"
          env.response.headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS"
          env.response.headers["Access-Control-Allow-Headers"] = "Content-Type"
          task_id = env.params.url["id"].to_i64

          db = Database.connect
          db.exec("DELETE FROM tracked_tasks WHERE id = ?", task_id)
          db.close

          env.response.content_type = "application/json"
          env.response.status_code = 200
          env.response.print({ success: true, message: "Tracked task deleted successfully" }.to_json)
        rescue ex
          env.response.status_code = 500
          env.response.print({ error: ex.message }.to_json)
        end
      end

# Add a new link
      post "/links" do |env|
        begin
          env.response.headers["Access-Control-Allow-Origin"] = "*"
          env.response.headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS"
          env.response.headers["Access-Control-Allow-Headers"] = "Content-Type"
          body = env.params.json

          # Safely extract 'title' (handles both String and Array types)
          title = case body["title"]
                  when String
                    body["title"] # Directly use the string
                  when Array(JSON::Any)
                    array = body["title"].as(Array(JSON::Any))
                    first_element = array.first
                    if first_element.nil?
                      raise "Title array is empty"
                    end
                    first_element.try(&.as_s) || raise "First element of 'title' array is not a string"
                  else
                    raise "Invalid or missing 'title' field"
                  end

          # Ensure title is a String
          unless title.is_a?(String)
            raise "Title must be a String"
          end

          # Safely extract 'url' (handles both String and Array types)
          url = case body["url"]
                when String
                  body["url"] # Directly use the string
                when Array(JSON::Any)
                  array = body["url"].as(Array(JSON::Any))
                  first_element = array.first
                  if first_element.nil?
                    raise "URL array is empty"
                  end
                  first_element.try(&.as_s) || raise "First element of 'url' array is not a string"
                else
                  raise "Invalid or missing 'url' field"
                end

          # Ensure url is a String
          unless url.is_a?(String)
            raise "URL must be a String"
          end

          # Create and add the link to the database
          db = Database.connect
          db.exec(
            "INSERT INTO links (title, url) VALUES (?, ?)", 
            title, url
          )
          link_id = db.scalar("SELECT last_insert_rowid()").to_s.to_i64
          db.close

          # Respond with success
          new_link = Link.new(id: link_id, title: title, url: url)
          env.response.content_type = "application/json"
          env.response.status_code = 201
          env.response.print(new_link.to_json)
        rescue ex
          env.response.status_code = 400
          env.response.print({ error: ex.message }.to_json)
        end
      end

# List all links
      get "/links" do |env|
        env.response.headers["Access-Control-Allow-Origin"] = "*"
        env.response.headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS"
        env.response.headers["Access-Control-Allow-Headers"] = "Content-Type"
        db = Database.connect
        links = [] of Link
        
        db.query "SELECT id, title, url FROM links" do |rs|
          rs.each do
            links << Link.new(
              id: rs.read(Int64),
              title: rs.read(String),
              url: rs.read(String)
            )
          end
        end
        db.close

        env.response.content_type = "application/json"
        env.response.print(links.to_json)
      end

      # Delete a link
      delete "/links/:id" do |env|
        begin
          env.response.headers["Access-Control-Allow-Origin"] = "*"
          env.response.headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS"
          env.response.headers["Access-Control-Allow-Headers"] = "Content-Type"
          link_id = env.params.url["id"].to_i64

          db = Database.connect
          db.exec("DELETE FROM links WHERE id = ?", link_id)
          db.close

          env.response.content_type = "application/json"
          env.response.status_code = 200
          env.response.print({ success: true, message: "Link deleted successfully" }.to_json)
        rescue ex
          env.response.status_code = 500
          env.response.print({ error: ex.message }.to_json)
        end
      end

      # Serve music files dynamically based on category
      get "/api/music/:category" do |env|
        env.response.headers["Access-Control-Allow-Origin"] = "*"
        env.response.headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS"
        env.response.headers["Access-Control-Allow-Headers"] = "Content-Type"
        
        category = env.params.url["category"]
        file_path = "public/music/#{category}.json"

        if File.exists?(file_path)
          send_file env, file_path, "application/json"
        else
          env.response.status_code = 404
          env.response.print({ error: "Music file not found" }.to_json)
        end
      end
    end
  end