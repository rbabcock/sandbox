class LRU {
  constructor(capacity) {
    this.capacity = capacity;
    this.map = new Map();
  }

  get(key) {
    if(this.map.has(key)) {    
        const value = this.map.get(key)
        this.map.delete(key);
        this.map.set(key, value);
        return value;
    } else {
      return -1
    }
  }

  put(key, value) {
    if(!this.get(key)) {
      if(this.capacity === this.map.size) {
        for(let key in this.map) {
          this.map.delete(key);
          break;
        }
      }
    }
    this.map.set(key, value);
  }

  display() {
    return console.log(this.map.entries())
  }

  clear(){
    this.map.clear();
  }
}

lru = new LRU(4)
lru.put(1, 'a')
lru.put(2, 'b')
lru.put(3, 'c')
lru.put(4, 'd')
lru.get(1);
lru.display();
