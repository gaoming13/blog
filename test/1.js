document.addEventListener('click', function(e) {
  console.log(e);
});
let e1 = document.createEvent('MouseEvent');
e1.initMouseEvent('click', true, true, document.defaultView, 0 ,0 ,0 ,0 ,0, false, false, false, false, 0, null);
document.querySelector('button').dispatchEvent(e1);