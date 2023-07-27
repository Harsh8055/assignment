const readline = require('readline');



class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }

    add(value) {
        let newNode = new Node(value);

        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            newNode.next = this.head;
            this.head = newNode;
        }

        this.size++;
        return this.size;
    }

    pop() {
        if (!this.head) return null;

        let temp = this.head;

        if (this.head === this.tail) {
            this.tail = null;
        }

        this.head = this.head.next;
        this.size--;

        return temp.value;
    }

    addAtTail(value) {
        let newNode = new Node(value);

        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.tail.next = newNode;
            this.tail = newNode;
        }

        this.size++;
        return this.size;
    }

    popAtTail() {
        if (!this.head) return null;

        if (this.head === this.tail) {
            this.tail = null;
            this.head = null;

            return this.size--;
        }

        let temp = this.tail;


        let current = this.head;
        for (let i = 0; i < this.size - 2; i++) { // 2 because we want to stop at the second to last node
            current = current.next;
        }
       
        this.tail = current;
        this.tail.next = null;
        this.size--;

        return temp.value;
    }

    display() {
        let temp = this.head;

        while (temp) {
            process.stdout.write(`${temp.value} -> `);
            temp = temp.next;
        }

        console.log();
    }

    insertAt(value, index) {
        if (index < 0 || index > this.size) return null;

        if (index === this.size) return this.addAtTail(value);

        if (index === 0) return this.add(value);

        let newNode = new Node(value);
        let current = this.head;
        let previous = null;

        for (let i = 0; i < index; i++) {
            previous = current;
            current = current.next;
        }

        newNode.next = current;
        previous.next = newNode;
        this.size++;

        return this.size;
    }

    removeAt(index) {
        if (index < 0 || index >= this.size) return null;

        if (index === 0) return this.pop();

        if (index === this.size - 1) return this.popAtTail();

        let current = this.head;
        let previous = null;

        for (let i = 0; i < index; i++) {
            previous = current;
            current = current.next;
        }

        previous.next = current.next;
        this.size--;

        return current.value;
    }

    find(value) {
        let current = this.head;
        let index = 0;

        // why this? because if the value is the tail, we want to return size instead of looping through the entire list

        if (this.tail.value === value) return this.size - 1; // if the value is the tail, return the size - 1

        while (current) {
            if (current.value === value) return index;

            current = current.next;
            index++;
        }

        return null;
    }

    reverse(){
        for(let i = 0; i < this.size; i++){
            this.insertAt(this.popAtTail(), i);
        }
    }
}

class deque {
    constructor() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }

    addFront(value) {
        let newNode = new Node(value);

        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            newNode.next = this.head;
            this.head = newNode;
        }

        this.size++;
        return this.size;
    }

    addBack(value) {
        let newNode = new Node(value);

        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.tail.next = newNode;
            this.tail = newNode;
        }

        this.size++;
        return this.size;
    }

    removeFront() {
        if (!this.head) return null;

        let temp = this.head;

        if (this.head === this.tail) {
            this.tail = null;
        }

        this.head = this.head.next;
        this.size--;

        return temp.value;
    }

    removeBack() {
        if (!this.head) return null;

        if (this.head === this.tail) {
            this.tail = null;
            this.head = null;

            return this.size--;
        }

        let temp = this.tail;

    }

    display() {
        let temp = this.head;

        while (temp) {
            process.stdout.write(`${temp.value} -> `);
            temp = temp.next;
        }

        console.log();
    }
}

class Stack {
    constructor() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }

    push(value) {
        let newNode = new Node(value);

        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            newNode.next = this.head;
            this.head = newNode;
        }

        this.size++;
        return this.size;
    }

    pop() {
        if (!this.head) return null;

        let temp = this.head;

        if (this.head === this.tail) {
            this.tail = null;
        }

        this.head = this.head.next;
        this.size--;

        return temp.value;
    }

    peek() {
        if (!this.head) return null;

        return this.head.value;
    }

    display() {
        let temp = this.head;

        while (temp) {
            process.stdout.write(`${temp.value} -> `);
            temp = temp.next;
        }

        console.log();
    }


}

