class LRU {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = {};
    this.lastAccessed = [];
  }

  put(key, value) {
    if(Object.keys(this.cache).length === this.capacity) {
      // find leastAccessed key and remove it
      delete this.cache[this.lastAccessed.shift()];
    }
      this.cache[key] = value;
      this.updateAccessTime(key);
  }
  
  get(key) {
    if(this.has(key)) {
      this.updateAccessTime(key)
    } else  
      console.log(`${key} not found`);
    }

  updateAccessTime(key) {
    const index = this.lastAccessed.indexOf(key);
    if(index === -1) {
      this.lastAccessed.push(key)
    } else {
      this.lastAccessed.splice(index, 1)
      this.lastAccessed.push(key)
    }
    console.log(`the last accessed is currently ${this.lastAccessed}`)
  }

   has(key) {
    if(this.cache[key]) {
      return true;
    } else {
      return false;
    }
  }
}


  

const lru = new LRU(2);
lru.put('a', 'a');
lru.put('b', 'b');
lru.put('c', 'c');
lru.put('d', 'd');
lru.get('c');
lru.put('e', 'e');
console.log(lru);
