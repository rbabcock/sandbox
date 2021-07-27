class LRUCache
  attr_reader :dll, :hash, :count, :capacity
  def initialize(capacity)
    @dll = DLL.new
    @hash = Hash.new
    @count = 0
    @capacity = capacity
  end

  def read(key)
    node = hash[key]

    if node.nil?
      nil
    else
      dll.remove(node)
      dll.add(node)
      node.value
    end
  end

  def write(key, value)
    node = hash[key]

    if node.nil?
      node = DLLNode.new(key, value)
      if count >= capacity
        dll.remove(dll.tail)
        dll.add(node)
      else
        node.value = value
        dll.add(node)
      end
      @count += 1
    else
      node.value = value
      dll.remove(node)
      dll.add(node)
    end
    @hash[key] = node
    node
  end

  def print
    @dll.print
  end
end

class DLL
  attr_accessor :head, :tail

  def add(node)
    if @head.nil?
      @head = node
      @tail = node
    else
      temp = @head
      node.nxt = @head
      @head.prev = node
      @head = node
    end
    @head
  end

  def remove(node)
    if node.prev.nil?  #also you can node == head            # Deleting first node
      node.nxt.prev = nil
      @head = node.nxt
    elsif node.nxt.nil? #also you can node == tail          # Deleting last node
      node.prev.nxt = nil
      @tail = node.prev
    else
      node.prev.nxt = node.nxt
      node.nxt.prev = node.prev
    end
    node.prev = nil
    node.nxt = nil
    node.value
  end

  def print
    puts "Cache data:"
    current = @head
    while current != nil do
      puts "|#{current.key} : #{current.value}|"
      current = current.nxt
    end
    puts ""
  end
end

class DLLNode
  attr_reader :key
  attr_accessor :value, :prev, :nxt

  def initialize(key, value)
    @key = key
    @value = value
    @prev, @nxt = nil, nil
  end
end


lru_cache = LRUCache.new(5)
lru_cache.write(1, 'A')
lru_cache.write(2, 'B')
lru_cache.write(3, 'C')
lru_cache.write(4, 'D')
lru_cache.write(5, 'E')

lru_cache.print

puts "When capacity is full"
lru_cache.write(6, 'F')

lru_cache.print

puts "Reading cache key 4: #{lru_cache.read(2)}"
lru_cache.print

puts "Writing cache key 3: #{lru_cache.write(3, 'G')}"
lru_cache.print

puts "Reading cache key 6: #{lru_cache.read(6)}"
lru_cache.print
