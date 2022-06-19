/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */
export function sortStrings(arr, param = 'asc') {
  const sortedArray = arr.slice();
  sortedArray.sort(
    (first, second) => first.localeCompare(
      second, ['ru', 'en'], {caseFirst: 'upper'}));
  if (param === 'desc') {
    sortedArray.reverse();
  }
  return sortedArray;
}
