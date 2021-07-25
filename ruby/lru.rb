class Node
  attr_accessor :value, :next_node, :prev_node 

  def initialize(value, prev_node, next_node)
    @value = value
    @prev_node = prev_node
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

class LRU
	attr_accessor :head, :tail, :num_items, :max_items
	def initialize(max_items)
		@max_items = max_items
		@table = {}
		@head = nil
		@tail = nil
		@num_items = 0
	end

	def set(key, value)
    @num_items += 1
    if @num_items > @max_items
      @head = @head.next_node
    end

    new_node = Node.new value, @tail, nil
    @head = new_node if tail == nil 
    @tail.next_node = new_node if @tail != nil
    @tail = new_node
    @table[key] = new_node 
  end

	def get(key)
    res = @table[key]
    return res if res.next_node == nil

    if res.prev_node != nil
      res.prev_node.next_node = res.next_node
    else
      @head = res.next_node
      @head.prev_node = nil
    end

    @tail.next_node = res
    res.next_node = nil
    res.prev_node = @tail
    @tail = res
  end
end

lru = LRU.new(3)
lru.set('a', 1)
lru.set('b', 2)
lru.set('c', 3)
puts lru.head
lru.get('a')
puts lru.head
lru.get('b')
puts lru.head
lru.get('c')
puts lru.head
lru.set('d', 8)
lru.set('e', 9)
lru.set('d', 10)
lru.set('e', 11)
puts lru.head
