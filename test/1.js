function cloneShallow(source) {
  if (source == null) return source;
  var to = Array.isArray(source) ? [] : {};
  for (var key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      to[key] = source[key];
    }
  }
  return to;
}

function cloneDeep(source) {
  if (source == null) return source;
  var to = Array.isArray(source) ? [] : {};
  for (var key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      if (typeof source[key] === 'object' && source[key] !== null) {
        to[key] = cloneDeep(source[key]);
      } else {
        to[key] = source[key];
      }
    }
  }
  return to;
}

console.log(cloneShallow(undefined));
