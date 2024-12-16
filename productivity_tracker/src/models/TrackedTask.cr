require "json"

module ProductivityTracker
  struct TrackedTask
    include JSON::Serializable

    property id : Int64?
    property title : String
    property time : Int64
    property created_at : String?

    def initialize(@id : Int64?, @title : String, @time : Int64, @created_at : String? = nil)
    end
  end
end