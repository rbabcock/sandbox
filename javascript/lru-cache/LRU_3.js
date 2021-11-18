class LRUCache {
    constructor(capacity) {
      this.map = new Map()
      this.capacity = capacity
    }

    get(key) {
      if(this.map.has(key)) {
        const value = this.map.get(key)
        this.map.delete(key)
        this.map.set(key, value)
        return value;
      } else {
        return -1
      }
    }

    put(key, value) {
      if(this.get(key) === -1) {
        if(this.map.size === this.capacity) {
          for(let key in this.map) {
            this.map.delete(key[0])
            break;
          }
        }
      }
      this.map.set(key, value)
    }
}

let lru = new LRUCache(4)
lru.put(1, 'a')
lru.put(2, 'b')
lru.put(3, 'c')
lru.put(4, 'd')
console.log(lru.get(1))
console.log(lru)
