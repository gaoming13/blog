((st) => {
  const l1 = (st&1) == 1;
  const l2 = (st&2) == 2;
  const l3 = (st&4) == 4;
})(1|4);