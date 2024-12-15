require "db"
require "sqlite3"

module ProductivityTracker
  class Database
    def self.connect
      DB.open "sqlite3:./productivity_tracker.db"
    end

    def self.init_schema
      db = connect
      db.exec "CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT,
        deadline TEXT,
        status TEXT DEFAULT 'pending',
        created_at TEXT DEFAULT CURRENT_TIMESTAMP
      )"
      db.close
    end
  end
end