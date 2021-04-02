(() => {
  for (const v in ['a', 'b', 'c']) {
    console.log(v);
    if (v == 0) continue;
  }
})();