class customStack extends Stack {  // custom stack that has a max size


    constructor(defaultSize) {
        this.length = 0;
        if(!defaultSize){
            this.size = 5;
  
        } else {
            this.size = defaultSize;

        }
        super();
    }

    push(value) {
        if (this.isFull()) return Error('Stack is full');

        return super.push(value);
    }

    isFull() {
        return this.length === this.size;
    }

    isEmpty() {
        return this.length === 0;
    }

    pop() {
        if (this.isEmpty()) return Error('Stack is empty');

        return super.pop();
    }

    peek() {
        if (this.isEmpty()) return Error('Stack is empty');

        return super.peek();
    }

    display() {
        if (this.isEmpty()) return Error('Stack is empty');

        return super.display();
    }


}

class customStackWithArray {
    constructor(defaultSize) {
        this.length = 0;
        if(!defaultSize){
            this.size = 5;
  
        } else {
            this.size = defaultSize;
        }
        this.stack = [];
    }

    push(value) {
        if (this.isFull()) return Error('Stack is full');

        this.stack.push(value);
        this.length++;
        return this.length;
    }

    isFull() {
        return this.length === this.size;
    }

    isEmpty() {
        return this.length === 0;
    }

    pop() {
        if (this.isEmpty()) return Error('Stack is empty');

        this.length--;
        return this.stack.pop();
    }

    peek() {
        if (this.isEmpty()) return Error('Stack is empty');

        return this.stack[this.length - 1];
    }

    display() {
        if (this.isEmpty()) return Error('Stack is empty');

        for (let i = this.length - 1; i >= 0; i--) {
            process.stdout.write(`${this.stack[i]} -> `);
        }

        console.log();
    }
}


// create a LinkedList with nodes containing values 5, 10, 15
let linkedList = new LinkedList();
let ans = linkedList.add(5);
let ans2 = linkedList.addAtTail(10);
let ans3 = linkedList.addAtTail(15);
let ans4 = linkedList.addAtTail(19);

console.log(ans, ans2, ans3);

linkedList.display();

linkedList.popAtTail();

linkedList.display();

linkedList.insertAt(100, 2);

linkedList.insertAt(90, 2);

linkedList.display();

linkedList.removeAt(2);

linkedList.display();

console.log(linkedList.find(15));

linkedList.reverse();

linkedList.display();



class NodeBT {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class BinaryTreeNode {
    constructor() {
        this.root = null;
        this.scanner = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }

    populate() {
        this.scanner.question('Enter rootNode: ', (node) => {
            this.root = new NodeBT(node);
            this.populateAll(this.root);
        });
    }

    display() {
        // console.log(this.root.value);
        this.displayAll(this.root, 0);
    }   

    displayAll(node, level) {
        if (node === null) {
            return;
        }
    
        this.displayAll(node.right, level + 1);
    
        let indentation = '';
        for (let i = 0; i < level; i++) {
            indentation += '    ';
        }
    
        console.log(indentation + node.value);
    
        this.displayAll(node.left, level + 1);
    }
    
    


    populateAll(nodeBase) {

        const callback = () => {
            let val = nodeBase.value;
            this.scanner.question(`Enter right of ${val} ? (yes/no): `, (res) => {
                if (res === 'yes') {
                    this.scanner.question('Enter rightNode: ', (node) => {
                        const rightNode = new NodeBT(node);
                        nodeBase.right = rightNode;
                        this.populateAll(rightNode);
                    });
                } else {
                    this.scanner.close();
                    // Continue with any further operations
    
                    this.display();
                }
            });
        }


        this.scanner.question(`Enter left of ${nodeBase.value} ? (yes/no): `, (res) => {
            
            if (res === 'yes') {
                this.scanner.question('Enter leftNode: ', (node) => {
                    const leftNode = new NodeBT(node);
                    nodeBase.left = leftNode;
                    this.populateAll(leftNode);
                });
            } 
            
            if (res === 'no') {
                // this.scanner.close();
                callback()
            }
        });

     
    }
}

async function run() {
    const binaryTree = new BinaryTreeNode();
     binaryTree.populate();
    // binaryTree.display();
}

run();