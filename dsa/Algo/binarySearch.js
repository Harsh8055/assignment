function binarySearch(arr, target) {
    let left = 0;
    let right = arr.length - 1;
  
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
        console.log(mid, arr[mid]);
      if (arr[mid] === target) {
        return mid; // Target element found at index mid.
      }
  
      if (arr[mid] > target) {
        right = mid - 1; // Target element should be in the left half.
      } else if(arr[mid] < target){
        left = mid + 1; // Target element should be in the right half.
      }
    }

    return -1; // Target element not found in the array.
  }


  function binarySearchRecursion(arr, target, left = 0, right = arr.length - 1) {
    if (left <= right) {
      const mid = Math.floor((left + right) / 2);
  
      if (arr[mid] === target) {
        return mid; // Found the target element
      } else if (arr[mid] > target) {
        return binarySearch(arr, target, left, mid - 1); // Search the left half
      } else {
        return binarySearch(arr, target, mid + 1, right); // Search the right half
      }
    }
  
    return -1; // Element not found in the array
  }
  
  // Example usage:
  const sortedArray = [1, 3, 5, 7, 9, 11, 13, 15];
  const targetElement = 7;
  const index = binarySearch(sortedArray, targetElement);
  console.log(index); // Output: 3 (index of the target element in the array)
  


  process.stdout.write(binarySearch([1,2,3,4,5,6,7,8,9,10], 1).toString())