
  class ListNode {
    constructor(val, next = null) {
      this.val = val;
      this.next = next;
    }
  }
  
  class MergeSort {
    sortList(head) {
      if (head === null || head.next === null) {
        return head;
      }
  
      const mid = this.getMid(head); // here head is broken linked list till mid, it happpens now
      const left = this.sortList(head); // head is from head -> mid
      const right = this.sortList(mid); // linked list from mid -> tail
  
      return this.merge(left, right);
    }
  
    merge(list1, list2) {
        // Create a dummy head to simplify the merging process
        const dummyHead = new ListNode();
      
        // 'tail' will be used to build the merged linked list
        let mergedList = dummyHead;
      
        // Traverse both 'list1' and 'list2'
        while (list1 !== null && list2 !== null) {
          // Compare the values of the current nodes in 'list1' and 'list2'
          if (list1.val < list2.val) {
            // If the value of the current node in 'list1' is smaller,
            // add it to the merged list and move 'list1' to the next node
            mergedList.next = list1;
            list1 = list1.next;
          } else {
            // If the value of the current node in 'list2' is smaller or equal,
            // add it to the merged list and move 'list2' to the next node
            mergedList.next = list2;
            list2 = list2.next;
          }
      
          // Move the 'tail' pointer to the last node in the merged list
          mergedList = mergedList.next;
        }
      
        // When one of the lists is exhausted, add the remaining nodes of the other list
        // to the merged list because they are already sorted
        mergedList.next = (list1 !== null) ? list1 : list2;
      
        // Return the merged list starting from the next node of the dummy head
        return dummyHead.next;
      }
      
  
  
    getMid(head) {
        // Initialize the pointer to the node just before the middle node
        let midPrev = null;
      
        // Initialize slow and fast pointers to the head of the linked list
        let slow = head;
        let fast = head;
      
        // Move the fast pointer by two steps and slow pointer by one step
        // When fast reaches the end of the list (either null or last node),
        // slow will be at the middle node and midPrev will be at the node just before the middle node
        while (fast !== null && fast.next !== null) {
          // If midPrev is null, set it to slow, otherwise move midPrev one step forward
          if (midPrev === null) {
            midPrev = slow;
          } else {
            midPrev = midPrev.next;
          }
      
          // Move slow by one step and fast by two steps
          slow = slow.next;
          fast = fast.next.next;
        }
      
        // At this point, slow is at the middle node and midPrev is at the node just before the middle node
      
        // Store the middle node in a separate variable 'mid'
        const mid = midPrev.next;
      
        // Break the link between midPrev and mid by setting midPrev.next to null
        // This separates the linked list into two halves
        midPrev.next = null;
      
        // Return the middle node, which represents the head of the second half of the linked list
        return mid;
      }
      
          
  }
  
  // Helper function to convert the sorted linked list to an array for display
  function linkedListToArray(head) {
    const result = [];
    let current = head;
    while (current !== null) {
      result.push(current.val);
      current = current.next;
    }
    return result;
  }
  
  // Example usage:
  const list = new ListNode(4, new ListNode(2, new ListNode(1, new ListNode(3))));
  const mergeSort = new MergeSort();
  const sortedList = mergeSort.sortList(list);
  
  console.log(linkedListToArray(sortedList)); // Output: [1, 2, 3, 4]
  