class Node
    attr_accessor :value, :next_node

    def initialize(value, next_node)
        @value = value
        @next_node = next_node
    end

    def to_s 
        current_node = self
        res = "["
        while current_node.next_node  != nil
            res = res + current_node.value.to_s + ", "
            current_node = current_node.next_node
        end
        res = res + current_node.value.to_s + "]"
    end
end

head = Node.new 8, nil
second_node = Node.new 7, nil
head.next_node = second_node
puts  head
    