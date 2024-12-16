require "json"

module ProductivityTracker
  struct Link
    include JSON::Serializable

    property id : Int64?
    property title : String
    property url : String

    def initialize(@id : Int64?, @title : String, @url : String)
    end
  end
end