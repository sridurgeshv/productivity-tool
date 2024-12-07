require "json"

module ProductivityTracker
  struct Task
    include JSON::Serializable

    property id : Int64?
    property title : String
    property description : String?
    property deadline : String?
    property status : String
    property created_at : String?

    def initialize(@title, @description = nil, @deadline = nil, @status = "pending")
    end
  end
end