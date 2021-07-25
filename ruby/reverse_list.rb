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

    def reverse_list(current) 
        return current if current == nil or current.next_node == nil
    
        next_node = current.next_node
        new_head = reverse_list(current.next_node)
        next_node.next_node = current
        current.next_node = nil
        return new_head
    end
end

head = Node.new 1, nil
second = Node.new 2, nil
head.next_node = second

puts head.reverse_list(head)