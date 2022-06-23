/**
 * trimSymbols - removes consecutive identical symbols if they quantity bigger that size
 * @param {string} string - the initial string
 * @param {number} size - the allowed size of consecutive identical symbols
 * @returns {string} - the new string without extra symbols according passed size
 */
export function trimSymbols(string, size) {

  if (size === 0 ||  string === '') {
    return '';
  }

  if (!size) {
    return string;
  }

  const arr = [...string];
  let counter = 0;
  let match = false;
  const result = [];

  arr.forEach((letter, index) => {
    if (index > 0) {
      match = letter === arr[index - 1];
    }
    if (match && counter < size) {
      result.push(letter);
      counter++;
    }
    if (!match) {
      result.push(letter);
      counter = 1;
    }
  });

  return result.join('');
}
