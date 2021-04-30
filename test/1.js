const dragDom = document.querySelector('#drag1');
function hander(e) {
  e.preventDefault();
  if (e.type == 'drop') {
    dragDom.innerHTML = '<img src="' + window.URL.createObjectURL(e.dataTransfer.files[0]) + '">';
  }
}
dragDom.addEventListener('dragenter', hander);
dragDom.addEventListener('dragover', hander);
dragDom.addEventListener('drop', hander);