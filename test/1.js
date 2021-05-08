window.onerror = (message, url, line) => {
  console.log({ message, url, line});
};
window.addEventListener('error', function({ message, filename: url, lineno: line}) {
  debugger;
  console.log({ message, url, line});
});
throw new Error('这是错误了');
