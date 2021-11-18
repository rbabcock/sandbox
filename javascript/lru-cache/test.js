class LRU {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = {};
    this.queue = []
  }

  put(key, value){
    if(Object.keys(this.cache).length === this.capacity) {
      delete this.cache[this.queue.shift()]
    }
    this.cache[key] = value;
    this.queue.push(key);
  }

  get(key){
    if(this.cache[key]) {
      const index = this.queue.indexOf(key)
      if(index === -1) {
        this.queue.push(key)
      } else {
        this.queue.splice(index, 1)
        this.queue.push(key)
      }
    } else {
      console.log(`${key} not found`)
    }
  }
}


const lru = new LRU(2);
lru.put('a', 'a');
lru.put('b', 'b');
lru.put('c', 'c');
lru.get('b');
console.log(lru);
