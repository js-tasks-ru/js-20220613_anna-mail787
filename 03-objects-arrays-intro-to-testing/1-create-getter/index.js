/**
 * createGetter - creates function getter which allows select value from object
 * @param {string} path - the strings path separated by dot
 * @returns {function} - function-getter which allow get value from object by set path
 */
export function createGetter(path) {
  return (obj) => {
    const keys = path.split('.');
    let newObj = {...obj};

    for (let i = 0; i < keys.length; i++) {
      newObj = newObj[keys[i]];
      if (!newObj) {
        return;
      }
    }
    return newObj;
  }
}
