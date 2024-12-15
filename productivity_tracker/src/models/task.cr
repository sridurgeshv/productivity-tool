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

    def initialize(@id : Int64?, @title : String, @description : String? = nil, @deadline : String? = nil, @status : String = "pending", @created_at : String? = nil)
    end
  end
end