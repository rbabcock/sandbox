class LRU {
  constructor(capacity) {
    this.map = new Map();
    this.capacity = capacity;
  } 

  get(key){
    if(this.map.has(key)) {
      let value = this.map.get(key);
      this.map.delete(key);
      this.map.set(key, value);
      return value;      
    } else {
      return -1
    }
  }

  put(key, value){
    if(this.get(key) === -1) {
      if(this.capacity === this.map.size){
        for(let key of this.map) {
          this.map.delete(key[0])
          break;
        }
      }
    }
    
    this.map.set(key, value)
  }
}


const lru = new LRU(4);
lru.put(1, 'a');
lru.put(2, 'b');
lru.put(3, 'c');
lru.put(4, 'd');
lru.put(5, 'd');
lru.put(6, 'e');
console.log(lru);
