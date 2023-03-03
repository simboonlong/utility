export const binarySearchClosest = (arr: number[], target: number) => {
  let left = 0;
  let right = arr.length - 1;
  let closest = null;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const diff = arr[mid] - target;

    if (diff === 0) {
      return mid; // exact match found
    } else if (
      closest === null ||
      Math.abs(diff) < Math.abs(arr[closest] - target)
    ) {
      closest = mid; // update closest match
    }

    if (diff > 0) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }

  return closest;
};
