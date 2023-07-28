// linked list

class Node {
  val;
  next;

  constructor(val) {
    this.val = val;
    this.next = null;
  }

  val () {
        return this.val;
    }

    next () {
        return this.next;
    }

}

class LinkedList {
  head;
  tail;
  size;

  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  head() {
      return this.head;
  }

  tail() {
      return this.tail;
  }

  addAtTail(val) {
    const node = new Node(val);

    if (this.head === null) {
      this.head = node;
      this.tail = node;
      return;
    }

    this.tail.next = node;
    this.tail = node;

    this.size++;

    return node;
  }

  addAtHead(val) {
    const node = new Node(val);

    if (this.head === null) {
      this.head = node;
      this.tail = node;
      return;
    }

    node.next = this.head;
    this.head = node;

    this.size++;

    return node;
  }

  removeAtHead() {
    if (this.head === null) {
      return null;
    }

    const node = this.head;
    this.head = this.head.next;

    this.size--;

    return node;
  }

  removeAtTail() {
    if (this.head === null) {
      return null;
    }

    let node = this.head;

    while (node.next !== this.tail) {
      node = node.next;
    }

    const tail = this.tail;
    this.tail = node;
    node.next = null;

    this.size--;

    return tail;
  }

  insertAt(val, index) {
    if (index < 0 || index > this.size) {
      return "incorrect index";
    }

    if (index === 0) {
      return this.addAtHead(val);
    }

    if (index === this.size) {
      return this.addAtTail(val);
    }

    let node = this.head;

    for (let i = 0; i < index - 1; i++) {
      node = node.next;
    }

    if (node === null) {
      return "incorrect index";
    }

    const newNode = new Node(val);
    newNode.next = node.next;
    node.next = newNode;

    this.size++;

    return newNode;
  }

  display() {
    let node = this.head;

    while (node !== null) {
      // console.log(node.val);
      process.stdout.write(node.val + " -> ");
      node = node.next;
    }
  }

  removeDuplicates() {
    if (this.head === null) {
      return;
    }

    let node = this.head;

    while (node.next !== null) {
      if (node.val == node.next.val) {
        node.next = node.next.next;
      }

      node = node.next;
    }
  }

}

function mergeTwoSortedLists(l1, l2) {
    let dummy = new ListNode(-1);
    let current = dummy;
  
    while (l1 !== null && l2 !== null) {
      if (l1.val <= l2.val) {
        current.next = l1;
        l1 = l1.next;
      } else {
        current.next = l2;
        l2 = l2.next;
      }
      current = current.next;
    }
  
    // If one list is longer than the other, append the remaining nodes
    if (l1 !== null) {
      current.next = l1;
    } else {
      current.next = l2;
    }
  
    return dummy.next;
  }

function main() {
  const list = new LinkedList();

  const l1 = new LinkedList();
  const l2 = new LinkedList();

  l1.addAtTail(1);
  l1.addAtTail(2);
  l1.addAtTail(8);
  l2.addAtTail(3);
  l2.addAtTail(9);
  l2.addAtTail(10);

  let ans = mergeTwoSortedLists(l1, l2);

  ans.display();
}

main();
