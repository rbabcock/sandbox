class Node {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next = null;
    this.prev = null;
  }
}

class lruCache {
  constructor(maxCap) {
    this.maxCap = maxCap
    this.count = 0;
    this.head = null;
    this.tail = null;
    this.cache = new Map();
  }

  get(key) {
    if(!this.cache.has(key)) {
      return -1
    }

    const node = this.cache.get(key);
    this.use(node);
    return node.value;
  }

  display() {
    let current = this.head;
    console.log('head ', this.head);
    console.log('tail', this.tail);
    while(current) {
      console.log(current.key, current.value)
      current = current.next;
    }
  }

  put(key, value) {
    if(this.cache.has(key)) {
      const node = this.cache.get(key)
      node.value = value;
      this.use(key);
      this.cache.set(key, value);
    } else {
      if(this.count >= this.maxCap) {
        this.evict();
      }

      this.insert(key, value);
      this.use(key);
    }
  }
  use(key) {
    //head[:prev[1]:next, :prev[2]:next :prev[3]:next]tail
    const node = this.cache.get(key) 
    if(node === this.head) {
      return;
    } else if (node === this.tail) {
      node.prev.next = null;
      node.prev = null;
      node.next = this.head;
      
     
      this.tail = node.prev;
      this.head.prev = node;
      this.head = node
    } else {
      if(node.prev) {
        node.prev.next = node.next;
      }
      if(node.next) {
        node.next.prev = node.prev;
      }

      node.next = this.head;
      node.prev = null;
      this.head = node;
      this.head.prev = node;
    }
  }
  evict(){
    const keytoEvict = this.tail ? this.tail.key : null
    if(!this.tail) {
      return
    } else if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
    } else {
      this.tail.prev.next = null;
      this.tail = this.tail.prev;
    }

    if(keytoEvict) {
      this.count--
      this.cache.delete(keytoEvict);
    }
  }

  
  insert(key, value) {
    const node = new Node(key, value);
    this.count++
    this.cache.set(key, node);

    if(!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      this.head.prev = node;
      node.next = this.head;
      this.head = node;
    }

  }

}


const lru = new lruCache(4);
console.log(`INSERTING VALUES `)
lru.put(1, 'a');
lru.put(2, 'b');
lru.put(3, 'c');
lru.put(5, 'd');
lru.display();
// lru.use(2);
// console.log('------------')
// lru.display();
// console.log('------------')
// lru.put(5, 'e');
// lru.display();
